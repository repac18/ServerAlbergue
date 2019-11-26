import React, { Fragment } from 'react'
import ProductosEdit from './ProductosEdit';

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
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto,index)=>(
                    <ProductosEdit
                        key={producto.id}
                        id={producto.id}
                        producto={producto}
                        index={index}
                        actulizarCantidad={props.actulizarCantidad}
                        eliminarProducto={props.eliminarProducto}
                    />
                ))}
            </tbody>
        </table>
    </Fragment> );
}
 
export default Resumen;