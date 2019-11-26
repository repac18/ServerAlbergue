import React, {Component, Fragment} from 'react';
import {Link,Redirect}                       from 'react-router-dom';
import {Query, Mutation}            from 'react-apollo';
import {ROLES_QUERY}                from '../../GraphQl/Querys/Roles';
import {ELIMINAR_ROL}               from '../../GraphQl/Mutations/Roles';
import Exito                        from '../Alertas/Exito';
import {setTimeout}                 from 'timers';
import {front}                      from '../FrontEnd/frontEnd';

class Roles extends Component {
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
    const redireccion=this.props.Access("Roles","Acceder")?'':<Redirect to='/'/>;
    
    return (
       <Fragment>
         {redireccion}
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('LISTA DE ROLES', 'Roles/Nuevo',true,!this.props.Access("Roles","Guardar")) }
           <div className="card-body">
             { alerta }
             <Query
                query={ ROLES_QUERY }
                // pollInterval={ 500 } // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={ {
                  limite: this.limite, offset: this.state.paginador.offset
                } }
             >
               { ({
                    loading,
                    error,
                    data,refetch,
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
                            {this.base.table.TableMenu([
                                                         {Nombre:'Nombre'},
                                                         {Nombre:'Descripciòn'},
                                                         {Nombre:'Opcion'}
                                                       ])}
                            <tbody>
                            { data.getroles.map (item => {
                              const {id} = item;
                              
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Nombre }</td>
                                   <td>{ item.Descripcion }</td>
                                   <td>
                                     {this.props.Access("Roles","Eliminar") && ( <Mutation mutation={ ELIMINAR_ROL }
                                                 onCompleted={ (data) => {
                                                   
                                                   this.setState ({
                                                                    alert: {
                                                                      mostrar: true,
                                                                      mensaje: data.eliminarRoles
                                                                    }
                                                                  }, () => {
                                                     setTimeout (() => {
                                                       this.setState ({
                                                                        alert: {
                                                                          mostrar: false,
                                                                          mensaje: ''
                                                                        }
                                                                      });
                                                     }, 3000);
                                       
                                                   });
                                                 } }>
                                     { eliminarRoles => (
                                        <button
                                           onClick={ () => {
                                             this.base.swal2.create('delete').then(result=>{
                                               if(result.value){
                                                 eliminarRoles ({variables: {id}});
                                               }
                                             });
                                           } }
                                           type="button"
                                           className={ this.base.button.EliminarTableCircle }>
                                          <i className={ this.base.icons.delete}></i>
                                        </button>
                                     ) }
                                   </Mutation>)}
                                    {this.props.Access("Roles","Actualizar") && ( <Link to={ `/Roles/Edit/${ id }` }>
                                       <button type="button" className={ this.base.button.EditarTableCircle }>
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

export default Roles;