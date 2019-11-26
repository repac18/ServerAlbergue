import React, { Component,Fragment } from 'react'

class Producto extends Component {
    state = {  }


    render() { 

    const {producto}=this.props;

        return (
        <Fragment>
            <tr>
                <td>{producto.Nombre}</td>
                <td>Q {producto.Precio}</td>
                <td>{producto.Tipo}</td>
                <td>{producto.Stock}</td>
                <td>
                    <input
                        min="1"
                        type="number"
                        className="form-control"
                        onChange={e=> {
                           if(this.props.validadTipo===2)
                         {   if(e.target.value>producto.Stock)
                            {
                                e.target.value=0;
                            }}
                            this.props.actulizarCantidad(e.target.value,this.props.index)
                        }}
                    />
                </td>
                <td>
                    <button type="button"
                    className="btn btn-danger font-weight-bold"
                    onClick={e=>this.props.eliminarProducto(producto.id)}>
                    &times; Eliminar    
                    </button>
                </td>

            </tr>

        </Fragment>
        
            );
    }
}
 
export default Producto;