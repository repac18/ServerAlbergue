import React, { Fragment } from 'react'
import Producto from './Productos';

const  Resumen = (props) => {
    const productos =props.productos;

    if(productos.length===0){return null;}
    
    return ( <Fragment>
        
        <table className="table">
            <thead className="bg-success text-light">
                <tr className="font-weight-bold">
                    <th>Productos</th>
                    <th>Precio</th>
                    <th>Tipo</th>
                    <th>Inventario</th>
                    <th>Cantidad</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto,index)=>(
                    <Producto
                        key={producto.id}
                        id={producto.id}
                        producto={producto}
                        index={index}
                        actulizarCantidad={props.actulizarCantidad}
                        eliminarProducto={props.eliminarProducto}
                        validadTipo={props.validadTipo}
                    />
                ))}
            </tbody>
        </table>
    </Fragment> );
}
 
export default Resumen;