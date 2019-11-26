import React, {Component, Fragment} from 'react';
import {Redirect,withRouter}                   from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';
import makeAnimated                 from 'react-select/animated';

import {Mutation}                 from 'react-apollo';
import Generic                    from '../Mantenimientos/ListadeValores/Generic';
import {PACIENTES_QUERY}          from '../../GraphQl/Querys/Pacientes';
import {CLIENTES_QUERY}           from '../../GraphQl/Querys/Clientes';
import {HOSPITALES_QUERY}         from '../../GraphQl/Querys/Hospitales';
import {NUEVO_ASIGNACIONPACIENTE} from '../../GraphQl/Mutations/AsignacionPacientes';
import {Query}                    from 'react-apollo';
import Select                     from 'react-select';

const initialState = {
  Pacientes:     [],
  Clientes:      [],
  Fecha:         '',
  Estado:        'APROBADO',
  Observaciones: '',
};

class Pacientes extends Component {
  base   = new front ();
  
  constructor (props) {
    super (props);
    this.state={
      ...initialState
    }
  }
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  
  SelectPaciente = (Pacientes) => {
    this.setState ({
                     Pacientes
                   });
  };
  
  SelectHospital = (Hospitales) => {
    this.setState ({

                    Hospitales: Hospitales.Nombre
                   });
                   this.setState ({
                    
                    Hospital: Hospitales
                   });
  };
  
  SelectCliente = (Clientes) => {
    this.setState ({
                     Clientes
                   });
  };
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: (name === 'Edad') ? Number.parseInt (value) : value
                   });
  };
  
  crearAsignacionPaciente = (e, nuevaAsignacionPaciente) => {
    e.preventDefault ();
    //insertamos en la base de datos
    this.base.swal2.create ('create').then (result => {
      if (result.value) {
        nuevaAsignacionPaciente ().then (data => {
          this.base.swal2.success ('create');
          this.ClearState ();
          this.props.history.push ('AsignacionPaciente/Registros');
        });
      }
    });
    
  };
  
  render () {
    const {
            id,
            Pacientes,
            Clientes,
            Hospitales,
            Fecha,
            Estado,
            Observaciones
          }     = this.state;
    const input = {
      id,
      Pacientes,
      Clientes,
      Hospitales,
      Fecha,
      Estado,
      Observaciones
    };
    
    const redireccion = this.props.Access ('Pacientes', 'Acceder') ? '' : <Redirect to='/'/>;
    
    return (
       <Fragment>
         { redireccion }
         
         
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('Asignación Pacientes', 'AsignacionPaciente/Registros', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_ASIGNACIONPACIENTE } variables={ {input} }>
               { (nuevaAsignacionPaciente) => {
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearAsignacionPaciente (e, nuevaAsignacionPaciente) }>
                      <div className="row">
                        
                        <Query
                           query={ CLIENTES_QUERY }>
                          { ({
                               loading,
                               error,
                               data,
                               refetch//para recargar el resto de la vista
                             }) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error: ${ error.message }`;
                            
                            return (
                               <div className="col-md-6">
                                 <Select
                                    onChange={ this.SelectCliente }
                                    options={ data.getclientes }
                                    isMulti={ true }
                                    components={ makeAnimated () }
                                    placeholder={ 'Seleccione el clientes' }
                                    getOptionLabel={ (options) => options.Nombre }
                                    getOptionValue={ (options) => options.id }
                                    value={ this.state.Clientes }/>
                               </div>
                            );
                          } }
                        </Query>
                        
                        <Query
                           query={ HOSPITALES_QUERY }>
                          { ({
                               loading,
                               error,
                               data,
                               refetch//para recargar el resto de la vista
                             }) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error: ${ error.message }`;
                            
                            return (
                               <div className="col-md-6">
                                 <Select
                                    onChange={ this.SelectHospital }
                                    options={ data.getHospitales }
                                    isMulti={ false }
                                    components={ makeAnimated () }
                                    placeholder={ 'Seleccione el hospital' }
                                    getOptionLabel={ (options) => options.Nombre }
                                    getOptionValue={ (options) => options.id }
                                    value={ this.state.Hospital }/>
                               </div>
                            );
                          } }
                        </Query>
                        
                        <div className="col-md-6">
                          <label>Observaciones:</label>
                          <input
                             type="text"
                             name="Observaciones"
                             className="form-control"
                             placeholder="Observaciones"
                             onChange={ this.UpdateState }
                             defaultValue={ this.state.Observaciones }/>
                        </div>
                        
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Fecha:</label>
                            <input
                               type="Date"
                               name="Fecha"
                               className="form-control"
                               placeholder="Fecha"
                               onChange={ this.UpdateState }
                               defaultValue={ this.state.Fecha }/>
                          </div>
                        </div>
                        
                        <div className="col-md-3">
                          <label>Estado:</label>
                          <Generic
                             id="5da1782df2347d425c3305e5"
                             Value={ this.state.Estado }
                             UpdateState={ this.UpdateState }
                             Campo={ 'Estado' }
                             NValor={ true }/>
                        </div>
                        
                        <Query
                           query={ PACIENTES_QUERY }>
                          { ({
                               loading,
                               error,
                               data,
                               refetch//para recargar el resto de la vista
                             }) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error: ${ error.message }`;
                            
                            return (
                               <div className="col-md-12">
                                 <Select
                                    onChange={ this.SelectPaciente }
                                    options={ data.getpacientes }
                                    isMulti={ false }
                                    components={ makeAnimated () }
                                    placeholder={ 'Seleccione los pacientes' }
                                    getOptionLabel={ (options) => options.Nombre }
                                    getOptionValue={ (options) => options.id }
                                    value={ this.state.Pacientes }/>
                               </div>
                            );
                          } }
                        </Query>
                      
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
           
           </div>
         </div>
       
       </Fragment>
    );
  }
}

export default withRouter(Pacientes);