import React, {Component, Fragment} from 'react';
import SelectRol                    from './SelectRol';
import {Query}                      from 'react-apollo';
import {ROLES_QUERY_ALL_DATA}       from '../../GraphQl/Querys/Roles';
import Select                       from 'react-select';
import makeAnimated                 from 'react-select/animated';
import {ACTUALIZAR_PERMISOS}        from '../../GraphQl/Mutations/Roles';
import {Mutation}                   from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

const initialState = {
  rol:           '',
  nuevos:        '',
  eliminar:      '',
  seleccionados: ''
};

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
class FormularioAgregarAsignacion extends Component {
  base=new front();
  constructor (props) {
    super (props);
    this.state = {
      Permisos: this.props.AllPermit,
      ...initialState
    };
  }
  
  SelectRol = (rol) => {
    this.setState ({
                     rol,
                     seleccionados: rol.Permiso
                   });
  };
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  SelectPermit = (seleccionados) => {
    this.setState ({
                     seleccionados
                   });
  };
  
  componentWillUnmount () {
    this.ClearState ();
  }
  
  AgregarPermisos = (e, AgregarPermisos) => {
    e.preventDefault ();
    // insertamos en la base de datos
    AgregarPermisos ().then ((data) => {
      //direccionar
    });
  };
  
  ReadState = (i) => (e) => {
    const {name, value} = e.target;
    const NewState      = this.state.Opcion.map ((Va, index) => {
      if (i !== index) return Va;
      return {
        ...Va,
        [name]: name === 'Activo' ? this.VerifyBooleans (value) : value
      };
    });
    
    this.setState ({Opcion: NewState});
  };
  
  render () {
    const {rol, seleccionados} = this.state;
    
    //         const {Permiso}=rol;
    
    //         const PermisosAnteriores=[];
    //         const PermisosNuevos=[];
    
    //         if(Permiso && seleccionados){
    //                 for(let i=0;i<Permiso.length;i++)
    //                 {
    //                     for(let j=0;j<(seleccionados.length);j++)
    //                     {
    //                     if(Permiso[i].id==seleccionados[j].id)
    //                         {
    //                             PermisosAnteriores.push(Permiso[i])
    //                         }
    //                     }
    //                 }
    //             }
    
    //             // if(PermisosAnteriores && seleccionados){
    //             //     for(let i=0;i<PermisosAnteriores.length;i++)
    //             //     {
    //             //         for(let j=0;j<(seleccionados.length);j++)
    //             //         {
    //             //         if(PermisosAnteriores[i].id!=seleccionados[j].id)
    //             //             {
    //             //                 PermisosNuevos.push(seleccionados[j])
    //             //             }
    //             //         }
    //             //     }
    //             // }
    
    const input = {
      ...rol,
      Permiso: seleccionados
    };
    
    return (
       <Fragment>
         <Mutation
            mutation={ ACTUALIZAR_PERMISOS }
            variables={ {input} }
            onCompleted={ () =>
               this.props.refetch ().then (() => {
                 this.props.history.push ('/Roles');
               }) }
         >
           { (AgregarPermisos, {loading, error, data}) => {
             return (
                <form autoComplete="off" className="row" onSubmit={ (e) => this.AgregarPermisos (e, AgregarPermisos) }>
                  
                  <div className="col-md-12">
                    <div className="form-group">
                      <Query query={ ROLES_QUERY_ALL_DATA }>
                        { ({
                             loading,
                             error,
                             data,
                             refetch /**esto lo que haces es
                           realizar nuevamente la consulta */
                           }) => {
                          refetch ();
                          if (loading) return 'Cargando';
                          if (error) return `Error: ${ error.message }`;
                          
                          return (
                             <SelectRol
                                SelectRol={ this.SelectRol }
                                Roles={ data.getroles }
                                refetch={ refetch }
                                rol={ this.state.rol }
                             />
                          );
                        } }
                      </Query>
                    </div>
                  
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <Select
                         onChange={ this.SelectPermit }
                         options={ this.state.Permisos }
                         isMulti={ true }
                         components={ makeAnimated () }
                         placeholder={ 'Seleccione los permisos' }
                         getOptionLabel={ (options) => options.Nombre }
                         getOptionValue={ (options) => options.id }
                         value={ this.state.seleccionados }
                      />
                    </div>
                  
                  </div>
                  
                  
                    <div className="col-md-12">
                      { this.props.Access ('Asignar Permiso', 'Guardar') && (
                         <button type="submit" className={this.base.button.Primary + ' float-right'}>
                           <i className={this.base.icons.save}></i>
                           {this.base.text.Guardar}
                         </button>
                      ) }
                    
                  </div>
                
                </form>
             );
           } }
         </Mutation>
       </Fragment>
    );
  }
}

export default withRouter (FormularioAgregarAsignacion);
