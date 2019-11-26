import React, {Component, Fragment}                     from 'react';
import {ACTUALIZAR_HOSPITAL}                            from '../../GraphQl/Mutations/Hospital';
import {Mutation}                                       from 'react-apollo';
import {withRouter}                                     from 'react-router-dom';
import {front}                                          from '../FrontEnd/frontEnd';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

const initialState = {
  Nombre:      '',
  Descripcion: '',
  Latitud:     '',
  Longitud:    ''
};

const Map = withScriptjs (withGoogleMap (props =>
                                            <GoogleMap
                                               defaultZoom={ 10 }
                                               defaultCenter={ {lat: props.lat, lng: props.lng} }
                                            >
                                              <Marker
                                                 position={ {lat: props.lat, lng: props.lng} } draggable={ true }
                                              />
                                            </GoogleMap>
));

class HospitalActualizado extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Hospital
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
  
  actualizarHospital = (e, actualizarHospital) => {
    e.preventDefault ();
    this.base.swal2.create ('create').then (result => {
      if (result.value) {
        actualizarHospital ().then (data => {
          this.ClearState ();
          this.base.swal2.success ('edit');
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
            Latitud,
            Longitud
          } = this.state;
    
    const input = {
      id,
      Nombre,
      Descripcion,
      Latitud,
      Longitud
    };
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_HOSPITAL } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Hospitales');
                   })
                   }
         >
           { (actualizarHospital, {loading, error, data}) => {
             return (
                <form autoComplete="off"
                      onSubmit={ e => this.actualizarHospital (e, actualizarHospital) }
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Nombre }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Descripcion:</label>
                        <input
                           type="text"
                           name="Descripcion"
                           className="form-control"
                           placeholder="Descripcion del Producto"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Descripcion }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label> Latitud:</label>
                        <input
                           readOnly="readOnly"
                           type="text"
                           name="Latitud"
                           className="form-control"
                           placeholder="Latitud del Hospital"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Latitud }
                           value={ this.state.Latitud }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Longitud:</label>
                        <div className="input-group-append">
                          <input
                             readOnly="readOnly"
                             type="text"
                             name="Longitud"
                             className="form-control"
                             placeholder="Longitud del Hospital"
                             onChange={ this.UpdateState }
                             value={ this.state.Longitud }
                             defaultValue={ this.state.Longitud }
                          
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
       </Fragment>
    );
  }
}

export default withRouter (HospitalActualizado);