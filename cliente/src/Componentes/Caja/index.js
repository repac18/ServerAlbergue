import React, {Component, Fragment}    from 'react';
import {Link,Redirect}                          from 'react-router-dom';
import {Query}                         from 'react-apollo';
import {ENTRADASALIDACAJACHICAS_QUERY} from '../../GraphQl/Querys/EntradaSalidaCajaChica';
import Exito                           from '../Alertas/Exito';
import {front}                         from '../FrontEnd/frontEnd';

// import { setTimeout } from 'timers';
class Cajaindex extends Component {
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
    
 
    const redireccion=this.props.Access("Movimiento Caja","Acceder")?'':<Redirect to='/'/>;
 
    return (
       <Fragment>
    {redireccion}

         <div className={this.base.button.card_borderPrimary}>
           {this.base.cardHeader.getCard('ENTRADA/SALIDA CAJA','Cajas/entradaSalida',true,!this.props.Access("Movimiento Caja","Guardar"))}
           <div className="card-body">
             { alerta }
             <Query
                query={ ENTRADASALIDACAJACHICAS_QUERY }
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
                            {this.base.table.TableMenu([
                                                         {Nombre:'Responsable'},
                                                         {Nombre:'Cantidad'},
                                                         {Nombre:'Fecha'},
                                                         {Nombre:'Estado'},
                                                         {Nombre:'Opcion'}
                                                       ])}
                            <tbody>
                            { data.getentradaSalidaCajaChicas.map (item => {
                              const {id} = item;
                              const fecha = new Date(Number(item.Fecha));
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Responsable }</td>
                                   <td>{ item.Cantidad }</td>
                                   <td>{ fecha.toISOString().substring(0,10) }</td>
                                   <td>{ item.Estado }</td>
                                   {this.props.Access("Movimiento Caja","Actualizar") && (
                                   <td>
                                     <Link to={ `/Cajas/Edit/${ id }` }>
                                       <button className={this.base.button.EditarTableCircle}>
                                         <i className={ this.base.icons.edit}></i>
                                       </button>
                                     </Link>
                                   </td>)}
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

export default Cajaindex;