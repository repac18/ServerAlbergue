import React, {Component, Fragment} from 'react';
import {Link,Redirect}                       from 'react-router-dom';
import {Query, Mutation}            from 'react-apollo';
import {EDIFICIOS_QUERY}            from '../../GraphQl/Querys/Edificios';
import {ELIMINAR_EDIFICIO}          from '../../GraphQl/Mutations/Edificios';
import Exito                        from '../Alertas/Exito';
import {front}                      from '../FrontEnd/frontEnd';

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
    

    
    const redireccion=this.props.Access("Edificios","Acceder")?'':<Redirect to='/'/>;
    return (
       <Fragment>
    {redireccion} 
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('Edificios', 'Edificios/Nuevo',true,!this.props.Access("Edificios","Guardar")) }
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
                    refetch
                  }) => {
                    refetch();
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
                                                           {Nombre: 'Opcion'}
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
                                     {this.props.Access("Edificios","Eliminar")
                                     && (<Mutation mutation={ ELIMINAR_EDIFICIO }
                                               onCompleted={ (data) => {

                                                   if (data.eliminarEdificio){
                                                       this.setState(this.base.swal2.success('delete'));
                                                       return false;
                                                   }
                                                   this.setState(this.base.swal2.error());
                                               } }>
                                       { eliminarEdificio => (
                                          <button
                                             onClick={ () => {
                                                 this.base.swal2.create ('delete').then (result => {

                                                     if (result.value) {
                                                         eliminarEdificio ({
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
                                     {this.props.Access("Edificios","Actualizar") && ( <Link to={ `/Edificios/Edit/${ id }` }>
                                       <button className={ this.base.button.EditarTableCircle }>
                                         <i className={ this.base.icons.edit}>
                                         
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

export default Edificio;