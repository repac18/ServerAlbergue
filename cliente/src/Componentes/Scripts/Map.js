import React from 'react';
import {GoogleMap,withScriptjs,withGoogleMap, Marker} from 'react-google-maps';

const Map = (props)=>{
  return (
  <GoogleMap
     defaultZoom={10}
  defaultCenter={{lat:-20, lng:150}}>
    <Marker position={{lat:-30,lng:150}} onClick={props.onMarkerClick}/>
  </GoogleMap>
  );
};

export default withScriptjs(
   withGoogleMap(
      Map
   )
)