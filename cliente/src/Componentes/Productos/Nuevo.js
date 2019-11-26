import React, {Component, Fragment} from 'react';
import {NUEVO_PRODUCTO}             from '../../GraphQl/Mutations/Productos';
import {Mutation}                   from 'react-apollo';
import {withRouter,Redirect}        from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';
import Generic                      from '../Mantenimientos/ListadeValores/Generic';
import {MDBInput}                   from 'mdbreact';

const initialState = {
  Nombre:        '',
  Descripcion:   '',
  SKU:           '',
  CodigoBarra:   '',
  Clasificacion: '',
  Tipo:          '',
  Precio:        0,
  Cantidad:      0
};

class ProductosNuevo extends Component {
  base       = new front ();
  
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
  
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
      [name]: (name === 'Cantidad' || name === 'Precio') ? Number.parseInt (value) : value
                   });
  };
  
  crearNuevoProducto = (e, nuevoProducto) => {
    e.preventDefault ();
    this.base.swal2.create('create').then(result=>{
      if(result.value){
        //insertamos en la base de datos
        nuevoProducto ().then (data => {
          this.ClearState ();
          this.base.swal2.success('create');
          //direccionar
          this.props.history.push ('/Productos');
        });
      }
    });
    
  };


  
  render () {
    const {
            Nombre,
            Descripcion,
            SKU,
            CodigoBarra,
            Clasificacion,
            Tipo,
            Precio,
            Cantidad
          }     = this.state;
    const input = {
      Nombre,
      Descripcion,
      SKU,
      CodigoBarra,
      Clasificacion,
      Tipo,
      Precio,
      Cantidad
    };

   
    const redireccion=this.props.Access("Productos","Guardar")?'':<Redirect to='/'/>;
    return (
    <Fragment>
    {redireccion} 

         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('AGREGAR', 'Productos', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_PRODUCTO } variables={ {input} }>
               { (nuevoProducto, {loading, error, data}) => {
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearNuevoProducto (e, nuevoProducto) }
                    >
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Nombre del Producto" autoComplete="off" name="Nombre" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.Nombre }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Descripcion" autoComplete="off" name="Descripcion" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.Descripcion }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="SKU"  autoComplete="off" name="SKU" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.SKU }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Codigo de Barras"  autoComplete="off" name="CodigoBarra" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.CodigoBarra }
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
                            <MDBInput
                               label="Precio" type="number" name="Precio" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.Precio }
                            />
                          </div>
                        </div>
             
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Cantidad" type="number" name="Cantidad" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.Cantidad }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <button type="submit" className={this.base.button.Primary +' float-right'}>
                            <i className={this.base.icons.save}></i>
                            {this.base.text.Guardar}
                          </button>
                        </div>
                      </div>
                    </form>
                 );
               } }
             </Mutation>
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (ProductosNuevo);