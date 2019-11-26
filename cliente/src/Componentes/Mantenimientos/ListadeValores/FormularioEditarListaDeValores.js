import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_LISTADEVALORES}  from '../../../GraphQl/Mutations/ListaDeValores';
import {Mutation}                   from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../../FrontEnd/frontEnd';

const initialState = {
  id:     '',
  Nombre: '',
  Valor:  {
    Nombre: '',
    Valor:  0
  }
};

class FormularioEditarListaDeValores extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.ListaDeValor
    };
  }
  
  ReadState = i => e => {
    const {name, value} = e.target;
    const NewState      = this.state.Valor.map ((Va, index) => {
      if (i !== index) return Va;
      return {
        ...Va,
        [name]: value
      };
    });
    this.setState ({Valor: NewState});
  };
  
  DeleteState = i => () => {
    this.setState ({
                     Valor: this.state.Valor.filter ((s, index) => i !== index)
                   });
  };
  
  AddState   = () => {
    this.setState ({
                     Valor: this.state.Valor.concat ([{Nombre: '', Valor: '0'}])
                   });
  };
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: (name === 'Cantidad') ? Number.parseInt (value) : value
                   });
  };
  
  actualizarListaDeValores = (e, actualizarListaDeValores) => {
    e.preventDefault ();
    //insertamos en la base de datos
    this.base.swal2.create('create').then(result=>{
      if(result.value){
        actualizarListaDeValores ().then (data => {
          this.base.swal2.success('edit');
        });
      }
    });
    
    
  };
  
  componentWillUnmount () {
    this.ClearState ();
  }
  
  render () {
    const {
            id,
            Nombre,
            Valor
          } = this.state;
    
    const input = {
      id,
      Nombre,
      Valor
    };
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_LISTADEVALORES } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Mantenimientos/ListaDeValores');
           
                   }) }>
           { (actualizarListaDeValores, {loading, error, data}) => {
             return (
                <form autoComplete="off" onSubmit={ e => this.actualizarListaDeValores (e, actualizarListaDeValores) }>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>ID:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.id }
                           disabled={ true }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Nombre }
                           disabled={ false }
                        />
                      </div>
                    </div>
                  </div>
                  { this.state.Valor.map (
                     (input, index) => {
                       return (
                          <div key={ index } className="row justify-content-center">
                            <div className="col-md-4">
                              <label>Nombre</label>
                              <div className="input-group">
                                <input
                                   type="text"
                                   placeholder={ 'Nombre del ' + this.state.Nombre }
                                   name="Nombre"
                                   className="form-control"
                                   onChange={ this.ReadState (index) }
                                   defaultValue={ this.state.Valor[index].Nombre }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label>Valor</label>
                              <div className="input-group">
                                <input
                                   type="text"
                                   placeholder="Valor"
                                   name="Valor"
                                   className="form-control"
                                   onChange={ this.ReadState (index) }
                                   defaultValue={ this.state.Valor[index].Valor }
                                />
                              </div>
                            </div>
                          </div>
                       );
                     }
                  ) }
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button
                       onClick={ this.AddState }
                       type="button"
                       className={ this.base.button.Editar }
                    >+ Agregar Detalle
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="submit" className={ this.base.button.Primary + ' float-right' }>
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

export default withRouter (FormularioEditarListaDeValores);