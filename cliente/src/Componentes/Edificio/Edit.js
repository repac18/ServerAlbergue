import React, {Component, Fragment} from 'react';
import {EDIFICIO_QUERY}             from '../../GraphQl/Querys/Edificios';
import FormularioEditarEdifico      from './FormularioEditarEdificio';
import {Query}                      from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class EdificioEdit extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {};
  }
  
  render () {
    const {id} = this.props.match.params;
    
    return (
       
       <div className={ this.base.button.card_borderPrimary }>
         { this.base.cardHeader.getCard ('Editar Edificio', 'Edificios', false) }
         <div className="card-body">
           <Fragment>
             <Query query={ EDIFICIO_QUERY } variables={ {id} }>
               { ({
                    loading, error, data, refetch/**esto lo que haces es
                  realizar nuevamente la consulta */
                  }) => {
                 if (loading) return 'Cargando';
                 if (error) return `Error: ${ error.message }`;
                 
                 return <FormularioEditarEdifico
                    Edifico={ data.getedificio }
                    refetch={ refetch }
                 />;
                 
               }
               }
             
             </Query>
           </Fragment>
         </div>
       </div>
    
    );
  }
}

export default withRouter (EdificioEdit);