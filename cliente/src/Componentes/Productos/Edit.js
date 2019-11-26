import React, {Component, Fragment} from 'react';
import {PRODUCTO_QUERY}             from '../../GraphQl/Querys/Productos';
import FormularioEditarProducto     from './FormularioEditarProducto';
import {Query}                      from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}     from '../FrontEnd/frontEnd';

class ProductosEdit extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    const {id} = this.props.match.params;
    
    return (
       <Fragment>
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('Editar Producto', 'Productos', false) }
           <div className="card-body">
             <div className='row'>
               <Query query={ PRODUCTO_QUERY } variables={ {id} }>
                 { ({
                      loading, error, data, refetch/**esto lo que haces es
                    realizar nuevamente la consulta */
                    }) => {
                   if (loading) return 'Cargando';
                   if (error) return `Error: ${ error.message }`;
                   
                   return <FormularioEditarProducto
                      Producto={ data.getproducto }
                      refetch={ refetch }
                   />;
                   
                 }
                 }
               </Query>
             </div>
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (ProductosEdit);