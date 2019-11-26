import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_PRODUCTO}        from '../../GraphQl/Mutations/Productos';
import {Mutation}                   from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';
import Generic                      from '../Mantenimientos/ListadeValores/Generic';

const initialState = {
  Nombre:        '',
  Descripcion:   '',
  SKU:           '',
  CodigoBarra:   '',
  Clasificacion: '',
  Precio:         0,
  Tipo:          '',
  Cantidad:      0
};

class ProductosNuevo extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Producto
    };
  }
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: (name === 'Cantidad' || name === 'Precio') ? Number.parseInt (value) : value
                   });
  };
  
  actualizarProducto = (e, actualizarProducto) => {
    e.preventDefault ();
    this.base.swal2.create('create').then(result=>{
      if(result.value){
        actualizarProducto ().then (data => {
          this.ClearState ();
          this.base.swal2.success('create');
        });
      }
    });
    //insertamos en la base de datos
    
  };
  
  render () {
    const {
            id, Nombre,
            Descripcion,
            SKU,
            CodigoBarra,
            Clasificacion,
            Tipo,
            Precio,
            Cantidad
          } = this.state;
    
    const input = {
      id,
      Nombre,
      Descripcion,
      SKU,
      CodigoBarra,
      Clasificacion,
      Tipo,
      Precio,
      Cantidad
    };
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_PRODUCTO } variables={ {input} } key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Productos');
                   }) }>
           { (actualizarProducto, {loading, error, data}) => {
             return (
                <form autoComplete="off"
                   onSubmit={ e => this.actualizarProducto (e, actualizarProducto) }
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Nombre }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Descripcion:</label>
                        <input
                           type="text"
                           name="Descripcion"
                           className="form-control"
                           placeholder="Descripcion del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Descripcion }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>SKU:</label>
                        <input
                           type="text"
                           name="SKU"
                           className="form-control"
                           placeholder="SKU del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.SKU }
                        
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Codigo de Barras:</label>
                        <input
                           type="text"
                           name="CodigoBarra"
                           className="form-control"
                           placeholder="Codigo de Barra del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.CodigoBarra }
                        
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Clasificacion:</label>
                        <Generic
                               id="5d9588e2a3a25d124c8da9cf"
                               Value={ this.state.Clasificacion }
                               UpdateState={ this.UpdateState }
                               autoComplete='off'
                               Campo={ 'Clasificacion' }
                               NValor={ true }
                            />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Tipo:</label>
                           <Generic
                               id="5d7c7586726163304cba4cc9"
                               Value={ this.state.Tipo }
                               UpdateState={ this.UpdateState }
                               autoComplete='off'
                               Campo={ 'Tipo' }
                               NValor={ true }
                            />
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Precio:</label>
                        <input
                           type="number"
                           name="Precio"
                           className="form-control"
                           placeholder="Precio"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Precio }
                        
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Cantidad:</label>
                        <input
                           type="number"
                           name="Cantidad"
                           className="form-control"
                           placeholder="Cantidad del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Cantidad }
                        
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="submit" className={ this.base.button.Primary + ' float-right' }>
                        <i className={this.base.icons.save}></i>
                        { this.base.text.Guardar }
                      </button>
                    </div>
                  </div>
                </form>
             );
           } }
         </Mutation>
       </Fragment>
    );
  }
}

export default withRouter (ProductosNuevo);