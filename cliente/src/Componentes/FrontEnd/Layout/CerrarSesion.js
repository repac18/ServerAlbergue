import React            from 'react';
import {ApolloConsumer} from 'react-apollo';
import {withRouter}     from 'react-router-dom';
import PersonIcon       from '@material-ui/icons/Person';
import IconButton       from '@material-ui/core/IconButton';

const cerrarSesionUsuatio = (cliente, history) => {
  localStorage.removeItem ('token', '');
  //desloguar
  cliente.resetStore ();  //esto limpia todo
  //redireccionar
  history.push ('/login');
};

const CerrarSesion = ({history, props}) => (
   <ApolloConsumer>
     { cliente => {
       return (
          <IconButton onClick={ () => cerrarSesionUsuatio (cliente, history) }>
            <PersonIcon >
            </PersonIcon>
          </IconButton>
       );
     } }
   </ApolloConsumer>
);

export default withRouter (CerrarSesion);