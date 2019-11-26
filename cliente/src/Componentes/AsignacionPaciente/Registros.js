import React, {Component, Fragment}                 from 'react';
import {Redirect}                              from 'react-router-dom';
import {Query, Mutation}                            from 'react-apollo';
import {ASIGNACIONES_PACIENTES_QUERY}               from '../../GraphQl/Querys/AsignacionPacientes';
import {ELIMINAR_ASIGNACIONPACIENTES}               from '../../GraphQl/Mutations/AsignacionPacientes';
import Exito                                        from '../Alertas/Exito';

import {front}                                      from '../FrontEnd/frontEnd';

class AsignacionPacienteIndex extends Component {
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
           { this.base.cardHeader.getCard ('ASIGNACION PACIENTES', 'AsignacionPaciente',true,!this.props.Access("Clientes","Guardar")) }
           <div className="card-body">
             { alerta }
             <Query
                query={ ASIGNACIONES_PACIENTES_QUERY }
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
                                                         {Nombre:'Pacientes'},
                                                         {Nombre:'Clientes'},
                                                         {Nombre:'Hospitales'},
                                                         {Nombre:'Fecha'},
                                                         {Nombre:'Estado'},
                                                         {Nombre:'Observaciones'},
                                                         {Nombre:'Opciones'}
                                                       ])}
                            <tbody>
                            { data.getasignacionpacientes.map (item => {
                              const {id} = item;
                              const fecha = new Date(Number(item.Fecha));
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Pacientes[0].Nombre }</td>
                                   <td>{ item.Clientes[0].Nombre }</td>
                                   <td>{ item.Hospitales }</td>
                                   <td>{ fecha.toISOString().substring(0,10) }</td>
                                   <td>{ item.Estado }</td>
                                   <td>{ item.Observaciones }</td>
                                   <td>
                                    {this.props.Access("Clientes","Eliminar")
                                    && ( <Mutation mutation={ ELIMINAR_ASIGNACIONPACIENTES }
                                               onCompleted={ (data) => {

                                                   if (data.eliminarAsignacionPaciente){
                                                       this.setState(this.base.swal2.success('','RETIRADO','ACCION'));
                                                       return false;
                                                   }
                                                   this.setState(this.base.swal2.error());
                                               } }>
                                       { eliminarAsignacionPaciente => (
                                          <button
                                             onClick={ () => {
                                                   this.base.swal2.create ('edit').then (result => {

                                                       if (result.value) {
                                                        eliminarAsignacionPaciente ({
                                                                               variables: {id}
                                                                           });
                                                       }
                                                   });
                                             } }
                                             type="button"
                                             className={this.base.button.EliminarTableCircle}>
                                            <i className={ this.base.icons.edit}></i>
                                          </button>
                                       ) }

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

export default AsignacionPacienteIndex;