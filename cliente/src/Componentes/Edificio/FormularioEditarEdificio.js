import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_EDIFICIO}        from '../../GraphQl/Mutations/Edificios.js';

import {Mutation}                                       from 'react-apollo';
import {withRouter}                                     from 'react-router-dom';
import {front}                                          from '../FrontEnd/frontEnd';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

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
          Ocupados:   0
        }
      ]
    }
  ]
};

//#region Mapa
const Map = withScriptjs (withGoogleMap (props =>
                                            <GoogleMap
                                               defaultZoom={ 8 }
                                               defaultCenter={ {lat: props.lat, lng: props.lng} }
                                            >
                                              <Marker
                                                 position={ {lat: props.lat, lng: props.lng} } draggable={ true }
                                              />
                                            </GoogleMap>
));
class FormularioEditarEdifico extends Component {
  base = new front ();
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  state = {
    ...this.props.Edifico
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
    
    const NewRoom_ = NewEstuctur_[index].Habitaciones.filter (
       (habi, index_) => index_h !== index_
    );
    
    NewEstuctur_[index].Habitaciones = NewRoom_;
    
    this.setState ({
                     Estructura: NewEstuctur_
                   });
  };
  
  ReadRoom = (index, index_h, name, value) => {
    const NewEstructura_ = this.state.Estructura;
    
    const NewRoom_ = this.state.Estructura[index].Habitaciones.map (
       (Room, index_) => {
         if (index_h !== index_) return Room;
         return {
           ...Room,
           [name]:     name === 'Capacidad' ? Number.parseInt (value) : value,
           Habitacion: index_h + 1
         };
       }
    );
    
    NewEstructura_[index].Habitaciones = NewRoom_;
    
    this.setState ({
                     Estructura: NewEstructura_
                   });
  };
  
  ReadLeve              = (index, name, value) => {
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
                     this.props.history.push ('/Edificios');
                   }) }
         >
           { (EdificioEdit, {loading, error, data}) => {
             
             return (
                <form autoComplete="off" className="row" onSubmit={ e => this.ActulidarEdificioEdit (e, EdificioEdit) }>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Nombre:</label>
                      <input
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
                         readOnly="readOnly"
                         type="text"
                         name="Latitud"
                         className="form-control"
                         placeholder="Laititud del edificio"
                         onChange={ this.UpdateState }
                         
                         value={ this.state.Latitud }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Logitud:</label>
                      <div className="input-group-append">
                        <input
                           readOnly="readOnly"
                           type="text"
                           name="Longitud"
                           className="form-control"
                           placeholder="Longitud"
                           onChange={ this.UpdateState }
                          
                           value={ this.state.Longitud }
                        
                        />
                        <button
                           onClick={
                             () => {
                               navigator.geolocation.getCurrentPosition (location => {
                                 this.setState ({
                                                  Latitud:  location.coords.latitude + '',
                                                  Longitud: location.coords.longitude + ''
                                                });
                               });
                             }
                           }
                           type="button"
                           data-toggle="tooltip" data-placement="left" title="Ubicacion"
                           
                           className={ this.base.button.buttonEliminarIcon }
                        >
                          <i className={ this.base.icons.fa_map_marker }></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <Map
                       googleMapURL={ `https://maps.googleapis.com/map/api/js?v=3.exp$key=AIzaSyDoGUQv5b6h1K1KJkYnkF68qQQrWA8MYs4` }
                       containerElement={ <div style={ {height: '400px'} }/> }
                       mapElement={ <div style={ {height: '100%'} }/> }
                       loadingElement={ <p>Cargando</p> }
                       lat={ parseFloat (this.state.Latitud) }
                       lng={ parseFloat (this.state.Longitud) }
                    />
                  </div>
                  <div className="col-md-12">
                    { this.state.Estructura.map ((input, index) => {
                      let nivel = 'Nivel ' + (index + 1);
                      
                      return (
                         <div key={ index } className={ this.base.button.card_borderPrimary }>
                           <div className="card-header text-center">
                             <h4 className="card-title text-center mb-5">
                               { nivel + ':' }
                               <button type="button" className={ this.base.button.ActualizarCircle + ' float-left' } data-toggle="tooltip" data-placement="left"
                                       title="Agregar Habitacion"
                                       onClick={ this.NewRoom (index) }>
                                 <i className={ this.base.icons.cardcreatePlus }>
                                 </i>
                               </button>
                             </h4>
                           </div>
                           
                           
                           <div className="card-body">
                             <div className="input-group">
                               <label className="form-control" children={ nivel }/>
                               <input
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
                               
                               <div className="input-group-append">
                                 <button
                                    onClick={
                                      this.DeleteLevel (
                                         index
                                      ) /*cuando se agregan () a una funcion esta se ejecuta automaticamente para ello se agrega un arrow function sobre otra*/
                                    }
                                    type="button"
                                    className={ this.base.button.buttonEliminarIconRed }
                                 >
                                   <i className={ this.base.icons.delete }></i>
                                 </button>
                               </div>
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
                                         />
                                         
                                         <input
                                            // onChange={e=>{
                                            //     const {name, value} =e.target;
                                            //     this.ReadLeve(index,name,value) }
                                            //     }
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
                                         
                                         <div className="input-group-append">
                                           <button
                                              onClick={
                                                this.DeleteRoom (
                                                   index,
                                                   index_h
                                                ) /*cuando se agregan () a una funcion esta se ejecuta automaticamente para ello se agrega un arrow function sobre otra*/
                                              }
                                              type="button"
                                              className={ this.base.button.buttonEliminarIconRed }
                                           >
                                             <i className={ this.base.icons.delete }></i>
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                  
                                  );
                                }
                             ) }
                           
                           </div>
                         </div>
                      
                      );
                    }) }
                    <div className="form-group d-flex justify-content-center col-md-4">
                      <button
                         type="button"
                         className="btn btn-warning btn-block"
                         onClick={ this.NewLevel }
                      >
                        Agregar Nivel
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-md-12">
                    <button type="submit" className={ this.base.button.Primary + ' float-right' }>
                      <i className={ this.base.icons.save }></i>
                      { this.base.text.Guardar }
                    </button>
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