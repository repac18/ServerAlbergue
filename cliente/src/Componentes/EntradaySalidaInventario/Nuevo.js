import React, {Component, Fragment} from 'react';
import {PRODUCTOS_QUERY}            from '../../GraphQl/Querys/Productos';
import {Query}                      from 'react-apollo';
import {withRouter, Redirect}       from 'react-router-dom';
import ContenidoPedido              from './ContenidoPedido';
import {front}                      from '../FrontEnd/frontEnd';

const initialState = {
  Responsable: '',
  Cantidad:    '',
  Tipo:        '',
  Fecha:       '',
  Estado:      ''
};

class EntradaSalidaNuevo extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...initialState
    };
  }
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  // verificar este
  
  // crearEntradaSalida = (e, nuevaEntradaSalida) => {
  // 	e.preventDefault();
  // 	//insertamos en la base de datos
  // 	nuevaEntradaSalida().then((data) => {
  // 		this.ClearState();
  
  // 		//direccionar
  // 		this.props.history.push('/MovimientoInventario');
  // 	});
  // };
  
  render () {
    
    const redireccion = this.props.Access ('Movimiento Inventario', 'Guardar') ? '' : <Redirect to="/"/>;
    
    return (
       <Fragment>
         { redireccion }
         
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('Inventario Entradas/Salidas', 'MovimientoInventario', false) }
           <div className="card-body">
             <div className="col-md-9">
               <Query
                  query={ PRODUCTOS_QUERY }
                  // pollInterval={500} // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                  variables={ {stock: true} }
               >
                 { ({
                      loading,
                      error,
                      data, refetch,
                      startPolling,
                      stopPolling //para recargar el resto de la vista
                    }) => {
                   refetch ();
                   if (loading)
                     return (
                        <div className="spinner">
                          <div className="bounce1"/>
                          <div className="bounce2"/>
                          <div className="bounce3"/>
                        </div>
                     );
                   if (error) return `Error ${ error.message }`;
                   
                   const dataProductos = data.getproductos.map (item => {
                     return {
                       id:            item.id,
                       Nombre:        item.Nombre,
                       Descripcion:   item.Descripcion,
                       SKU:           item.SKU,
                       CodigoBarra:   item.CodigoBarra,
                       Clasificacion: item.Clasificacion,
                       Tipo:          item.Tipo,
                       Stock:         item.Cantidad,
                       Precio:        item.Precio
                       
                     };
                   });
                   return <ContenidoPedido productos={ dataProductos }/>;
                 } }
               </Query>
             </div>
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (EntradaSalidaNuevo);
