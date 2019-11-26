import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_DONACION}        from '../../GraphQl/Mutations/Donacion';
import {Mutation}                   from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import Generic                      from '../Mantenimientos/ListadeValores/Generic';
import {front}                      from '../FrontEnd/frontEnd';

const initialState = {
  
  UsuarioId:   '',
  Responsable: '',
  Donante:     '',
  Tipo:        '',
  Fecha:       '',
  Estado:      ''
};

class DonacionEditar extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Donacion
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
                     [name]: (name === 'Tipo') ? Number.parseInt (value) : value
                   });
  };
  
  actualizarDonacion = (e, actualizarDonacion) => {
    e.preventDefault ();
    //insertamos en la base de datos
    actualizarDonacion ().then (data => {
      this.ClearState ();
    });
  };
  
  render () {
    const {
            id,
            UsuarioId,
            Responsable,
            Donante,
            Tipo,
            Fecha,
            Estado
          } = this.state;
    
    const input = {
      id,
      UsuarioId,
      Responsable,
      Donante,
      Tipo,
      Fecha,
      Estado
    };
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_DONACION } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Donaciones');
                   }) }>
           { (actualizarDonacion, {loading, error, data}) => {
             return (
                <form autoComplete="off" onSubmit={ e => this.actualizarDonacion (e, actualizarDonacion) }>
                  <div className="row">
                    {/* <div className="col-md-4">
                     <div className="form-group">
                     <label>Usuario:</label>
                     <input
                     type="text"
                     name="UsuarioId"
                     className="form-control"
                     placeholder="Usuario"
                     onChange={ this.UpdateState }
                     defaultValue={ this.state.UsuarioId }
                     />
                     </div>
                     </div> */ }
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Responsable:</label>
                        <input
                           type="text"
                           name="Responsable"
                           className="form-control"
                           placeholder="Responsable de la Donacion"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Responsable }
                           readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Donante:</label>
                        <input
                           type="text"
                           name="Donante"
                           className="form-control"
                           placeholder="Nombre del Donante"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Donante }
                           readOnly
                        
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
                           Campo={ 'Tipo' }
                           NValor={ false }
                        
                        />
                      
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Fecha:</label>
                        <input
                        readOnly
                           type="date"
                           name="Fecha"
                           className="form-control"
                           placeholder="Fecha"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Fecha }
                        
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label>Estado:</label>
                        <Generic
                           id="5d9583f8d06c4741348f8ea3"
                           Value={ this.state.Estado }
                           UpdateState={ this.UpdateState }
                           Campo={ 'Estado' }
                           NValor={ true }
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="submit" className={ this.base.button.Primary +' float-right'}>
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

export default withRouter (DonacionEditar);