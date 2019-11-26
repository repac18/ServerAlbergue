import React, {Component, Fragment} from 'react';
import {Link, Redirect}             from 'react-router-dom';
import {Query, Mutation}            from 'react-apollo';
import {HOSPITALES_QUERY}           from '../../GraphQl/Querys/Hospitales';
import {ELIMINAR_HOSPITAL}          from '../../GraphQl/Mutations/Hospital';

import {front}                      from '../FrontEnd/frontEnd';

// import Paginador from '../Paginador';

class Hospitales extends Component {
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
    
    
    const redireccion=this.props.Access("Hospitales","Acceder")?'':<Redirect to='/'/>;
    return (
       <Fragment>
         { redireccion }
         
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('HOSPITALES', 'Hospitales/Nuevo',true,!this.props.Access("Hospitales","Guardar")) }
           <div className="card-body">
             <Query
                query={ HOSPITALES_QUERY }
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
                            { this.base.table.TableMenu ([
                                                           {Nombre: 'Nombre'},
                                                           {Nombre: 'Descripcion'},
                                                           {Nombre: 'Latitud'},
                                                           {Nombre: 'Longitud'},
                                                           {Nombre: 'Opcion'}
                                                         ]) }
                            <tbody>
                            { data.getHospitales.map (item => {
                              const {id} = item;
                              
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Nombre }</td>
                                   <td>{ item.Descripcion }</td>
                                   <td>{ item.Latitud }</td>
                                   <td>{ item.Longitud }</td>
                                   <td>
                                     {this.props.Access("Hospitales","Eliminar")
                                     && ( <Mutation mutation={ ELIMINAR_HOSPITAL }
                                               onCompleted={ (data) => {

                                                   if (data.eliminarHospital){
                                                       this.setState(this.base.swal2.success('delete'));
                                                       return false;
                                                   }
                                                   this.setState(this.base.swal2.error());
                                               } }>
                                       { eliminarHospital => (
                                          <button
                                             onClick={ () => {
                                                 this.base.swal2.create ('delete').then (result => {

                                                 if (result.value) {
                                                     eliminarHospital ({
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
                                     {this.props.Access("Hospitales","Actualizar") && ( <Link to={ `/Hospitales/Edit/${ id }` }>
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

export default Hospitales;