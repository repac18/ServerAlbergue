import React from 'react'
import {Mutation} from 'react-apollo';
import {NUEVO_ENTRADASALIDAINVENTARIO} from '../../GraphQl/Mutations/EntradaSalidaInventario';
//import {NUEVO_PEDIDO} from '../../mutation';
import {withRouter} from 'react-router-dom'


const validaPedido=(props)=>{
    let noValido=!props.productos||props.total<=0;
    return noValido;
}

const GenerarPedido  = (props) => {
    return ( 
        <Mutation mutation={NUEVO_ENTRADASALIDAINVENTARIO}
        onCompleted={()=>props.history.push('/MovimientoInventario')}>
        {nuevoPedido =>(
        <button
        disabled={validaPedido(props)}
        type="button"
        className="btn btn-warning mt-4"
        onClick={e=>{


const dataProductos=props.productos.map( item => { 
  return { 
	        id:item.id,
			Nombre:item.Nombre,
			Descripcion:item.Descripcion, 
            SKU:item.SKU,
            CodigoBarra:item.CodigoBarra,
            Clasificacion:item.Clasificacion,
            Tipo:item.Tipo, 
            Cantidad:item.cantidad,
            Precio:item.Precio
   }; 
});



            const input ={
                ...props.encabezado,
                Total:props.total,
                Productos:dataProductos
               

                // cliente:props.idCliente,
                // vendedor:props.idVendedor
            }
 

            nuevoPedido({
                variables:{input}
            })

        }}
        >
            Generar Pedido
        </button>
        )}
        </Mutation>
     );
}
 
export default withRouter(GenerarPedido) ;