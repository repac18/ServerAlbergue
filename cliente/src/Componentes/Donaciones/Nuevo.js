import React, {Component, Fragment} from 'react';
import {NUEVO_DONACION}             from '../../GraphQl/Mutations/Donacion';
import {RESPONSABLES_QUERY}             from '../../GraphQl/Querys/Responsables';

import {Mutation,Query}                   from 'react-apollo';
import {withRouter,Redirect}                 from 'react-router-dom';
import Generic                      from '../Mantenimientos/ListadeValores/Generic';
import {front}                      from '../FrontEnd/frontEnd';
import {MDBInput}                   from "mdbreact";

const initialState = {
  UsuarioId:   '',
  Responsable: '',
  Donante:     '',
  Tipo:        1,
  Fecha:       '',
  Estado:      '',
  Cantidad:    0
};

class DonacionNuevo extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...initialState,
      UsuarioId:this.props.session.obtenerUsuario.id,
      Estado:'APROBADO'
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
                     [name]: (name === 'Tipo' || name === 'Cantidad') ? Number.parseInt (value) : value
                   });
  };
  
  crearDonacion = (e, crearDonacion) => {
    
    e.preventDefault ();
    //insertamos en la base de datos
    crearDonacion ().then (data => {
      
      //direccionar
      
    });
  };

  render () {
    const {
            UsuarioId,
            Responsable,
            Donante,
            Tipo,
            Fecha,
            Estado,
            Cantidad
          }     = this.state;
    const input = {
      UsuarioId,
      Responsable,
      Donante,
      Tipo,
      Fecha,
      Estado,
      Cantidad
    };

    const redireccion=this.props.Access("Donaciones","Guardar")?'':<Redirect to='/'/>;
 
    return (
       <Fragment>
    {redireccion} 

         <div className={this.base.button.card_borderPrimary}>
           {this.base.cardHeader.getCard('NUEVA DONACION','Donaciones',false)}
           <div className="card-body">
             <Mutation mutation={ NUEVO_DONACION } variables={ {input} }
                       onCompleted={ () => this.props.refetch ().then (() => {
                         this.props.history.push ('/Donaciones');
                       }) }>
               { (crearDonacion, {loading, error, data}) => {
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearDonacion (e, crearDonacion) }>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Usuario:</label>
                            <input
                               type="text"
                               name="UsuarioId"
                               className="form-control"
                               placeholder="Usuario "
                              //  onChange={ this.UpdateState }
                               value={ this.props.session.obtenerUsuario.Nombre }
                               readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Responsable:</label>
                         
                                      
                          <Query
                                   query={ RESPONSABLES_QUERY }
                                   //pollInterval={ 500 }
                                >
                                  { ({
                                       loading,
                                       error,
                                       data,
                                       startPolling,
                                       stopPolling //para recargar el resto de la vista
                                     }) => {
                                    if (loading) return 'Cargando...';
                                    if (error) return `Error: ${ error.message }`;
                                    return (
                                       <Fragment>
                                         <select name="Responsable" className="form-control" onChange={ this.UpdateState }>
                                           <option key={ 0 } value={ 0 }>...</option>
                                           { data.getresponsables.map (item => {
                                             return (
                                                <option key={ item.Nombre } value={ item.Nombre } selected={ this.state.Responsable=== item.Nombre }
                                                >{ item.Nombre }</option>
                                             );
                                           }) }
                                         </select>
                                       </Fragment>
                                    );
                                  } }
                                </Query>

                           
                  
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Donante:</label>
                            <input
                               type="text"
                               name="Donante"
                               className="form-control"
                               placeholder="Donante"
                               onChange={ this.UpdateState }
                               defaultValue={ this.state.Donante }
    
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Tipo:</label>
                            <Generic
                               id="5da18003c97fdd1b94c82165"
                               Value={ this.state.Tipo }
                               UpdateState={ this.UpdateState }
                               Campo={ 'Tipo' }
                               NValor={ false }
                               defaultValue={this.state.Efectivo}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>fecha:</label>
                            <input
                               type="date"
                               name="Fecha"
                               className="form-control"
                               placeholder="fecha de Recibido"
                               onChange={ this.UpdateState }
                               defaultValue={ this.state.Fecha }
    
                            />
                          </div>
                        </div>
						
                        <div className="col-md-4">
                            <div className="form-group">
                                <MDBInput
                                    label="Cantidad" type="number" name="Cantidad" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.Cantidad }
                                    required
                                />
                            </div>
                        </div>
                        {/*<div className="col-md-4">
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
                        </div>*/}
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
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (DonacionNuevo);