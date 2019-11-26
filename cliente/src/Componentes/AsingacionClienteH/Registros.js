import React, {Component, Fragment}                 from 'react';
import {Redirect}                              from 'react-router-dom';
import {Query, Mutation}                            from 'react-apollo';
import {ASIGNACIONES_CLIENTES_QUERY}               from '../../GraphQl/Querys/AsignacionClientes';
import {ELIMINAR_ASIGNACIONCLIENTES}               from '../../GraphQl/Mutations/AsignarCliente';
import Exito                                        from '../Alertas/Exito';
import {front}                                      from '../FrontEnd/frontEnd';

class AsignacionClienteIndex extends Component {
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
    
   const redireccion=this.props.Access("Clientes","Acceder")?'':<Redirect to='/'/>;

    return (
       <Fragment>
         <div className={this.base.button.card_borderPrimary}>
         {redireccion}
           { this.base.cardHeader.getCard ('ASIGNACION CLIENTES', 'AsignacionClientes',false,true) }
           <div className="card-body">
             { alerta }
             <Query
                query={ ASIGNACIONES_CLIENTES_QUERY }
                // pollInterval={ 500 } // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={ {
                  limite: this.limite, offset: this.state.paginador.offset
                } }>
               { ({
                    loading,
                    error,
                    data,
                    refetch,
                    startPolling,
                    stopPolling //para recargar el resto de la vista
                  }) => {
                    refetch()
                 if (loading) return this.base.text.Cargando;
                 if (error) return `Error: ${ error.message }`;
                 return (
                    <Fragment>
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table">
                            {this.base.table.TableMenu([
                                                          {Nombre:'Edificio'},
                                                          {Nombre:'Nivel'},
                                                          {Nombre:'Habitacion'},
                                                          {Nombre:'Cliente'},
                                                          {Nombre:'FechaIngreso'},
                                                          {Nombre:'Opciones'}
                                                       ])}
                            <tbody>
                            { data.getAsignacionClientes.map (item => {
                              const {id,Edificio,Nivel,Habitacion} = item;
                              const fecha = new Date(Number(item.FechaIngreso));
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Edificio }</td>
                                   <td>{ item.Nivel }</td>
                                   <td>{ item.Habitacion }</td>
                                   <td>{ item.Cliente }</td>
                                   <td>{ fecha.toISOString().substring(0,10) }</td>
                                   <td>
                                    {this.props.Access("Clientes","Eliminar")
                                    && ( <Mutation mutation={ ELIMINAR_ASIGNACIONCLIENTES }
                                               onCompleted={ (data) => {

                                                   if (data.eliminarAsignacionCliente){
                                                       this.setState(this.base.swal2.success('delete'));
                                                       return false;
                                                   }
                                                   this.setState(this.base.swal2.error());
                                               } }>
                                       { eliminarAsignacionCliente => (
                                          <button
                                             onClick={ () => {
                                                   this.base.swal2.create ('edit').then (result => {
console.log(id,Edificio,Nivel,Habitacion)
                                                       if (result.value) {
                                                        eliminarAsignacionCliente ({
                                                                               variables: {id,Edificio,Nivel,Habitacion}
                                                                           });
                                                       }
                                                   });
                                             } }
                                             type="button"
                                             className={this.base.button.EliminarTableCircle}>
                                            <i className={ this.base.icons.edit}></i>
                                          </button>
                                       ) }


                                       {/* variables={ {input:{  
                                        Edificio: this.state.Nombre,
                                        Nivel:this.state.Estructura[index].Nombre,
                                        Habitacion: this.state.Estructura[index].Habitaciones[index_h].Nombre,
                                        Cliente:this.state.idCliente,
                                        FechaIngreso:this.state.Fecha,
                                        Edificios:{
                                          id:this.state.id,
                                          Nombre: this.state.Nombre,
                                          Latitud:  this.state.Latitud,
                                          Longitud:   this.state.Longitud,
                                          Estructura:this.state.Estructura
                                                }
                                        }}} */}
                                     </Mutation>)}
                                    </td>
                                 </tr>
                              );
                            }) }
                            </tbody>
                          </table>
                        </div>
                      </div>
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

export default AsignacionClienteIndex;