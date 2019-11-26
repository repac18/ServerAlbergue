import React, {Component, Fragment} from 'react';
import {Link,Redirect}              from 'react-router-dom';
import {Query, Mutation}            from 'react-apollo';
import {RESPONSABLES_QUERY}             from '../../GraphQl/Querys/Responsables';
import {ELIMINAR_RESPONSABLE}           from '../../GraphQl/Mutations/Responsable';
import Exito                        from '../Alertas/Exito';
import {front}                      from '../FrontEnd/frontEnd';

class ResponsableIndex extends Component {
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
           { this.base.cardHeader.getCard ('RESPONSABLES', 'Responsables/Nuevo',true,!this.props.Access("Clientes","Guardar")) }
           <div className="card-body">
             { alerta }
             <Query
                query={ RESPONSABLES_QUERY }
                // pollInterval={ 500 } // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={ {
                  limite: this.limite, offset: this.state.paginador.offset
                } }>
               { ({
                    loading,
                    error,
                    data,
                    refetch
                  }) => {
                 refetch();
                 if (loading) return this.base.text.Cargando;
                 if (error) return `Error: ${ error.message }`;
                 return (
                    <Fragment>
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table">
                            {this.base.table.TableMenu([
                                                         {Nombre:'Nombre'},
                                                         {Nombre:'Apellido'},
                                                         {Nombre:'Edad'},
                                                         {Nombre:'Direccion'},
                                                         {Nombre:'Dpi'},
                                                         {Nombre:'Nit'},
                                                         {Nombre:'Sexo'},
                                                         {Nombre:'Municipio'},
                                                         {Nombre:'Departamento'},
                                                         {Nombre:'Opcion'}
                                                       ])}
                            <tbody>
                            { data.getresponsables.map (item => {
                              const {id} = item;
                              
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Nombre }</td>
                                   <td>{ item.Apellido }</td>
                                   <td>{ item.Edad }</td>
                                   <td>{ item.Direccion }</td>
                                   <td>{ item.Dpi }</td>
                                   <td>{ item.Nit }</td>
                                   <td>{ item.Sexo }</td>
                                   <td>{ item.Municipio }</td>
                                   <td>{ item.Departamento }</td>
                                   <td>
                                     {this.props.Access("Clientes","Eliminar")
                                     && ( <Mutation mutation={ ELIMINAR_RESPONSABLE }
                                                    onCompleted={ (data) => {
                                       
                                                      if (data.eliminarClientes){
                                                        this.setState(this.base.swal2.success('delete'));
                                                        return false;
                                                      }
                                                      this.setState(this.base.swal2.error());
                                                    } }>
                                       { eliminarClientes => (
                                          <button
                                             onClick={ () => {
                                               this.base.swal2.create ('delete').then (result => {
                                                 
                                                 if (result.value) {
                                                   eliminarClientes ({
                                                                       variables: {id}
                                                                     });
                                                 }
                                               });
                                             } }
                                             type="button"
                                             className={this.base.button.EliminarTableCircle}>
                                            <i className={ this.base.icons.delete}></i>
                                          </button>
                                       ) }
                                     
                                     </Mutation>)}
                                     {this.props.Access("Clientes","Actualizar") && ( <Link to={ `/Responsables/Edit/${ id }` }>
                                       <button className={this.base.button.EditarTableCircle}>
                                         <i className={ this.base.icons.edit}></i>
                                       </button>
                                     </Link>)}
                                   </td>
                                 </tr>
                              );
                            }) }
                            </tbody>
                          </table>
                          {/* <Paginador
                           actual={this.state.paginador.actual}
                           total={data.totalProductos}
                           limite={this.limite}
                           paginaAnterior={this.paginaAnterior}
                           paginaSiguiente={this.paginaSiguiente}
                           /> */ }
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

export default ResponsableIndex;