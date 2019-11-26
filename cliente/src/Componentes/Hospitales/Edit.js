import React, {Component, Fragment} from 'react';
import {HOSPITAL_QUERY}             from '../../GraphQl/Querys/Hospitales';
import FormularioEditarHospital     from './FormularioEditarHospital';
import {Query}                      from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import {front}                      from '../FrontEnd/frontEnd';

class HospitalEdit extends Component {
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
           <div className="card-body">
             { this.base.cardHeader.getCard ('EDITAR HOSPITAL', 'Hospitales', false) }
             <Query query={ HOSPITAL_QUERY } variables={ {id} }>
               { ({
                    loading, error, data, refetch/**esto lo que haces es
                  realizar nuevamente la consulta */
                  }) => {
                 if (loading) return 'Cargando';
                 if (error) return `Error: ${ error.message }`;
                 
                 return <FormularioEditarHospital
                    Hospital={ data.getHospital }
                    refetch={ refetch }
                 />;
               } }
             </Query>
           </div>
         </div>
       </Fragment>
    );
  }
}

export default withRouter (HospitalEdit);