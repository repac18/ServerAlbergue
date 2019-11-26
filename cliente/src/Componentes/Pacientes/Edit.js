import React, {Component, Fragment} from 'react';
import {PACIENTE_QUERY}             from '../../GraphQl/Querys/Pacientes';
import FormularioEditar             from './FormularioEdit';
import {Query}                      from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class PacienteEdit extends Component {
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
           { this.base.cardHeader.getCard ('EDITAR PACIENTE', 'Pacientes', false) }
           <div className="card-body">
             <Query query={ PACIENTE_QUERY } variables={ {id} }>
               { ({
                    loading, error, data, refetch/**esto lo que haces es
                  realizar nuevamente la consulta */
                  }) => {
                 if (loading) return this.base.text.Cargando;
                 if (error) return `Error: ${ error.message }`;
                 return <FormularioEditar
                    Paciente={ data.getpaciente }
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

export default withRouter (PacienteEdit);