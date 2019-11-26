import React, {Component, Fragment} from 'react';
import {Link}                       from 'react-router-dom';
import {Query, Mutation}            from 'react-apollo';
import {PERMISOS_QUERY}             from '../../GraphQl/Querys/Permisos';
import {ELIMINAR_PERMISO}           from '../../GraphQl/Mutations/Permisos';
import Exito                        from '../Alertas/Exito';

import {withRouter, Redirect}       from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class Permisos extends Component {
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
    
    const redireccion = this.props.Access ('Permisos', 'Acceder') ? '' : <Redirect to='/'/>;
    return (
       <Fragment>
         { redireccion }
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('LISTADO DE PERMISOS', 'Permisos/Nuevo',true,!this.props.Access ('Permisos', 'Acceder')) }
           <div className="card-body">
             { alerta }
             <Query
                query={ PERMISOS_QUERY }
                // pollInterval={ 500 } // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={ {
                  limite: this.limite, offset: this.state.paginador.offset
                } }
             >
               { ({
                    loading,
                    error,
                    data, refetch
                  }) => {
                 refetch ();
                 if (loading) return 'Cargando...';
                 if (error) return `Error: ${ error.message }`;
                 return (
                    <Fragment>
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table">
                            {this.base.table.TableMenu([
                                                         {Nombre:'Nombre'},
                                                         {Nombre:'Descripcion'},
                                                         {Nombre:'URL'},
                                                         {Nombre:'Menu'},
                                                         {Nombre:'Opcion'}
                                                       ])}
                            <tbody>
                            { data.getpermisos.map (item => {
                              const {id} = item;
                              
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Nombre }</td>
                                   <td>{ item.Descripcion }</td>
                                   <td>{ item.URL }</td>
                                   <td>{ item.Menu }</td>
                                   <td>
                                     {this.props.Access ('Permisos', 'Eliminar')
                                     && ( <Mutation mutation={ ELIMINAR_PERMISO }
                                               onCompleted={ (data) => {

                                                   if (data.eliminarPermisos()){
                                                     this.setState(this.base.swal2.success('delete'));
                                                     return false;
                                                   }
                                                   this.setState(this.base.swal2.error());
                                               } }>
                                       { eliminarPermisos => (
                                          <button
                                             onClick={ () => {
                                               this.base.swal2.create ('delete').then (result => {

                                                 if (result.value) {
                                                   eliminarPermisos ({
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
                                     
                                     </Mutation>)}
                                     {this.props.Access ('Permisos', 'Actualizar') && ( <Link to={ `/Permisos/Edit/${ id }` }>
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

export default withRouter (Permisos);