// export const PRODUCTOS_QUERY = gql`
// 	query getproductos($limit: Int, $Offset: Int) {
// 		getproductos(limit: $limit, Offset: $Offset) {
// 			id
// 			Nombre
// 			Descripcion 
//             SKU
//             CodigoBarra
//             Clasificacion
//             Tipo 
//             Cantidad

//     }
// }
// `;

import React, {Component, Fragment} from 'react';
import {Link, Redirect}             from 'react-router-dom';
import {Query, Mutation}            from 'react-apollo';
import {PRODUCTOS_QUERY}            from '../../GraphQl/Querys/Productos';
import {ELIMINAR_PRODUCTO}          from '../../GraphQl/Mutations/Productos';
import Exito                        from '../Alertas/Exito';
import {front}                      from '../FrontEnd/frontEnd';

class ProductosIndex extends Component {
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
    
    const redireccion = this.props.Access ('Productos', 'Acceder') ? '' : <Redirect to='/'/>;
    return (
       <Fragment>
         <div className={ this.base.button.card_borderPrimary }>
           { redireccion }
           
           { this.base.cardHeader.getCard ('PRODUCTOS', 'Productos/Nuevo', true, !this.props.Access ('Productos', 'Guardar')) }
           <div className="card-body">
             { alerta }
             <Query
                query={ PRODUCTOS_QUERY }
                // pollInterval={ 500 } // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={ {
                  limite: this.limite, offset: this.state.paginador.offset
                } }
             >
               { ({
                    loading,
                    error,
                    data, refetch
                    // startPolling,
                    // stopPolling //para recargar el resto de la vista
                  }) => {
                 refetch ();
                 if (loading) return 'Cargando...';
                 if (error) return `Error: ${ error.message }`;
                 return (
                    <Fragment>
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table">
                            { this.base.table.TableMenu (
                               [
                                 {Nombre: 'Nombre'},
                                 {Nombre: 'Descripcion'},
                                 {Nombre: 'SKU'},
                                 {Nombre: 'Codigo Barra'},
                                 {Nombre: 'Clasificacion'},
                                 {Nombre: 'Tipo'},
                                 {Nombre: 'Precio'},
                                 {Nombre: 'Cantidad'},
                                 {Nombre: 'Opcion'}
                               ]) }
                            <tbody>
                            { data.getproductos.map (item => {
                              const {id} = item;
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Nombre }</td>
                                   <td>{ item.Descripcion }</td>
                                   <td>{ item.SKU }</td>
                                   <td>{ item.CodigoBarra }</td>
                                   <td>{ item.Clasificacion }</td>
                                   <td>{ item.Tipo }</td>
                                   <td>{ item.Precio }</td>
                                   <td>{ item.Cantidad }</td>
                                   <td>
                                     { this.props.Access ('Productos', 'Eliminar')
                                     && (<Mutation mutation={ ELIMINAR_PRODUCTO }
                                                   onCompleted={ (data) => {
                                                   
                                                     if (data.eliminarProductos){
                                                       this.setState(this.base.swal2.success('delete'));
                                                      return false;
                                                     }
                                                     this.setState(this.base.swal2.error());
                                                   } }>
                                       { eliminarProductos => (
                                          <button
                                             onClick={ () => {
                                               this.base.swal2.create ('delete').then (result => {

                                                 if (result.value) {
                                                   eliminarProductos ({
                                                                        variables: {id}
                                                                      });
                                                 }
                                               });
                                             } }
                                             type="button"
                                             className={ this.base.button.EliminarTableCircle }>
                                            <i className={ this.base.icons.delete }></i>
                                          </button>
                                       ) }
                                     </Mutation>) }
                                     { this.props.Access ('Productos', 'Actualizar') && (<Link to={ `/Productos/Edit/${ id }` }>
                                       <button className={ this.base.button.EditarTableCircle }>
                                         <i className={ this.base.icons.edit }></i>
                                       </button>
                                     </Link>) }
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

export default ProductosIndex;