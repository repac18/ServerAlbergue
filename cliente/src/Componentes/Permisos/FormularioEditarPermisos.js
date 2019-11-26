import React, {Component, Fragment}    from 'react';
import {ACTUALIZAR_PERMISO}            from '../../GraphQl/Mutations/Permisos';
import {Mutation}                      from 'react-apollo';
import {withRouter}                    from 'react-router-dom';
import {CardHeaderIndex, front, Table} from '../FrontEnd/frontEnd';

const initialState = {
  Nombre:      '',
  Descripcion: '',
  URL:         '',
  Menu:        '',
  Activo:      '',
  Opcion:      {
    Nombre:      '',
    Descripcion: '',
    Activo:      true
  }
};

class FormularioEditarPermisos extends Component {
  base       = new front ();
  CardHeader = new CardHeaderIndex ();
  Table      = new Table ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Permisos
    };
  }
  
  componentWillUnmount () {
    this.ClearState ();
  }
  
  VerifyBooleans = (value) => {
    return (value === 'true');
  };
  
  ReadState = i => e => {
    const {name, value} = e.target;
    
    const NewState = this.state.Opcion.map ((Va, index) => {
      if (i !== index) return Va;
      return {
        ...Va,
        [name]: (name === 'Activo') ? this.VerifyBooleans (value) : value
      };
    });
    
    this.setState ({Opcion: NewState});
  };
  
  DeleteState = i => () => {
    this.setState ({
                     Opcion: this.state.Opcion.filter ((s, index) => i !== index)
                   });
  };
  
  AddState   = () => {
    this.setState ({
                     Opcion: this.state.Opcion.concat ([{Nombre: '', Descripcion: '', Activo: true}])
                   });
  };
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: (name === 'Activo') ? this.VerifyBooleans (value) : value
                   });
  };
  
  actualizarPermisos = (e, actualizarPermisos) => {
    e.preventDefault ();
    this.base.swal2.create('edit').then(result=>{
      if(result.value){
        actualizarPermisos ().then (data => {
        this.base.swal2.success('edit');
        });
      }
    });
  };
  
  render () {
    const {
            id,
            Nombre,
            Descripcion,
            URL,
            Menu,
            Activo,
            Opcion
          } = this.state;
    
    const input = {
      id,
      Nombre,
      Descripcion,
      URL,
      Menu,
      Activo,
      Opcion
    };
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_PERMISO } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Permisos');
           
                   }) }>
           { (actualizarPermisos, {loading, error, data}) => {
             return (
                <form autoComplete="off"
                   onSubmit={ e => this.actualizarPermisos (e, actualizarPermisos) }
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre del Permiso"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Nombre }
                           disabled={ false }
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
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Descripcion }
                           disabled={ false }
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
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.URL }
                           disabled={ false }
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
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Menu }
                           disabled={ false }
                        />
                      </div>
                    </div>
  
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Activo:</label>
                        <select name="Activo" className="form-control" onChange={ this.UpdateState }>
                          <option key={ 0 } value={ true } selected={ this.state.Activo === true }>Activo</option>
                          <option key={ 1 } value={ false } selected={ this.state.Activo === false }>Inactivo</option>
      
                        </select>
                      </div>
                    </div>
                  </div>
                  <label>Opciones</label>
                  <div className="form-group p-3">
                    { this.state.Opcion.map (
                       (input, index) => {
                         return (
                            <div key={ index } className="row">
                              <div className="col-md-4">
                                <label>Nombre</label>
                                <div className="input-group">
                                  <input
                                     type="text"
                                     placeholder="Nombre de la opcion"
                                     name="Nombre"
                                     className="form-control"
                                     onChange={ this.ReadState (index) }
                                     defaultValue={ this.state.Opcion[index].Nombre }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <label>Descripcion</label>
                                <div className="input-group">
                                  <input
                                     type="text"
                                     placeholder="Descripcion de la opcion"
                                     name="Descripcion"
                                     className="form-control"
                                     onChange={ this.ReadState (index) }
                                     defaultValue={ this.state.Opcion[index].Descripcion }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <label>Activo</label>
                                <div className="input-group">
                                  <select name="Activo" className="form-control" onChange={ this.ReadState (index) }>
                                    <option key={ 0 } value={ true } selected={ this.state.Opcion[index].Activo === true }>Activo</option>
                                    <option key={ 1 } value={ false } selected={ this.state.Opcion[index].Activo === false }>Inactivo</option>
    
                                  </select>
                                </div>
                              </div>
                            </div>
                         );
                       }
                    )
                    
                    }
                  </div>
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button
                       onClick={ this.AddState }
                       type="button"
                       className={ this.base.button.Editar }
                    >{'+ '+this.base.text.AgregarOpcion}
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="submit" className= {this.base.button.Primary +' float-right'}>
                        {this.base.text.Guardar}
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

export default withRouter (FormularioEditarPermisos);