import React, { Component, Fragment } from "react";
import { DONACION_QUERY }             from "../../GraphQl/Querys/Donaciones";
import FormularioEditarDonacion       from './FormularioEditarDonacion'
import { Query }                      from "react-apollo";
import { withRouter }                 from "react-router-dom";
import {front}                        from '../FrontEnd/frontEnd';

class DonacionEdit extends Component {
  base=new front();
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  render() {
    const { id } = this.props.match.params;
    return (
        <Fragment>
          <div className={this.base.button.card_borderPrimary}>
            {this.base.cardHeader.getCard('Editar Donaciones','Donaciones',false)}
            <div className="card-body">
                <Query query={DONACION_QUERY} variables={{id}} >
                  {({loading,error,data,refetch})=>
                  {
                    if(loading) return 'Cargando';
                    if (error) return `Error: ${error.message}`;
                    return <FormularioEditarDonacion
                       Donacion={data.getdonacion}
                       refetch={refetch}
                    />
      
                  }
                  }
  
                </Query>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default withRouter(DonacionEdit);