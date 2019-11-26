import React, {Component, Fragment} from 'react';
import Select                       from 'react-select';
import makeAnimated                 from 'react-select/animated';
import Resumen                      from './Resumen';
import GenerarPedido                from './GenerarPedido';
import Error                        from '../Alertas/Error';
import Generic                      from '../Mantenimientos/ListadeValores/Generic';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

class ContenidoPedido extends Component {
  state = {
    encabezado: [],
    productos:  [],
    total:      0
  };
  
  UpdateState         = (e) => {
    const {name, value} = e.target;
    this.setState ({
      
                     encabezado: {...this.state.encabezado, [name]: name === 'Cantidad' || name === 'Tipo' ? Number.parseInt (value) : value}
                   });
  };
  seleccionarProducto = (productos) => {
    // console.log(`aglo paso con`,productos);
    this.setState ({
                     productos
                   });
  };
  
  actulizarTotal    = () => {
    // leer el state de productos
    const productos = this.state.productos;
    
    // cuando todos los producttos estan en 0
    if (productos.length === 0) {
      this.setState ({
                       total: 0
                     });
      return;
    }
    
    let nuevoTotal = 0;
    // console.log(cantidad);
    
    // realizar la oprecion de cantidad x precio
    productos.map ((producto) => (nuevoTotal += producto.cantidad * producto.Precio));
    
    this.setState ({
                     total: nuevoTotal
                   });
  };
  actulizarCantidad = (cantidad, index) => {
    // leer el state de productos
    const productos = this.state.productos;
    
    // agregar cantidad desde la interfaz
    productos[index].cantidad = Number (cantidad);
    
    // agregamos al state
    this.setState ({
                     productos
                   }, () => {this.actulizarTotal ();});
  };
  
  eliminarProducto = (id) => {
    const productos = this.state.productos;
    
    const productosRestantes = productos.filter ((producto) => producto.id !== id);
    this.setState ({
                     productos: productosRestantes
                   }, () => {
      this.actulizarTotal ();
    });
  };
  
  render () {
    const mensaje = (this.state.total < 0) ? <Error error="Las cantidades no pueden ser negativas"/> : '';
    
    return (
       <Fragment>
         
         
         <div className="row">
           <div className="col-3">
             <div className="form-group">
               <label>Responsable:</label>
               <input
                  type="text"
                  name="Responsable"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={ this.UpdateState }
                  defaultValue={ this.state.encabezado.Responsable }
               />
             </div>
           </div>
           
           
           <div className="col-6">
             <div className="form-group">
               <label>Fecha:</label>
               <input
                  type="Date"
                  name="Fecha"
                  className="form-control"
                  placeholder="Fecha"
                  onChange={ this.UpdateState }
                  defaultValue={ this.state.encabezado.Fecha }
               />
             </div>
           </div>
           
           <div className="col-3">
             <div className="form-group">
               <label>Tipo:</label>
               <Generic
                  id="5d958890a3a25d124c8da9ce"
                  Value={ this.state.encabezado.Tipo }
                  UpdateState={ this.UpdateState }
                  Campo={ 'Tipo' }
               />
             </div>
           </div>
           
           <div className="col-3">
             <div className="form-group">
               <label>Estado:</label>
               <Generic
                  id="5d95886fa3a25d124c8da9cd"
                  Value={ this.state.encabezado.Estado }
                  UpdateState={ this.UpdateState }
                  Campo={ 'Estado' }
                  NValor={ true }
               />
             </div>
           </div>
         </div>
         
         
         <p className="text-center mb-5"><font size="4">Seleccionar Articulos</font></p>
         { mensaje }
         <Select
            onChange={ this.seleccionarProducto }
            options={ this.props.productos }
            isMulti={ true }
            components={ makeAnimated () }
            placeholder={ 'Seleccionar Producto' }
            getOptionLabel={ (options) => options.Nombre }
            getOptionValue={ (options) => options.id }
            value={ this.state.productos }
         />
         <Resumen
            productos={ this.state.productos }
            actulizarCantidad={ this.actulizarCantidad }
            eliminarProducto={ this.eliminarProducto }
            validadTipo={this.state.encabezado.Tipo}
         />
         <p className="font-weight-bold float-right mt-3 ">
           Total:
           <span className="font-weight-normal">Q { this.state.total }</span>
         </p>
         <GenerarPedido
            productos={ this.state.productos }
            total={ this.state.total }
            encabezado={ this.state.encabezado }
         />
       </Fragment>
    );
  }
}

export default ContenidoPedido;
