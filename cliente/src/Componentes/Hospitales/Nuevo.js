import React, {Component, Fragment}                     from 'react';
import {NUEVO_HOSPITAL}                                 from '../../GraphQl/Mutations/Hospital';
import {Mutation}                                       from 'react-apollo';
import {withRouter, Redirect}                           from 'react-router-dom';
import {front}                                          from '../FrontEnd/frontEnd';
import {MDBInput}                                       from 'mdbreact';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

const initialState = {
  Nombre:      '',
  Descripcion: '',
  Latitud:     '',
  Longitud:    ''
};

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

class HospitalNuevo extends Component {
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
  
  crearNuevoHospital = (e, nuevoHospital) => {
    e.preventDefault ();
    this.base.swal2.create('create').then(result=>{
      if(result.value){
        nuevoHospital ().then (data => {
          this.ClearState ();
          this.base.swal2.success('create');
          //direccionar
          this.props.history.push ('/Hospital/Index');
        });
      }
    });
    //insertamos en la base de datos
    
    
  };
  componentDidMount () {
    navigator.geolocation.getCurrentPosition(location => {
      console.log(location);
      this.setState({
                      Latitud: location.coords.latitude+"",
                      Longitud: location.coords.longitude+""
                    })
    });
  };
  
  render () {
    const {
            Nombre,
            Descripcion,
            Latitud,
            Longitud
          }     = this.state;
    const input = {
      Nombre,
      Descripcion,
      Latitud,
      Longitud
    };
    
    
    const redireccion = this.props.Access ('Hospitales', 'Guardar') ? '' : <Redirect to='/'/>;
    return (
       <Fragment>
         { redireccion }
         
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('AGREGAR HOSPITAL', 'Hospitales', false) }
           <div className="card-body">
             <Mutation mutation={ NUEVO_HOSPITAL } variables={ {input} }>
               { (nuevoHospital, {loading, error, data}) => {
                 return (
                    <form autoComplete="off"
                       onSubmit={ e => this.crearNuevoHospital (e, nuevoHospital) }
                    >
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Nombre" name="Nombre" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.Nombre }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Descripcion" name="Descripcion" size="sm" onChange={ this.UpdateState } defaultValue={ this.state.Descripcion }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Latitud" name="Latitud" type="number" size="sm" onChange={ this.UpdateState } readOnly={'readOnly'} value={ this.state.Latitud } defaultValue={ this.state.Latitud }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <MDBInput
                               label="Longitud" name="Longitud" type="number" size="sm" onChange={ this.UpdateState } readOnly={'readOnly'} value={ this.state.Longitud } defaultValue={ this.state.Longitud }
                            />
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
                      <button type="submit" className={ this.base.button.Primary + ' float-right' }>
                        <i className={ this.base.icons.save }></i>
                        { this.base.text.Guardar }
                      </button>
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

export default withRouter (HospitalNuevo);