import React, {Component, Fragment} from 'react';
import {NUEVO_CLIENTE}              from '../../GraphQl/Mutations/Clientes';
import {Mutation, Query}            from 'react-apollo';
import {withRouter, Redirect}       from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';
import Generic                      from '../Mantenimientos/ListadeValores/Generic';
import {LISTADEVALOR_QUERY}         from '../../GraphQl/Querys/ListaDeValores';
import {MDBInput}                   from 'mdbreact';

const initialState = {
  Nombre:       '',
  Apellido:     '',
  Edad:         0,
  Direccion:    '',
  Dpi:          '',
  Nit:          '',
  Sexo:         '',
  Municipio:    '',
  Departamento: '',
  Responsable: 0
};

class ClienteNuevo extends Component {
  base = new front ();
  
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
                     [name]: (name === 'Edad') ? Number.parseInt (value) : value
                   });
  };
  
  componentWillUnmount () {
    this.ClearState ();
  }
  
  UpdateStateDep = (e) => {
    const { value} = e.target;
    
    this.setState ({
                     depmu: value,
                     Responsable:0
                   });
  };
  
  UpdateStateMun = (dep) => (e) => {
    const { value} = e.target;
    
    this.setState ({
                     Departamento: dep,
                     Municipio:    value,
                     Responsable:0
                   });
  };
  
  crearnuevoCliente = (e, nuevoCliente) => {
    e.preventDefault ();
    //insertamos en la base de datos
    this.base.swal2.create('create').then(result=>{
      if (result.value){
        nuevoCliente ().then (() => {
          this.base.swal2.success('create');
          this.props.history.push ('/Clientes');
        });
      }
    }) ;
    
  };
  
  render () {
    const {
            id,
            Nombre,
            Apellido,
            Edad,
            Direccion,
            Dpi,
            Nit,
            Sexo,
            Municipio,
            Departamento,
            Responsable
          }     = this.state;
    const input = {
      id,
      Nombre,
      Apellido,
      Edad,
      Direccion,
      Dpi,
      Nit,
      Sexo,
      Municipio,
      Departamento,
      Responsable
    };
    
    const redireccion = this.props.Access ('Clientes', 'Guardar') ? '' : <Redirect to='/'/>;
    
    return (
       <Fragment>
         { redireccion }
         
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('AGREGAR CLIENTE', 'Clientes', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_CLIENTE } variables={ {input} }>
               { (nuevoCliente, {loading, error, data}) => {
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearnuevoCliente (e, nuevoCliente) }>
                      <div className="row">
                        <div className="col-md-4" style={{display:'none'}}>
                          <div className="form-group">
                            <MDBInput
                               label="Nombre" name="Responsable" size="sm" value={0} onChange={ this.UpdateState } autoComplete='off'
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Nombre" name="Nombre" size="sm" onChange={ this.UpdateState } autoComplete='off'
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Apellido" name="Apellido" size="sm" onChange={ this.UpdateState }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Edad" type="number" name="Edad" size="sm" onChange={ this.UpdateState }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Direccion" name="Direccion" size="sm" onChange={ this.UpdateState }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="DPI" name="Dpi" size="sm" onChange={ this.UpdateState }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="NIT" name="Nit" size="sm" onChange={ this.UpdateState }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Generic
                               id="5d956427132722445cfc2828"
                               Value={ this.state.Sexo }
                               UpdateState={ this.UpdateState }
                               Campo={ 'Sexo' }
                               NValor={ true }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Departamento:</label>
                            {/* <Generic
                             UpdateStateID={this.UpdateStateID}
                             id="5d956623a3a25d124c8da9b6"
                             Value={ this.state.Departamento }
                             UpdateState={ this.UpdateState }
                             autoComplete='off'
                             Campo={ 'Departamento' }
                             NValor={ true }
                             /> */ }
                            
                            <Fragment>
                              <Query
                                 query={ LISTADEVALOR_QUERY }
                                 // pollInterval={ 500 }
                                 variables={ {
                                   id: '5d956623a3a25d124c8da9b6'
                                 } }
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
                                       <select
                                          name="Departamento"
                                          className="form-control"
                                          onChange={ this.UpdateStateDep }
                                       >
                                         <option
                                            key={ 0 }
                                            value={ 0 }
                                            selected={ true }
                                            disabled
                                         >
                                           { '...' }
                                         </option>
                                         { data.getListaDeValor.Valor.map ((item) => {
                                           return (
                                              <option
                                                 key={ item.Nombre }
                                                 value={ item.Valor }
                                                 selected={
                                                   this.props.Value ===
                                                   item.Nombre
                                                 }
                                              >
                                                { item.Nombre }
                                              </option>
                                           );
                                         }) }
                                       </select>
                                     </Fragment>
                                  );
                                } }
                              </Query>
                            </Fragment>
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Municipio:</label>
                            {/* <Generic
                             id="5d956427132722445cfc2828"
                             Value={ this.state.Municipio }
                             UpdateState={ this.UpdateState }
                             Campo={ 'Municipio' }
                             NValor={ true }
                             /> */ }
                            
                            <Fragment>
                              <Query
                                 query={ LISTADEVALOR_QUERY }
                                 // pollInterval={ 500 }
                                 variables={ {
                                   id: this.state.depmu
                                 } }
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
                                  
                                  if (data.getListaDeValor) {
                                    return (
                                       <Fragment>
                                         <select
                                            name="Municipio"
                                            className="form-control"
                                            onChange={ this.UpdateStateMun (data.getListaDeValor.Nombre) }
                                         >
                                           <option
                                              key={ 0 }
                                              value={ 0 }
                                              selected={ true }
                                              disabled
                                           >
                                             { '...' }
                                           </option>
                                           
                                           { data.getListaDeValor.Valor.map (
                                              (item) => {
                                                return (
                                                   <option
                                                      key={ item.Nombre }
                                                      value={ item.Nombre }
                                                      selected={
                                                        this.props.Value ===
                                                        item.Nombre
                                                      }
                                                   >
                                                     { item.Nombre }
                                                   </option>
                                                );
                                              }
                                           ) }
                                         </select>
                                       </Fragment>
                                    );
                                  } else {
                                    return (
                                       <Fragment>
                                         <select
                                            name="Municipio"
                                            className="form-control"
                                            onChange={ this.UpdateState }
                                         >
                                           <option
                                              key={ 0 }
                                              value={ 0 }
                                              selected={ true }
                                              disabled
                                           >
                                             { '...' }
                                           </option>
                                         </select>
                                       </Fragment>
                                    );
                                  }
                                } }
                              </Query>
                            </Fragment>
                          </div>
                        </div>
                      
                      
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <button type="submit"
                                  className={ this.base.button.Primary + ' float-right' }>
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

export default withRouter (ClienteNuevo);