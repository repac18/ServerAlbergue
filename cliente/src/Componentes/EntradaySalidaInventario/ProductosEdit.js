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
                <td>{producto.Cantidad}</td>
           
                

            </tr>

        </Fragment>
        
            );
    }
}
 
export default Producto;