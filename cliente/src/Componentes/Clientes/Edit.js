import React, {Component, Fragment} from 'react';
import {CLIENTE_QUERY}              from '../../GraphQl/Querys/Clientes';
import FormularioEditar             from './FormularioEdit';
import {Query}                      from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class ClientesEdit extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    const {id} = this.props.match.params;
    
    return (
       <Fragment>
         <div className={this.base.button.card_borderPrimary}>
           {this.base.cardHeader.getCard('EDITAR CLIENTE','Clientes',false)}
           <div className="card-body">
               <Query query={ CLIENTE_QUERY } variables={ {id} }>
                 { ({
                      loading, error, data, refetch/**esto lo que haces es
                    realizar nuevamente la consulta */
                    }) => {
                   if (loading) return this.base.text.Cargando;
                   if (error) return `Error: ${ error.message }`;
                   return <FormularioEditar
                      Cliente={ data.getCliente }
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

export default withRouter (ClientesEdit);