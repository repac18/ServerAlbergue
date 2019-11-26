import gql from 'graphql-tag';

//Caja Chica
export const CAJACHICAS_QUERY = gql`
	query getcajaChicas($limit: Int, $Offset: Int) {
		getcajaChicas(limit: $limit, Offset: $Offset) {
			id
			Cantidad
            Fecha
	}
}
`;

export const CAJACHICA_QUERY = gql`
	query getcajaChica($id:ID) {
		getcajaChica(id: $id) {
			id
			Cantidad
            Fecha
	}
}
`;

