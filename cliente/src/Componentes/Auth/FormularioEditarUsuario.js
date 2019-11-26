import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_USUARIO}         from '../../GraphQl/Mutations/Auth';
import {ROLES_QUERY}                from '../../GraphQl/Querys/Roles';
import {Mutation, Query}            from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

const initialState = {
  
  id:       '',
  Usuario:  '',
  Nombre:   '',
  Password: '',
  Rol:      [{id: ''}]
  
};

class FormularioEditarUsuario extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Usuario
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
                     [name]: value
                   });
  };
  
  UpdateStateRol = e => {
    const {name, value} = e.target;
    
    this.setState ({
                     [name]: [{id: value}]
                   });
  };
  
  actualizarUsuario = (e, actualizarUsuario) => {
    e.preventDefault ();
    //insertamos en la base de datos
    actualizarUsuario ().then (data => {
      this.ClearState ();
    });
  };
  
  render () {
    const {
            id, Usuario,
            Nombre,
            Password,
            Rol
          } = this.state;
    
    const input = {
      
      id, Usuario,
      Nombre,
      Password,
      Rol
      
    };
    
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_USUARIO } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Usuarios');
                   }) }>
           { (actualizarUsuario, {loading, error, data}) => {
             return (
                <form autoComplete="off" onSubmit={ e => this.actualizarUsuario (e, actualizarUsuario) }>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Usuario:</label>
                        <input
                           type="text"
                           name="usuario"
                           className="form-control"
                           placeholder="Usuario"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Usuario }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre del Usuario"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Nombre }
                        
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Password:</label>
                        <input
                           type="Password"
                           name="Password"
                           className="form-control"
                           placeholder="Password del Usuario"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Password }
                        
                        />
                      </div>
                    </div>
                  </div>
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
                  <div className="row">
                    <div className="col-md-12">
                      <button type="submit" className={ this.base.button.Primary + ' float-right' }>
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

export default withRouter (FormularioEditarUsuario);