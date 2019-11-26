import React, { Component, Fragment } from "react";
import { ENTRADASALIDAINVENTARIO_QUERY } from "../../GraphQl/Querys/EntradaSalidaInventarios";
import FormularioEditar from './FormularioEditar'
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { front } from '../FrontEnd/frontEnd';

class EsEdit extends Component {
  base = new front();
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  render() {
    const { id } = this.props.match.params;
		
    return (
        <Fragment>
         	<div className={this.base.button.card_borderPrimary}>
					{this.base.cardHeader.getCard('Editar Inventario Entradas/Salidas', 'MovimientoInventario', false,true)}
					<div className="card-body">
						<div className="col-md-9">
            <Query query={ENTRADASALIDAINVENTARIO_QUERY} variables={{id}} >
            {({loading,error,data,refetch/**esto lo que haces es 
            realizar nuevamente la consulta */})=>
            {
                if(loading) return 'Cargando';
                if (error) return `Error: ${error.message}`;
             
             
               return <FormularioEditar
                   Entrada={data.getentradaSalidaInventario}
                   refetch={refetch}
                    />
              
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

export default withRouter(EsEdit);