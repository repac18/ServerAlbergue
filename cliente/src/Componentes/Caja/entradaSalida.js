import React, {Component, Fragment}   from 'react';
import {NUEVO_ENTRADASALIDACAJACHICA} from '../../GraphQl/Mutations/EntradaSalidaCajaChica';
import {Mutation}                     from 'react-apollo';
import {withRouter, Redirect}         from 'react-router-dom';
import Generic                        from '../Mantenimientos/ListadeValores/Generic';
import {front}                        from '../FrontEnd/frontEnd';
import {MDBInput, MDBCol}             from 'mdbreact';

const initialState = {
  Responsable: '',
  Cantidad:    '',
  Tipo:        '',
  Fecha:       '',
  Estado:      ''
};

class EntradaSalidaNuevo extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...initialState
    };
  }
  
  ClearState  = () => {
    this.setState ({
                     ...initialState
                   });
  };
// verificar este
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: (name === 'Cantidad' || name === 'Tipo') ? Number.parseInt (value) : value
                   });
  };
  
  crearEntradaSalida = (e, nuevaEntradaSalida) => {
    e.preventDefault ();
    //insertamos en la base de datos
    this.base.swal2.create ('create').then (result => {
      if (result.value) {
        nuevaEntradaSalida ().then (data => {
          this.base.swal2.success ('create');
          this.ClearState ();
          this.props.history.push ('/Cajas');
        });
      }
    });
    
  };
  
  render () {
    const {
            Responsable,
            Cantidad,
            Tipo,
            Fecha,
            Estado
          }     = this.state;
    const input = {
      Responsable,
      Cantidad,
      Tipo,
      Fecha,
      Estado
    };
    
    const redireccion = this.props.Access ('Usuarios', 'Guardar') ? '' : <Redirect to='/'/>;
    
    return (
       <Fragment>
         
         { redireccion }
         
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('Caja Entradas/Salidas', 'Caja', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_ENTRADASALIDACAJACHICA } variables={ {input} }>
               { (nuevaEntradaSalida, {loading, error, data}) => {
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearEntradaSalida (e, nuevaEntradaSalida) }
                    >
                      <div className="row">
                        <MDBCol md="4">
                          
                          <MDBInput type="text" autoComplete="off"
                                    label="Responsable" name="Responsable" size="sm" onChange={ this.UpdateState } value={ this.state.Responsable }
                                    required
                          >
                          </MDBInput>
                        </MDBCol>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Cantidad" type="number" name="Cantidad" size="sm" onChange={ this.UpdateState } value={ this.state.Cantidad }
                               required
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
                                   value={ this.state.Tipo }
                                   UpdateState={ this.UpdateState }
                                   Campo={ 'Tipo' }
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
                                   defaultValue={ this.state.Fecha}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Estado:</label>
                                <Generic
                                   id="5d957366132722445cfc282c"
                                   value={ this.state.Estado }
                                   UpdateState={ this.UpdateState }
                                   Campo={ 'Estado' }
                                   NValor={ true }
                                
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <button type="submit" className={ this.base.button.Primary + ' float-right' }>
                            <i className={ this.base.icons.save }></i>
                            { this.base.text.Guardar }
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

export default withRouter (EntradaSalidaNuevo);