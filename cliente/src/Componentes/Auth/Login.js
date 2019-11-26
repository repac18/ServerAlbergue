import React, {Component, Fragment} from 'react';
import {withRouter}                 from 'react-router-dom';
import Error                        from '../Alertas/Error';
import {Mutation}                   from 'react-apollo';
import {AUTENTICAR_USUARIO}         from '../../GraphQl/Mutations/Auth';
import {front}                      from '../FrontEnd/frontEnd';
import {MDBInput}                   from 'mdbreact';

const initialState = {
  usuario:  '',
  password: ''
};

class Login extends Component {
  base  = new front ();
  state = {
    ...initialState
  };
  
  actualizarState = e => {
    const {name, value} = e.target;
    
    this.setState ({
                     [name]: value
                   });
  };
  
  limpiarState = () => {
    this.setState ({...initialState});
  };
  
  iniciarSesion = (e, usuarioAutenticar) => {
    e.preventDefault ();
    
    usuarioAutenticar ().then (async ({data}) => {
      localStorage.setItem ('token', data.autenticarUsuario.token);
      // ejecutar el querry una vez que se haya iniciado sesión
      await this.props.refetch ();
      // limpiar el state
      this.limpiarState ();
      
      // redericcionar
      setTimeout (() => {
        this.props.history.push ('/');
      }, 500);
      
    });
    
  };
  
  validarForm = () => {
    const {usuario, password} = this.state;
    
    return !usuario || !password;
  };
  
  render () {
    
    const {usuario, password} = this.state;
    
    return (
       <Fragment>
         <h1 className="text-center mb-5">Iniciar Sesión</h1>
         <div className="col-md-12">
           <Mutation
              mutation={ AUTENTICAR_USUARIO }
              variables={ {usuario, password} }
           >
             { (autenticarUsuario, {loading, error, data}) => {
               return (
                  <form autoComplete="off" onSubmit={ e => this.iniciarSesion (e, autenticarUsuario) }>
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        { error && <Error error={ 'Usuario/Contraseña no son correctos!' }/> }
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="form-group">
                          <MDBInput
                             label="Usuario"  name="usuario" autoComplete="off" size="lg" onChange={ this.actualizarState } value={ usuario }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="form-group">
                          <MDBInput
                             label="Contraseña" type="password"  name="password" size="lg" onChange={ this.actualizarState } value={ password }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-m-4">
                        <button
                           disabled={
                             loading || this.validarForm ()
                           }
                           type="submit"
                           className="btn btn-success float-right">
                          Iniciar Sesión
                        </button>
                      </div>
                    </div>
                  </form>
               );
             } }
           </Mutation>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (Login);