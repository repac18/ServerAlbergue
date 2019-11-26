import React, {Component, Fragment} from 'react';
import {ROL_QUERY}                  from '../../GraphQl/Querys/Roles';
import FormularioEditarRoles        from './FormularioEditarRoles';
import {Query}                      from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class RolesEdit extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    const {id} = this.props.match.params;
    
    // const redireccion=this.props.Access("Roles","Editar")?'':<Redirect to='/'/>;
    
    return (
       <Fragment>
         {/* {redireccion}	 */ }
         <div className={this.base.button.card_borderPrimary}>
           { this.base.cardHeader.getCard ('EDITAR ROLES', 'Roles', false) }
           <div className="card-body">
             <div className='col-md-12'>
               <Query query={ ROL_QUERY } variables={ {id} }>
                 { ({
                      loading, error, data, refetch/**esto lo que haces es
                    realizar nuevamente la consulta */
                    }) => {
                   if (loading) return 'Cargando';
                   if (error) return `Error: ${ error.message }`;
                   
                   return <FormularioEditarRoles
                      Roles={ data.getrol }
                      refetch={ refetch }
                   />;
                 }
                 }
               </Query>
             </div>
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (RolesEdit);