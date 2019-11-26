import React, {Component, Fragment} from 'react';
import {PERMISOS_QUERY}             from '../../GraphQl/Querys/Permisos';
import {Query}                      from 'react-apollo';
import {withRouter, Redirect}       from 'react-router-dom';

import FormularioAgregarAsignacion from './FormularioAgregarAsignacion';
import {front}                     from '../FrontEnd/frontEnd';

class Aginacionrxp extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    
    const redireccion = this.props.Access ('Asignar Permiso', 'Acceder') ? '' : <Redirect to='/'/>;
    return (
       <Fragment>
         { redireccion }
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('Asignación de Roles', '', false, true) }
           <div className="card-body">
             <div className='col-md-12'>
               <Query
                  query={ PERMISOS_QUERY }
               >
                 { ({
                      loading,
                      error,
                      data,
                      refetch//para recargar el resto de la vista
                    }) => {
                   if (loading) return 'Cargando...';
                   if (error) return `Error: ${ error.message }`;
                   return (
                      <FormularioAgregarAsignacion
                         AllPermit={ data.getpermisos }
                         refetch={ refetch }
                         Access={ this.props.Access }
                      />
                   );
                 } }
               </Query>
             </div>
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (Aginacionrxp);