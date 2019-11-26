import React, {Component, Fragment} from 'react';
import {Link,Redirect}                       from 'react-router-dom';
import {Query}            from 'react-apollo';
import {EDIFICIOS_QUERY}            from '../../GraphQl/Querys/Edificios';
import Exito                        from '../Alertas/Exito';
import {front}                      from '../FrontEnd/frontEnd';
import {withRouter}                 from 'react-router-dom';

// import Paginador from '../Paginador';

class Edificio extends Component {
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
    
    const alerta = (mostrar) ? <Exito mensaje={ mensaje }/> : '';
    
    const {idCliente} = this.props.match.params;
   
    
    const redireccion=this.props.Access("Edificios","Acceder")?'':<Redirect to='/'/>;
    return (
       <Fragment>
    {redireccion} 
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('Edificios', 'Clientes',false,!this.props.Access("Edificios","Guardar")) }
           <div className="card-body">
             { alerta }
             <Query
                query={ EDIFICIOS_QUERY }
                // pollInterval={ 500 } // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
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
                                                           {Nombre: 'Nombre'},
                                                           {Nombre: 'Latitud'},
                                                           {Nombre: 'Longitud'},
                                                           {Nombre: 'Asignar'}
                                                         ]) }
                            <tbody>
                            { data.getedificios.map (item => {
                              const {id} = item;
                   
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Nombre }</td>
                                   <td>{ item.Latitud }</td>
                                   <td>{ item.Longitud }</td>
                                   <td>
                                    
                                     {this.props.Access("Edificios","Actualizar") && ( <Link to={ `/AsignacionCliente/Edit/${idCliente}&${id}` }>
                                       <button className={ this.base.button.EditarTableCircle } data-toggle="tooltip" data-placement="left" title="ASIGNAR">
                                         <i className={ this.base.icons.check}>
                                         
                                         </i>
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

export default withRouter(Edificio);