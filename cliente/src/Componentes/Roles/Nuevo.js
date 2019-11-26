import React, {Component, Fragment} from 'react';
import {NUEVO_ROL}                  from '../../GraphQl/Mutations/Roles';
import {Mutation}                   from 'react-apollo';
import {withRouter, Redirect} from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';
import {MDBInput}                   from 'mdbreact';

const initialState = {
  id:          '',
  Nombre:      '',
  Descripcion: ''
};

class NuevosRoles extends Component {
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
  
  UpdateState = (e) => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: value
                   });
  };
  
  crearRoles = (e, crearRoles) => {
    e.preventDefault ();
    this.base.swal2.create('create').then(result=>{
      if(result.value){
        crearRoles ().then ((data) => {
          this.base.swal2.success('create');
          this.ClearState ();
          this.props.history.push ('/Roles');
        });
        
      }
    });
    //insertamos en la base de datos
    
  };
  
  render () {
    const redireccion           = this.props.Access ('Roles', 'Guardar') ? '' : <Redirect to='/'/>;
    const {Nombre, Descripcion} = this.state;
    
    const input = {
      Nombre, Descripcion
    };
    return (
       <Fragment>{ redireccion }
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('AGREGAR ROL', 'Roles', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_ROL } variables={ {input} }>
               { (crearRoles, {loading, error, data}) => {
                 return (
                    <form autoComplete="off" onSubmit={ (e) => this.crearRoles (e, crearRoles) }>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <MDBInput
                               label="Nombre" autoComplete="off" name="Nombre" size="sm" onChange={ this.UpdateState }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <MDBInput
                               label="Descripcion" autoComplete="off" name="Descripcion" size="sm" onChange={ this.UpdateState }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group float-right">
                          <button type="submit" className={ this.base.button.Primary + ' float-right' }>
                            { this.base.icons.save }
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

export default withRouter (NuevosRoles);