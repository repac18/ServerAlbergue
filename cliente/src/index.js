import React                         from 'react';
import ReactDOM                      from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './assets/scss/mdb.scss';
import './css/alberguestyle.css';
import {RootSession}                 from './App';
import * as serviceWorker            from './serviceWorker';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider}              from 'react-apollo';

const client = new ApolloClient ({
                                   uri:          'http://coatepeque.website/graphql',
                                   // enviar token
                                   fetchOptions: { //se almacena durante todo el tiempo, se ejecuta una sola vez
                                     credentials: 'include'
                                   },
                                   request:      operation => {//verifica la autenticación en cada pagina
                                     const token = localStorage.getItem ('token');
                                     operation.setContext ({//se comunica con el backend y sirve para cominicarse se agrega en el index del servidor
                                                             headers: {
                                                               authorization: token
                                                             }
                                                           });
                                   },
                                   cache:        new InMemoryCache ({
                                                                      addTypename: false
                                                                    }) //para desactivar los _typename, esta esperando una peticion, se va a desactivar
  
                                 });

ReactDOM.render (
   <ApolloProvider client={ client }>
     <RootSession/>
   </ApolloProvider>
   , document.getElementById ('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister ();
