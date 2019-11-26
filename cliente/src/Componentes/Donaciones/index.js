// export const Donaciones_QUERY = gql`
// 	query getproductos($limit: Int, $Offset: Int) {
// 		getproductos(limit: $limit, Offset: $Offset) {
// 			
//			UsuarioId
//			Responsable
//			Donante
//          Cantidad
//			Tipo
//			Fecha
//			Estado

//     }
// }
// `;

import React, {Component, Fragment} from 'react';
import {Link,Redirect}                       from 'react-router-dom';
import {Query}                      from 'react-apollo';
import {DONACIONES_QUERY}           from '../../GraphQl/Querys/Donaciones';
import Exito                        from '../Alertas/Exito';
import {front}                      from '../FrontEnd/frontEnd';

// import { setTimeout } from 'timers';
class DonacionesIndex extends Component {
  base=new front();
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
    

    

    const redireccion=this.props.Access("Donaciones","Acceder")?'':<Redirect to='/'/>;
    
    return (
       <Fragment>
      
    {redireccion} 
         <div className={this.base.button.card_borderPrimary}>
           {this.base.cardHeader.getCard('Donaciones','Donaciones/Nuevo',true,!this.props.Access("Donaciones","Acceder"))}
           <div className="card-body">
             { alerta }
             <Query
                query={ DONACIONES_QUERY }
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
                            {this.base.table.TableMenu([
                                                         {Nombre:'Responsable'},
                                                         {Nombre:'Donante'},
                                                         {Nombre:'Tipo'},
                                                         {Nombre:'Fecha'},
                                                         {Nombre:'Estado'},
                                                         {Nombre:'Cantidad'},
                                                         {Nombre:'Opcion'}
                                                       ])}
                            <tbody>
                            { data.getdonaciones.map (item => {
                              const {id} = item;
                              const fecha = new Date(Number(item.Fecha));
      
                              return (
                                 <tr key={ id }>
                                   <td>{ item.Responsable }</td>
                                   <td>{ item.Donante }</td>
                                   <td>{ item.Tipo }</td>
                                   <td>{ fecha.toISOString().substring(0,10) }</td>
                                   <td>{ item.Estado }</td>
                                   <td>{ item.Cantidad }</td>
                                   {this.props.Access("Donaciones","Actualizar") && ( <td>
                                     <Link to={ `/Donaciones/Edit/${ id }` } >
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

export default DonacionesIndex;