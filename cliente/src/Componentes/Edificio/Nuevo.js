import React, {Component, Fragment}                     from 'react';
import {NUEVO_EDIFICIO}                                 from '../../GraphQl/Mutations/Edificios.js';
import {Mutation}                                       from 'react-apollo';
import {withRouter, Redirect}                           from 'react-router-dom';
import {front}                                          from '../FrontEnd/frontEnd';
import {MDBInput}                                       from 'mdbreact';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';

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
          Ocupados:  0
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
//#endregion

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
class NuevoEdificio extends Component {
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
                                                                       Ocupados:  0
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
                                         Ocupados:  0
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
  
  ReadLeve           = (index, name, value) => {
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
  crearNuevoEdificio = (e, nuevoEdificio) => {
    e.preventDefault ();
    
    this.base.swal2.create ('create').then (result => {
      if (result.value) {
        nuevoEdificio ().then (data => {
          this.ClearState ();
          this.base.swal2.success ('create');
          this.props.history.push ('/Edificio/Index');
        });
      }
      
    });
  };
  componentDidMount () {
    /*this.delayedShowMarker();*/
    
    // OR
    navigator.geolocation.getCurrentPosition(location => {
      console.log(location);
      this.setState({
                      Latitud: location.coords.latitude+"",
                      Longitud: location.coords.longitude+""
                    })
    });
  };
  
  render () {
    
    const {Nombre, Latitud, Longitud, Estructura} = this.state;
    const input                                   = {
      Nombre,
      Latitud,
      Longitud,
      Estructura
    };
    const redireccion                             = this.props.Access ('Edificios', 'Guardar') ? '' : <Redirect to='/'/>;
    return (
       <Fragment>
         { redireccion }
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('AGREGAR', 'Edificios', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_EDIFICIO } variables={ {input} }>
               { (nuevoEdificio, {loading, error, data}) => {
                 return (
                    <form autoComplete="off" onSubmit={ e => this.crearNuevoEdificio (e, nuevoEdificio) }>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="form-group">
                              <MDBInput label="Nombre Edificio" name="Nombre" size="sm"  onChange={ this.UpdateState }/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput label="Latitud" name="Latitud" readOnly={'readOnly'} size="sm" valueDefault={this.state.Latitud } value={ this.state.Latitud } onChange={ this.UpdateState }/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group" readOnly>
                            <MDBInput label="Longitud" valueDefault={this.state.Longitud} readOnly={'readOnly'} name="Logitud" size="sm" value={ this.state.Longitud } onChange={ this.UpdateState }/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <Map
                             googleMapURL={ `https://maps.googleapis.com/map/api/js?v=3.exp$key=AIzaSyDoGUQv5b6h1K1KJkYnkF68qQQrWA8MYs4` }
                             containerElement={ <div style={ {height: '400px'} }/> }
                             mapElement={ <div style={ {height: '100%'} }/> }
                             loadingElement={ <p>Cargando</p> }
                             lat={parseFloat(this.state.Latitud) }
                             lng={parseFloat(this.state.Longitud)}
                          />
                        </div>
                      </div>
                      { this.state.Estructura.map ((input, index) => {
                        let nivel = 'Nivel ' + (index + 1);
                        
                        return (
                           <div key={ index } className="form-group col-md-12">
                             <label>{ nivel }:</label>
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
                                  value={ this.state.Estructura[index].Nombre }
                               />
                               
                               <div className="input-group-append">
                                 <button
                                    onClick={
                                      this.DeleteLevel (
                                         index
                                      ) /*cuando se agregan () a una funcion esta se ejecuta automaticamente para ello se agrega un arrow function sobre otra*/
                                    }
                                    type="button"
                                    className={ this.base.button.buttonEliminarIcon }
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
                                              className={ this.base.button.buttonEliminarIcon }
                                           >
                                             <i className={ this.base.icons.delete }></i>
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                  );
                                }
                             ) }
                             <div className="row justify-content-center">
                               <div className="form-group d-flex col-md-4 p-3">
                                 <button
                                    type="button"
                                    className="btn btn-info btn-block"
                                    onClick={ this.NewRoom (index) }
                                 >
                                   Agregar Habitacion
                                 </button>
                               </div>
                             </div>
                           </div>
                        );
                      }) }
                      <div className="row justify-content-center">
                        <div className="form-group d-flex col-md-6">
                          <button
                             type="button"
                             className={ this.base.button.Editar + ' btn-block' }
                             onClick={ this.NewLevel }
                          >
                            Agregar Nivel
                          </button>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-12">
                          <button type="submit" className={ this.base.button.Primary + ' float-right' }>
                            <i className={ this.base.icons.save }></i>
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

export default withRouter (NuevoEdificio);




