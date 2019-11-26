import React, {Component, Fragment} from 'react';
import {Query}                      from 'react-apollo';
import {LISTADEVALOR_QUERY}         from '../../../GraphQl/Querys/ListaDeValores';

class Generic extends Component {
  
  Activado = (Valor) => {
    if (this.props.Value === Valor) {
      return true;
    } else {
      
      return false;
    }
    
  };
  
  render () {
    
    return (
       <Fragment>
         <Query
            query={ LISTADEVALOR_QUERY }
            // pollInterval={ 500 }
            variables={ {
              id: this.props.id
            } }
         >
           { ({
                loading,
                error,
                data,
                startPolling,
                stopPolling //para recargar el resto de la vista
              }) => {
             if (loading) return 'Cargando...';
             if (error) return `Error: ${ error.message }`;
             
             return (
                <Fragment>
                  <select  name={ this.props.Campo } defaultValue={0} className="form-control" onChange={ this.props.UpdateState } disabled={this.props.disabled}>
                    <option key={ 0 } value={ 0 } >{ '...' }</option>
                    { data.getListaDeValor.Valor.map (item => {
                      if (this.props.NValor) {
                        return (
                           <option key={ item.Nombre } value={ item.Nombre }
                      selected={ this.props.Value === item.Nombre }  >{ item.Nombre }</option>
                        );
                      } else {
                        return (
                           <option key={ item.Valor } value={ item.Valor }
                                   selected={ this.props.Value ===
                                   item.Valor }>{ item.Nombre }</option>
                        );
                      }
                    })
                    }
                  </select>
                </Fragment>
             );
           } }
         </Query>
       
       </Fragment>
    );
  }
}

export default Generic;