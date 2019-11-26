import gql from 'graphql-tag';

//Parametros
export const PARAMETROS_QUERY = gql`
	query getparametros($limit: Int, $Offset: Int) {
		getparametros(limit: $limit, Offset: $Offset) {
			id
			Nombre
			Valor
		}
	}
`;

export const PARAMETRO_QUERY = gql`
	query getParametro($id:ID) {
		getParametro(id: $id) {
			id
			Nombre
			Valor
		}
	}
`;


