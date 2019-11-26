import React, {Component, Fragment}   from 'react';
import {LISTADEVALOR_QUERY}           from '../../../GraphQl/Querys/ListaDeValores';
import FormularioEditarListaDeValores from './FormularioEditarListaDeValores';
import {Query}                        from 'react-apollo';
import {withRouter}                   from 'react-router-dom';
import {front}                        from '../../FrontEnd/frontEnd';

class ListaDeValoresEdit extends Component {
  base=new front();
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    const {id} = this.props.match.params;
    
    return (
       <Fragment>
         <div className={this.base.button.card_borderPrimary}>
           {this.base.cardHeader.getCard('EDITAR LISTA DE VALORES','Mantenimientos/ListaDeValores',false)}
           <div className="card-body">
             <div className="col-md-12">
               <Query query={ LISTADEVALOR_QUERY } variables={ {id} }>
                 { ({
                      loading, error, data, refetch
                    }) => {
                   if (loading) return 'Cargando';
                   if (error) return `Error: ${ error.message }`;
                   return <FormularioEditarListaDeValores
                      ListaDeValor={ data.getListaDeValor }
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

export default withRouter (ListaDeValoresEdit);