import React, {Component, Fragment} from 'react';
import {Link, Redirect}             from 'react-router-dom';
import {Query}                      from 'react-apollo';
import {LISTADEVALORES_QUERY}       from '../../../GraphQl/Querys/ListaDeValores';
// import {ELIMINAR_LISTADEVALORES}  from '../../../GraphQl/Mutations/ListaDeValores';
import Exito                        from '../../Alertas/Exito';
import {front}                      from '../../FrontEnd/frontEnd';
// import { setTimeout } from 'timers';
// import Generic from "./Generic"
// import Paginador from '../Paginador';

class ListaDeValores extends Component {
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
  
  paginaAnterior  = () => {
    this.setState ({
                     paginador: {
                       offset: this.state.paginador.offset - this.limite,
                       actual: this.state.paginador.actual - 1
                     }
                   });
    
  };
  paginaSiguiente = () => {
    this.setState ({
                     paginador: {
                       offset: this.state.paginador.offset + this.limite,
                       actual: this.state.paginador.actual + 1
                     }
                   });
    
  };
  
  render () {
    const {alert: {mostrar, mensaje}} = this.state;
    
    const alerta      = (mostrar) ? <Exito mensaje={ mensaje }/> : '';
    const redireccion = this.props.Access ('Mantenimientos', 'Acceder') ? '' : <Redirect to='/'/>;
    
    return (
       <Fragment>
         { redireccion }
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('LISTA DE VALORES', 'ListaDeValores', false, true) }
           <div className="card-body">
             { alerta }
             <Query
                query={ LISTADEVALORES_QUERY }
                // pollInterval={ 500 } // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={ {
                  limite: this.limite, offset: this.state.paginador.offset
                } }
             >
               { ({
                    loading,
                    error,
                    data, refetch,
                    startPolling,
                    stopPolling //para recargar el resto de la vista
                  }) => {
                 refetch ();
                 if (loading) return 'Cargando...';
                 if (error) return `Error: ${ error.message }`;
                 
                 return (
                    <Fragment>
                      <div className="row">
                        <div className="table-responsive ">
                          <table className="table">
                            { this.base.table.TableMenu ([
                                                           {Nombre: 'Nombre'},
                                                           {Nombre: 'Agregar Detalle'}
                                                         ]) }
                            <tbody>
                            { data.getListaDeValores.map (item => {
                              const {id} = item;
                              
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Nombre }</td>
                                   { this.props.Access ('Mantenimientos', 'Actualizar') && (<td>
                                     <Link to={ `/Mantenimientos/ListaDeValores/Edit/${ id }` }>
                                       <button className={ this.base.button.EditarTableCircle }>
                                         <i className={ this.base.icons.edit }></i>
                                       </button>
                                     </Link>
                                   </td>) }
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

export default ListaDeValores;