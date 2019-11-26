import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_ROL}             from '../../GraphQl/Mutations/Roles';

import {Mutation}   from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {front}      from '../FrontEnd/frontEnd';
// id
//     Nombre
//     Descripcion
//     Permiso{
//       id
//       Nombre
//       Descripcion
//       URL
//       Menu
//  			Activo
//       Opcion{
//         id
//         Descripcion
//         Activo
//         Nombre
//       }
//     }
//   }

const initialState = {
  id:          '',
  Nombre:      '',
  Descripcion: '',
  Permiso:     [
    {
      id:          '',
      Nombre:      '',
      Descripcion: '',
      URL:         '',
      Menu:        '',
      Activo:      '',
      Opcion:      [
        {
          id:          '',
          Descripcion: '',
          Activo:      '',
          Nombre:      ''
        }
      ]
    }
  ]
};
// query getedificios($limit: Int, $Offset: Int, $Eliminado: Int) {
//     getedificios(limit: $limit, Offset: $Offset, Eliminado: $Eliminado) {
//         id
//         Nombre
//         Latitud
//         Longitud
//         Permiso{
//     Nombre
//             Nivel
//             Habitaciones{
//                 Nombre 
//                 Habitacion 
//                 Capacitada
//             }
//         }
//     }
// }
// `;
class FormularioEditarRoles extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Roles
    };
  }
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  UpdateState    = (e) => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: value
                   });
  };
  VerifyBooleans = (value) => {
    return (value === 'true');
  };
  
  ReadOptions = (index, index_h, name, value) => {
    
    const NewOptions = this.state.Permiso;
    
    const NewOption_ = this.state.Permiso[index].Opcion.map ((Option, index_) => {
                                                               if (index_h !== index_) return Option;
                                                               return {
                                                                 ...Option,
                                                                 [name]: (name === 'Activo') ? this.VerifyBooleans (value) : value
                                                               };
      
                                                             }
    );
    
    NewOptions[index].Opcion = NewOption_;
    
    this.setState ({
                     Permiso: NewOptions
                   });
    
  };
  
  ReadPermit = (index, name, value) => {
    const NewPermiso_ = this.state.Permiso.map ((Permiso, index_) => {
                                                  if (index !== index_) return Permiso;
                                                  return {
                                                    ...Permiso,
                                                    [name]: (name === 'Activo') ? this.VerifyBooleans (value) : value
                                                  };
      
                                                }
    );
    
    this.setState ({
                     Permiso: NewPermiso_
                   });
  };
  
  componentWillUnmount () {
    this.ClearState ();
  }
  
  actualizarRoles = (e, actualizarRoles) => {
    e.preventDefault ();
    this.base.swal2.create('edit').then(result=>{
      if(result.value){
        actualizarRoles ().then ((data) => {
          //direccionar
        this.base.swal2.success('edit');
        });
      }
    });
    //insertamos en la base de datos
    
    
  };
  
  render () {
    const {
            id,
            Nombre,
            Descripcion,
            Permiso
          } = this.state;
    
    const input = {
      id,
      Nombre,
      Descripcion,
      Permiso
    };
    
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_ROL } variables={ {input} }
                   key={ {id} }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Roles');
                   }) }>
           { (actualizarRoles, {loading, error, data}) => {
             return (
                <form autoComplete="off" onSubmit={ (e) => this.actualizarRoles (e, actualizarRoles) }>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre del Rol"
                           defaultValue={ this.state.Nombre }
                           readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Descripcion:</label>
                        <input
                           type="text"
                           name="Latitud"
                           className="form-control"
                           placeholder="Descripcion del Rol"
                           defaultValue={ this.state.Descripcion }
                           readOnly
                        
                        />
                      </div>
                    </div>
                  </div>
                  
                  <label><strong>Permisos:</strong></label>
                  
                  { this.state.Permiso.map ((input, index) => {
                    
                    return (
                       <div key={ index } className='row'>
                         <div className="col-md-4">
                           <div className="form-group">
                             <label>Nombre:</label>
                             <input
                                type="text"
                                name="Nombre"
                                className="form-control"
                                placeholder="Nombre del Permiso"
                                defaultValue={ this.state.Permiso[index].Nombre }
                                readOnly
                             />
                           </div>
                         </div>
                         <div className="col-md-4">
                           <div className="form-group">
                             <label>Descripcion:</label>
                             <input
                                type="text"
                                name="Descripcion"
                                className="form-control"
                                placeholder="Descripcion del Permiso"
                                defaultValue={ this.state.Permiso[index].Descripcion }
                                readOnly
                             
                             
                             />
                           </div>
                         </div>
                         <div className="col-md-4">
                           <div className="form-group">
                             <label>URL:</label>
                             <input
                                type="text"
                                name="URL"
                                className="form-control"
                                placeholder="URL del Permiso"
                                defaultValue={ this.state.Permiso[index].Descripcion }
                                
                                readOnly
                             
                             />
                           </div>
                         </div>
                         <div className="col-md-4">
                           <div className="form-group">
                             <label>Menu:</label>
                             <input
                                type="text"
                                name="Menu"
                                className="form-control"
                                placeholder="Menu del Permiso"
                                defaultValue={ this.state.Permiso[index].Menu }
                                readOnly
                             
                             
                             />
                           </div>
                         </div>
                         <div className="col-md-4">
                           <div className="form-group">
                             <label>Activo:</label>
                             <select name="Activo" className="form-control" readOnly>
                               <option key={ 0 } value={ true } selected={ this.state.Permiso[index].Activo === true }>Activo</option>
                               <option key={ 1 } value={ false } selected={ this.state.Permiso[index].Activo === false }>Inactivo</option>
                             
                             </select>
                           </div>
                         </div>
                         <br/>
                         { this.state.Permiso[index].Opcion.map ((input, index_h) => {
                           return (
                              <div key={ index_h } className='row col-md-12 '>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>Nombre:</label>
                                    <input
                                       type="text"
                                       name="Nombre"
                                       className="form-control"
                                       placeholder="Nombre del Permiso"
                                       defaultValue={ this.state.Permiso[index].Opcion[index_h].Nombre }
                                       readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>Descripcion:</label>
                                    <input
                                       type="text"
                                       name="Descripcion"
                                       className="form-control"
                                       placeholder="Descripcion del Permiso"
                                       defaultValue={ this.state.Permiso[index].Opcion[index_h].Descripcion }
                                       
                                       readOnly
                                    
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>Activo:</label>
                                    
                                    <select name="Activo" className="form-control" onChange={ e => {
                                      const {name, value} = e.target;
                                      this.ReadOptions (index, index_h, name, value);
                                    }
                                    }>
                                      <option key={ 0 } value={ true } selected={ this.state.Permiso[index].Opcion[index_h].Activo === true }>Activo</option>
                                      <option key={ 1 } value={ false } selected={ this.state.Permiso[index].Opcion[index_h].Activo === false }>Inactivo
                                      </option>
                                    
                                    </select>
                                  </div>
                                </div>
                              </div>
                           
                           );
                         })
                         }
                       </div>
                    );
                  }) }
                  
                  <div className="row">
                    <div className="col-md-12">
                      <button
                         type="submit"
                         className={ this.base.button.Primary + ' float-right' }
                      >
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

export default withRouter (FormularioEditarRoles);