import gql from 'graphql-tag';

//Lista de Valores
export const LISTADEVALORES_QUERY = gql`
	query getListaDeValores($limit: Int, $Offset: Int) {
		getListaDeValores(limit: $limit, Offset: $Offset) {
			id
			Nombre
			Valor {
                Nombre
			    Valor
            }
		}
	}
`;

export const LISTADEVALOR_QUERY = gql`
	query getListaDeValor($id:ID) {
		getListaDeValor(id: $id) {
			id
			Nombre
			Valor {
                Nombre
			    Valor
            }
		}
	}
`;
