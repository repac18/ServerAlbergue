import React, {Component, Fragment} from 'react';
import {PERMISO_QUERY}              from '../../GraphQl/Querys/Permisos';
import FormularioEditarPermisos     from './FormularioEditarPermisos';
import {Query}                      from 'react-apollo';
import {Link, withRouter}           from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class PermisosEdit extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    // const redireccion=this.props.Access("Permisos","Editar")?'':<Redirect to='/'/>;
    
    const {id} = this.props.match.params;
    
    return (
       <Fragment>
         {/* {redireccion}	 */ }
         <div className={this.base.button.card_borderPrimary}>
           <div className="card-header text-center">
             <h4 className="card-title">
               <Link to={ `/Permisos` }>
                 <button className={ this.base.button.GuardarCircle + ' float-left' } data-toggle="tooltip" data-placement="left"
                         title={ this.base.text.Atras }>
                   <i className={this.base.icons.btnBack}></i>
                 </button>
               </Link>
               EDITAR
             </h4>
           </div>
           <div className='row'>
             <div className="col-md-12">
               <Query query={ PERMISO_QUERY } variables={ {id} }>
                 { ({
                      loading, error, data, refetch/**esto lo que haces es
                    realizar nuevamente la consulta */
                    }) => {
                   if (loading) return 'Cargando';
                   if (error) return `Error: ${ error.message }`;
                   
                   return <FormularioEditarPermisos
                      Permisos={ data.getpermiso }
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

export default withRouter (PermisosEdit);