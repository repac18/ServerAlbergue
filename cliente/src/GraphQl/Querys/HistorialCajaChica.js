import gql from 'graphql-tag';

//Historial de Caja Chica 
export const HISTORIALCAJACHICAS_QUERY = gql`
	query gethistorialCajaChicas($limit: Int, $Offset: Int) {
		gethistorialCajaChicas(limit: $limit, Offset: $Offset) {
			id
			Cantidad 
            Fecha
	}
}
`;

export const HISTORIALCAJACHICA_QUERY = gql`
	query gethistorialCajaChica($id:ID) {
		gethistorialCajaChica(id: $id) {
			id
			Cantidad 
            Fecha
	}
}
`;
