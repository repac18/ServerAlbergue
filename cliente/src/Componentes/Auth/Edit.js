import React, {Component, Fragment} from 'react';
import {USUARIO_QUERY}              from '../../GraphQl/Querys/Usuarios';
import FormularioEditarUsuario      from './FormularioEditarUsuario';
import {Query}                      from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class UsuarioEdit extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    const {id} = this.props.match.params;
    
    return (
       <Fragment>
         <div className={ this.base.button.card_borderPrimary }>
           { this.base.cardHeader.getCard ('EDITAR USUARIO', 'Usuarios', false) }
           <div className="card-body">
             
             <Query query={ USUARIO_QUERY } variables={ {id} }>
               { ({
                    loading, error, data, refetch
                  }) => {
                 if (loading) return 'Cargando';
                 if (error) return `Error: ${ error.message }`;
                 
                 return <FormularioEditarUsuario
                    Usuario={ data.getusuario }
                    refetch={ refetch }
                 />;
                 
               }
               }
             
             </Query>
           
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (UsuarioEdit);