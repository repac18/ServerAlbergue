import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_EDIFICIO}        from '../../GraphQl/Mutations/Edificios.js';
import {ASIGNAR_CLIENTE}            from '../../GraphQl/Mutations/AsignarCliente';

import {Mutation}   from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {front}      from '../FrontEnd/frontEnd';

const initialState = {
  Nombre:     '',
  Latitud:    '',
  Longitud:   '',
  Estructura: [
    {
      Nombre:       '',
      Nivel:        '',
      Habitaciones: [
        {
          Nombre:     '',
          Habitacion: '',
          Capacidad:  0,
          Ocupados:   0,
          Clientes:   []
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
//         Estructura{
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
class FormularioEditarEdifico extends Component {
  base = new front ();
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  state = {
    ...this.props.Edifico,
    idCliente: this.props.idCliente
  };
  
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: value
                   });
  };
  
  NewLevel = () => {
    this.setState ({
                     Estructura: this.state.Estructura.concat ([
                                                                 {
                                                                   Nombre:       '',
                                                                   Nivel:        '',
                                                                   Habitaciones: [
                                                                     {
                                                                       Nombre:     '',
                                                                       Habitacion: '',
                                                                       Capacidad:  0,
                                                                       Ocupados:   0
                                                                     }
                                                                   ]
                                                                 }
                                                               ])
                   });
  };
  
  NewRoom = index => () => {
    const NewRoom_ = this.state.Estructura;
    NewRoom_[index].Habitaciones.push ({
                                         Nombre:     '',
                                         Habitacion: '',
                                         Capacidad:  0,
                                         Ocupados:   0
                                       });
    
    this.setState ({
                     Estructura: NewRoom_
                   });
  };
  
  DeleteLevel = index => () => {
    this.setState (
       {
         Estructura: this.state.Estructura.filter (
            (Estructura_, index_) => index !== index_
         )
       },
       () => {
         const NewEstructura_ = this.state.Estructura.map (
            (Estructura_, index_) => {
              
              return {
                ...Estructura_,
                Nivel: index_ + 1
              };
            }
         );
         
         this.setState ({
                          Estructura: NewEstructura_
                        });
       }
    );
  };
  
  DeleteRoom = (index, index_h) => () => {
    const NewEstuctur_ = this.state.Estructura;
    
    NewEstuctur_[index].Habitaciones = NewEstuctur_[index].Habitaciones.filter (
       (habi, index_) => index_h !== index_
    );
    
    this.setState ({
                     Estructura: NewEstuctur_
                   });
  };
  
  ReadRoom = (index, index_h, name, value) => {
    const NewEstructura_ = this.state.Estructura;
    
    NewEstructura_[index].Habitaciones = this.state.Estructura[index].Habitaciones.map (
       (Room, index_) => {
         if (index_h !== index_) return Room;
         return {
           ...Room,
           [name]:     name === 'Ocupados' ? Number.parseInt (value) : value,
           Habitacion: index_h + 1
         };
       }
    );
    
    this.setState ({
                     Estructura: NewEstructura_
                   });
  };
  
  ReadLeve = (index, name, value) => {
    const NewEstructura_ = this.state.Estructura.map ((Estructura_, index_) => {
      if (index !== index_) return Estructura_;
      return {
        ...Estructura_,
        [name]: value,
        Nivel:  index + 1
      };
    });
    
    this.setState ({
                     Estructura: NewEstructura_
                   });
  };
  
  ActulidarEdificioEdit = (e, EdificioEdit) => {
    e.preventDefault ();
    this.base.swal2.create ('edit').then (result => {
      if (result.value) {
        EdificioEdit ().then (data => {
          this.ClearState ();
          this.base.swal2.success ('edit');
          // this.props.history.push("/Edificio/Index");
        });
      }
    });
  };
  
  Agregar = (e, EdificioEdit) => {
    e.preventDefault ();
    this.base.swal2.create ('', 'DESEA ASIGNAR AL CLIENTE').then (result => {
      if (result.value) {
        EdificioEdit ().then (data => {
          this.ClearState ();
          this.base.swal2.success ('Asignado', 'Cliente Asignado');
          // this.props.history.push("/Edificio/Index");
        });
      }
    });
  };
  // SelectClientes = (Clientes,nombre) => {
  
  //   const data ={
  
  //     ...Clientes
  //   }
  //     this.setState ({
  //   Clientes: {...this.state.Clientes,
  //     [nombre]:data
  //   } 
  //       });
  
  //     };
  
  //para el insert
  // const dese= ocupadosSelect.split('||')
  
  // console.log(dese); 
  
  // if (dese) {
  //   const nivel_B = dese[0];
  //   const habi_B = dese[1];
  
  //   let resultadoBusqueda=0;
  //   // eslint-disable-next-line
  
  //   const rest = this.state.Estructura.map ((data, index) => {
  
  //     if (data.Nombre==nivel_B){
  //       return data.Habitaciones.map ((habi, index_p) => {
  
  //         if (habi.Nombre == habi_B) {
  
  //           return habi.
  
  //         } else {
  //           return 0;
  //         }
  
  //       });
  
  //     }
  //     else{
  //       return 0
  //     }
  
  //   });
  
  //   return 0;
  // }
  
  // OcupadosSelect=(ocupadosSelect)=>{
  
  //   let salida=0
  
  //   const ocup=this.state.Clientes[ocupadosSelect];
  
  //    console.log(ocup)
  
  //   // clientes_todos.  const dese= ocupadosSelect.split('||')
  
  //   // for (const prop in this.state.Clientes[ocupadosSelect]) {
  //   //   console.log(prop);
  //   // }
  
  //   // this.state.Clientes[ocupadosSelect].map((data, index) => {
  
  //   //   if(data.OcupadosLugar=ocupadosSelect)
  //   //   {
  //   //     salida= data.length;
  //   //   }
  //   // })
  
  //   return salida;
  // }
  
  render () {
    const {id, Nombre, Latitud, Longitud, Estructura} = this.state;
    
    const input = {
      id,
      Nombre,
      Latitud,
      Longitud,
      Estructura
    };
    
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_EDIFICIO } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/VerEdificios');
                   }) }
         >
           { (EdificioEdit, {loading, error, data}) => {
             
             return (
                <form className="row" onSubmit={ e => this.ActulidarEdificioEdit (e, EdificioEdit) }>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Nombre:</label>
                      <input
                         readOnly
                         type="text"
                         name="Nombre"
                         className="form-control"
                         placeholder="Nombre del edificio"
                         onChange={ this.UpdateState }
                         defaultValue={ this.state.Nombre }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Latitud:</label>
                      <input
                         readOnly
                         type="text"
                         name="Latitud"
                         className="form-control"
                         placeholder="Laititud del edificio"
                         onChange={ this.UpdateState }
                         defaultValue={ this.state.Latitud }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Logitud:</label>
                      <input
                         readOnly
                         type="text"
                         name="Longitud"
                         className="form-control"
                         placeholder="Longitud del edificio"
                         onChange={ this.UpdateState }
                         defaultValue={ this.state.Longitud }
                      
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    { this.state.Estructura.map ((input, index) => {
                      let nivel = 'Nivel ' + (index + 1);
                      
                      return (
                         <div key={ index } className={ this.base.button.card_borderPrimary }>
                           <div className="card-header text-center">
                             <h4 className="card-title text-center mb-5">
                               { nivel + ':' }
                             
                             </h4>
                           </div>
                           
                           
                           <div className="card-body">
                             <div className="input-group">
                               <label className="form-control" children={ nivel }/>
                               <input
                                  readOnly
                                  onChange={ e => {
                                    const {name, value} = e.target;
                                    this.ReadLeve (index, name, value);
                                  } }
                                  type="text"
                                  placeholder="Nombre"
                                  name="Nombre"
                                  className="form-control"
                                  defaultValue={ this.state.Estructura[index].Nombre }
                               />
                             
                             
                             </div>
                             { this.state.Estructura[index].Habitaciones.map (
                                (input, index_h) => {
                                  let Habitacion = 'Habitacion ' + (index_h + 1);
                                  
                                  return (
                                     <div key={ index_h } className="form-group cal-md-12">
                                       <label>{ Habitacion }</label>
                                       <div className="input-group">
                                         <label
                                            className="form-control"
                                            children={ Habitacion }
                                         />
                                         <input
                                            readOnly
                                            // onChange={e=>{
                                            //     const {name, value} =e.target;
                                            //     this.ReadLeve(index,name,value) }
                                            //     }
                                            type="text"
                                            placeholder="Nombre"
                                            name="Nombre"
                                            className="form-control"
                                            onChange={ e => {
                                              const {name, value} = e.target;
                                              this.ReadRoom (index, index_h, name, value);
                                            } }
                                            defaultValue={ this.state.Estructura[index].Habitaciones[index_h].Nombre }
                                            
                                            // value={this.state.Estructura[index].Nombre}
                                         /> <label
                                          className="form-control"
                                          children={ 'Capacidad' }
                                       />
                                         <input
                                            // onChange={e=>{
                                            //     const {name, value} =e.target;
                                            //     this.ReadLeve(index,name,value) }
                                            //     }
                                            readOnly
                                            type="number"
                                            placeholder="Capacidad"
                                            name="Capacidad"
                                            className="form-control"
                                            onChange={ e => {
                                              const {name, value} = e.target;
                                              this.ReadRoom (index, index_h, name, value);
                                            } }
                                            defaultValue={ this.state.Estructura[index].Habitaciones[index_h].Capacidad }
                                            
                                            // value={this.state.Estructura[index].Nombre}
                                         />
                                         
                                         <label
                                            className="form-control"
                                            children={ 'Ocupados' }
                                         />
                                         <input
                                            readOnly
                                            // onChange={e=>{
                                            //     const {name, value} =e.target;
                                            //     this.ReadLeve(index,name,value) }
                                            //     }
                                            type="number"
                                            placeholder="Ocupados"
                                            name="Ocupados"
                                            className="form-control"
                                            onChange={ e => {
                                              const {name, value} = e.target;
                                              this.ReadRoom (index, index_h, name, value);
                                            } }
                                            defaultValue={ this.state.Estructura[index].Habitaciones[index_h].Ocupados }
                                            
                                            // value={this.state.Estructura[index].Nombre}
                                         />
                                       </div>
                                       <div className="row">
                                         
                                         { !(this.state.Estructura[index].Habitaciones[index_h].Capacidad ===
                                            this.state.Estructura[index].Habitaciones[index_h].Ocupados)
                                         && (
                                            
                                            <Mutation mutation={ ASIGNAR_CLIENTE } variables={ {
                                              input: {
                                                Edificio:     this.state.Nombre,
                                                Nivel:        this.state.Estructura[index].Nombre,
                                                Habitacion:   this.state.Estructura[index].Habitaciones[index_h].Nombre,
                                                Cliente:      this.state.idCliente,
                                                FechaIngreso: this.state.Fecha,
                                                Edificios:    {
                                                  id:         this.state.id,
                                                  Nombre:     this.state.Nombre,
                                                  Latitud:    this.state.Latitud,
                                                  Longitud:   this.state.Longitud,
                                                  Estructura: this.state.Estructura
                                                }
                                              }
                                            } }
                                                      onCompleted={ () => this.props.refetch ().then (() => {
                                                        this.props.history.push ('/Clientes');
                                                      }) }
                                            >
                                              { (Agregar, {loading, error, data}) => {
                                                return (
                                                   <div className="col-md-4">
                                                     <div className="form-group">
                                                       <label>Fecha:</label>
                                                       <input
                                                          type="Date"
                                                          name="Fecha"
                                                          className="form-control"
                                                          placeholder="Fecha"
                                                          onChange={ this.UpdateState }
                                                          defaultValue={ this.state.Fecha }
                                                       />
                                                     </div>
                                                     
                                                     <button type="button"
                                                             onClick={ e => this.Agregar (e, Agregar) }
                                                             className={ this.base.button.PrimaryTableCircle }>
                                                       <i className={ this.base.icons.createPlus }></i>
                                                     </button>
                                                   
                                                   </div>
                                                
                                                );
                                              } }
                                            </Mutation>) }
                                         {/* <Query
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
                                          onChange={
                                          e => {
                                          this.SelectClientes(e,Clientes_seleccionados_datos_edificio)
                                          }
                                          }
                                          options={data.getclientes}
                                          isMulti={true}
                                          components={makeAnimated()}
                                          placeholder={'Seleccione el clientes'}
                                          getOptionLabel={(options) => options.Nombre}
                                          getOptionValue={(options) => options.id}
                                          //  value={this.state.Estructura[index].Habitaciones[index_h].Clientes}
                                          />
                                          </div>
                                          )}}
                                          </Query> */ }
                                       </div>
                                     </div>
                                  
                                  );
                                }
                             ) }
                           
                           </div>
                         </div>
                      
                      );
                    }) }
                  
                  </div>
                
                
                </form>
             );
           } }
         </Mutation>
       </Fragment>
    );
  }
}

export default withRouter (FormularioEditarEdifico);