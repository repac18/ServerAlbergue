import React, {Component, Fragment} from 'react';
import {Link,Redirect}                       from 'react-router-dom';
import {Query, Mutation}            from 'react-apollo';
import {USUARIOS_QUERY}             from '../../GraphQl/Querys/Usuarios';
import {ELIMINAR_USUARIO}           from '../../GraphQl/Mutations/Auth';
import Exito                        from '../Alertas/Exito';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class UsuarioIndex extends Component {
  base   = new front ();
  limite = 10;
  state  = {
    paginador: {
      offset: 0,
      actual: 1
    },
    alert:     {
      mostrar: false,
      mensaje: ''
    }
  };
  
  render () {
    const {alert: {mostrar, mensaje}} = this.state;
    
    const alerta = (mostrar) ? <Exito mensaje={ mensaje }/> : '';
    
    const redireccion=this.props.Access("Usuarios","Acceder")?'':<Redirect to='/'/>;
    return (
       <Fragment>
         {redireccion}	  
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('USUARIOS', 'Usuarios/Nuevo',true,!this.props.Access("Usuarios","Guardar")) }
           <div className="card-body">
             { alerta }
             <Query
                query={ USUARIOS_QUERY }
                //   pollInterval={500} // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={ {
                  limite: this.limite, offset: this.state.paginador.offset
                } }
             >
               { ({
                    loading,
                    error,
                    data,
                    refetch,
                    startPolling,
                    stopPolling //para recargar el resto de la vista
                  }) => {
                    refetch()
                 if (loading) return 'Cargando...';
                 if (error) return `Error: ${ error.message }`;
                 
                 return (
                    <Fragment>
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table">
                            { this.base.table.TableMenu ([
                                                           {Nombre: 'Usuario'},
                                                           {Nombre: 'Nombre'},
                                                           {Nombre: 'Rol'},
                                                           {Nombre: 'Opcion'}
                                                         ]) }
                            <tbody>
                            { data.getusuarios.map ((item) => {
                              const {id} = item;
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Usuario }</td>
                                   <td>{ item.Nombre }</td>
                                   <td>{ item.Rol[0].Nombre }</td>
                                   <td>
                                  {this.props.Access("Usuarios","Eliminar")
                                  &&(   <Mutation mutation={ ELIMINAR_USUARIO }
                                               onCompleted={ (data) => {

                                                 if (data.eliminarUsuarios){
                                                   this.setState(this.base.swal2.success('delete'));
                                                   return false;
                                                 }
                                                 this.setState(this.base.swal2.error());
                                               } }>
                                       { eliminarUsuarios => (
                                             <button
                                             onClick={ () => {
                                               this.base.swal2.create ('delete').then (result => {

                                                 if (result.value) {
                                                      eliminarUsuarios ({
                                                                         variables: {id}
                                                                       });
                                                 }
                                               });
                                             } }
                                             type="button"
                                             className={ this.base.button.EliminarTableCircle }>
                                            <i className={ this.base.icons.delete}></i>
                                          </button>

                                       ) }
             
                                     </Mutation>) }
                                     {this.props.Access("Usuarios","Actualizar") &&(<Link to={ `/Usuarios/Edit/${ id }` }>
                                       <button className={ this.base.button.EditarTableCircle }>
                                         <i className={ this.base.icons.edit}></i>
                                       </button>
                                     </Link>)}
                                   </td>
                                 </tr>
                              );
                            }) }
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* <Paginador
                       actual={this.state.paginador.actual}
                       total={data.totalProductos}
                       limite={this.limite}
                       paginaAnterior={this.paginaAnterior}
                       paginaSiguiente={this.paginaSiguiente}
                       /> */ }
                    </Fragment>
                 );
               } }
             </Query>
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (UsuarioIndex);