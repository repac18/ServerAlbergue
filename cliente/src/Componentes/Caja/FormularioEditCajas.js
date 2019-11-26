import React, {Component, Fragment}        from 'react';
import {ACTUALIZAR_ENTRADASALIDACAJACHICA} from '../../GraphQl/Mutations/EntradaSalidaCajaChica';
import {Mutation}                          from 'react-apollo';
import {withRouter}                        from 'react-router-dom';
import Generic                             from '../Mantenimientos/ListadeValores/Generic';
import {front}                             from '../FrontEnd/frontEnd';

const initialState = {
  id:          '',
  UsuarioId:   '',
  Responsable: '',
  Cantidad:    '',
  Tipo:        '',
  Fecha:       '',
  Estado:      ''
};

class FormularioEditarCajas extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Caja
    };
  }
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  UpdateState = e => {
    const { name, value } = e.target;
    this.setState({
                    [name]:   value,
                  });
  };
  
  actualizarEntradaSalidaCajaChica = (e, actualizarEntradaSalidaCajaChica) => {
    e.preventDefault ();
    //insertamos en la base de datos
    actualizarEntradaSalidaCajaChica ().then (data => {
      this.ClearState ();
    });
  };
  
  render () {
    const {
            id,
            UsuarioId,
            Responsable,
            Cantidad,
            Tipo,
            Fecha,
            Estado
          } = this.state;
    
    const input = {
      id,
      UsuarioId,
      Responsable,
      Cantidad,
      Tipo,
      Fecha,
      Estado
    };
    
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_ENTRADASALIDACAJACHICA } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/MovimientoCaja');
                   }) }>
           { (actualizarEntradaSalidaCajaChica, {loading, error, data}) => {
             return (
                <form autoComplete="off" onSubmit={ e => this.actualizarEntradaSalidaCajaChica (e, actualizarEntradaSalidaCajaChica) }
                >
                  <div className="row">
                    
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Responsable:</label>
                        <input
                           type="text"
                           name="Responsable"
                           className="form-control"
                           placeholder="Responsable"
                           onChange={ this.UpdateState }
                           defaultValue={ this.props.Caja.Responsable }
                           readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Cantidad:</label>
                        <input
                           type="Number"
                           name="Cantidad"
                           className="form-control"
                           placeholder="Cantidad"
                           onChange={ this.UpdateState }
                           defaultValue={ this.props.Caja.Cantidad }
                           readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Tipo:</label>
                            <Generic
                               id="5d957025132722445cfc282a"
                               Value={ this.props.Caja.Tipo }
                               UpdateState={ this.UpdateState }
                               Campo={ 'Tipo' }
                               disabled={ true }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Fecha:</label>
                            <input
                               type="Date"
                               name="Fecha"
                               className="form-control"
                               placeholder="Fecha"
                               onChange={ this.UpdateState }
                               defaultValue={ this.props.Caja.Fecha }
                               readOnly
                            />
                          </div>
                          <div className="col-md-12">
                              <div className="row">
                                  <div className="col-md-4">
                                      <div className="form-group">
                                          <label>Tipo:</label>
                                          <input
                                      type="text"
                                      name="Tipo"
                                      className="form-control"
                                      placeholder="Tipo"
                                      onChange={ this.UpdateState }
                                      defaultValue={ (this.props.Caja.Tipo==="1")?"ENTRADA":"SALIDA" }
                                      readOnly
                                  />
                                      </div>
                                  </div>
                                  <div className="col-md-4">
                                      <div className="form-group">
                                          <label>Fecha:</label>
                                          <input
                                              type="text"
                                              name="Fecha"
                                              className="form-control"
                                              placeholder="Fecha"
                                              onChange={ this.UpdateState }
                                              defaultValue={(new Date(Number(this.props.Caja.Fecha))).toLocaleDateString('es-MX') }
                                             readOnly
                                               />
                                      </div>
                                  </div>
                                  <div className="col-md-4">
                                      <div className="form-group">
                                          <label>Estado:</label>
                                          <Generic
                                              id="5d957366132722445cfc282c"
                                              Value={ this.props.Caja.Estado }
                                              UpdateState={ this.UpdateState }
                                              Campo={ 'Estado' }
                                              NValor={ true }
                                              disabled={this.props.Caja.Estado==="APROBADO" ||  this.props.Caja.Estado==="ANULADO"}
                                          />
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="submit" className={ this.base.button.Primary + ' float-right' }
                              disabled={ this.props.Caja.Estado === 'APROBADO' || this.props.Caja.Estado === 'ANULADO' }>
                        <i className={ this.base.icons.save }></i>
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

export default withRouter (FormularioEditarCajas);