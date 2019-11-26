import gql from 'graphql-tag';

//Configuraciones
export const CONFIGURACIONES_QUERY = gql`
	query getConfiguraciones($limit: Int, $Offset: Int) {
		getConfiguraciones(limit: $limit, Offset: $Offset) {
			id
			Nombre
			Valor {
                Nombre
                Valor
            }
            
		}
	}
`;

export const CONFIGURACION_QUERY = gql`
	query getConfiguracion($id:ID) {
		getConfiguracion(id: $id) {
			id
			Nombre
			Valor {
                Nombre
                Valor
            } 
             
		}
	}
`;