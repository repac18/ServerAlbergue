import React, {Component, Fragment} from 'react';
import {Mutation, Query}            from 'react-apollo';
import {withRouter, Redirect}       from 'react-router-dom';
import {NUEVO_USUARIO}              from '../../GraphQl/Mutations/Auth';
import Error                        from '../Alertas/Error';
import {ROLES_QUERY}                from '../../GraphQl/Querys/Roles';
import {front}                      from '../FrontEnd/frontEnd';
import {MDBInput}                   from 'mdbreact';

const initialState = {
  Usuario:         '',
  Nombre:          '',
  Password:        '',
  repetirPassword: '',
  Rol:             [{id: '...'}]
};

class Registro extends Component {
  base          = new front ();
  state         = {
    ...initialState
  };
  ClearState    = () => {
    this.setState ({
                     ...initialState
                   });
  };
  crearRegistro = (e, crearUsuarios) => {
    e.preventDefault ();
      this.base.swal2.create('create').then(result=>{
          if(result.value){
              //insertamos en la base de datos
              crearUsuarios ().then (data => {
                  this.ClearState ();
                  this.base.swal2.success('create');
                  //direccionar
                  this.props.history.push ('/Usuarios');
              });
          }
      });
  };

  UpdateState   = e => {
    const {name, value} = e.target;
    
    this.setState ({
                     [name]: value
                   });
  };
  
  UpdateStateRol = e => {
    const {name, value} = e.target;
    
    this.setState ({
                     [name]: [{id: value}]
                   });
  };
  
  validarForm = () => {
    const {Usuario, Password, repetirPassword, Nombre, Rol} = this.state;
    const noValido                                          = !Usuario || !Password || !Nombre || !Rol || Password !== repetirPassword;
    return noValido;
  };
  
  render () {
    const {Usuario, Password, Nombre, Rol} = this.state;
    
    const input = {
      Usuario, Password, Nombre, Rol
    };
    // / const rolUsuario=this.props.session.obtenerUsuario.rol;
    
    const redireccion = this.props.Access ('Usuarios', 'Guardar') ? '' : <Redirect to='/'/>;
    
    return (
       <Fragment>
         { redireccion }
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('CREAR USUARIO', 'Usuarios', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_USUARIO }
                       variables={ {input} }
                       onCompleted={ () => this.props.refetch ().then (() => {
                         this.props.history.push ('/Usuarios');
               
                       }) }
             >
               { (crearUsuarios, {loading, error, data}) => {
                 
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearRegistro (e, crearUsuarios) }>
                      { error && <Error error={ error }/> }
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Usuario" autoComplete="off" type="text" name="Usuario" size="sm" onChange={ this.UpdateState }
                            />
                            <small className="form-text text-muted">(Sin espacios y sin caracteres especiales)</small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Nombre" autoComplete="off" type="text" name="Nombre" size="sm" onChange={ this.UpdateState }
                            />
                            <small className="form-text text-muted">(Agregar el nombre y apellidos completos)</small>
                          
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <MDBInput
                                   label="Contraseña" type="password" name="Password" size="sm" onChange={ this.UpdateState }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <MDBInput
                                 label="Repetir Password" type="password" name="repetirPassword" size="sm" onChange={ this.UpdateState }
                              />
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Rol:</label>
                                
                                {/*
                                 
                                 <select
                                 className="form-control"
                                 value={rol}
                                 name="rol"
                                 onChange={this.UpdateState}
                                 >
                                 <option value="">Elegir...</option>
                                 <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                 <option value="VENDEDOR">VENDEDOR</option>
                                 </select>
                                 */ }
                                
                                <Query
                                   query={ ROLES_QUERY }
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
                                         <select name="Rol" className="form-control" onChange={ this.UpdateStateRol }>
                                           <option key={ 0 } value={ 0 }>...</option>
                                           { data.getroles.map (item => {
                                             return (
                                                <option key={ item.id } value={ item.id } selected={ this.state.Rol[0].id === item.id }
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
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <button
                             disabled={ loading || this.validarForm }
                             type="submit"
                             className={ this.base.button.Primary + ' float-right' }>
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

export default withRouter (Registro);