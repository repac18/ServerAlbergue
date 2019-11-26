import React, {Component, Fragment}      from 'react';
import {ENTRADASALIDACAJACHICA_QUERY}    from '../../GraphQl/Querys/EntradaSalidaCajaChica';
import FormularioEditarEntradaSalidaCaja from './FormularioEditCajas';
import {Query}                           from 'react-apollo';
import {withRouter}                      from 'react-router-dom';
import {front}                           from '../FrontEnd/frontEnd';

class CajaEditar extends Component {
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
           { this.base.cardHeader.getCard ('Editar Caja', 'MovimientoCaja', false) }
           <div className="card-body">
             <Query query={ ENTRADASALIDACAJACHICA_QUERY } variables={ {id} }>
               { ({
                    loading, error, data, refetch
                  }) => {
                 if (loading) return 'Cargando';
                 if (error) return `Error: ${ error.message }`;
                 
                 
                 return <FormularioEditarEntradaSalidaCaja
                    Caja={ data.getentradaSalidaCajaChica }
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

export default withRouter (CajaEditar);