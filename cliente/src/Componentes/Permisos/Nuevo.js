import React, {Component, Fragment} from 'react';
import {NUEVO_PERMISO}              from '../../GraphQl/Mutations/Permisos';
import {Mutation}                   from 'react-apollo';
import {withRouter, Redirect} from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';
import {MDBInput}                   from 'mdbreact';

const initialState = {
  Nombre:      '',
  Descripcion: '',
  URL:         '',
  Menu:        '',
  Activo:      true,
  Opcion:      [
    {
      Nombre:      '',
      Descripcion: '',
      Activo:      true
    }
  ]
};

class NuevoPermisos extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...initialState
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
    const NewState      = this.state.Opcion.map ((Va, index) => {
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
  
  crearPermisos = (e, crearPermisos) => {
    e.preventDefault ();
    this.base.swal2.create('create').then(result=>{
      if(result.value){
        //insertamos en la base de datos
        crearPermisos ().then (data => {
            this.ClearState ();
            this.base.swal2.success('create');
            //direccionar
            this.props.history.push ('/Permisos');
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
    
    const input       = {
      id,
      Nombre,
      Descripcion,
      URL,
      Menu,
      Activo,
      Opcion
    };
    const redireccion = this.props.Access ('Permisos', 'Guardar') ? '' : <Redirect to='/'/>;
    
    return (
       <Fragment>
         { redireccion }
         <div className={ this.base.button.card_borderPrimary }>
           {this.base.cardHeader.getCard('AGREGAR PERMISOS','Permisos',false)}
           <div className="card-body">
             <Mutation mutation={ NUEVO_PERMISO } variables={ {input} }
                       key={ id }
                       onCompleted={ () => this.props.refetch ().then (() => {
                         this.props.history.push ('/Permisos');
    
                       }) }>
               { (crearPermisos, {loading, error, data}) => {
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearPermisos (e, crearPermisos) }>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Nombre" autoComplete="off" name="Nombre" size="sm" onChange={ this.UpdateState }
                               disabled={ false }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Descripcion" autoComplete="off" name="Descripcion" size="sm" onChange={ this.UpdateState }
                                disabled={ false }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="URL" autoComplete="off" name="URL" size="sm" onChange={ this.UpdateState }
                               disabled={ false }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Menu" autoComplete="off" name="Menu" size="sm" onChange={ this.UpdateState }
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
                      <br/>
                      <label><strong>Opciones</strong></label>
           
                      <div className="form-group p-3">
                        { this.state.Opcion.map (
                           (input, index) => {
                             return (
                                <div key={ index } className="row">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <MDBInput
                                         label="Nombre de la opcion" autoComplete="off" name="Nombre" size="sm" onChange={ this.ReadState (index) }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <MDBInput
                                         label="Descripcion" autoComplete="off" name="Descripcion" size="sm" onChange={ this.ReadState (index) }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <label>Activo</label>
                                    <div className="input-group">
                                      <select name="Activo" className="form-control" onChange={ this.ReadState (index) }>
                                        <option key={ 0 } value={ true }
                                                selected={ this.state.Opcion[index].Activo === true }>Activo
                                        </option>
                                        <option key={ 1 } value={ false }
                                                selected={ this.state.Opcion[index].Activo === false }>Inactivo
                                        </option>
                           
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
                        >{ '+ ' + this.base.text.AgregarOpcion }
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <button type="submit" className={ this.base.button.Primary + ' float-right' }>
                            <i className={this.base.icons.save}></i> { this.base.text.Guardar }
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

export default withRouter (NuevoPermisos);