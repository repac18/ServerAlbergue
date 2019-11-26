import gql from 'graphql-tag';

//Bitacora Sesiones
export const BITACORASESIONES_QUERY = gql`
	query getbitacoraSesiones($limit: Int, $Offset: Int) {
		getbitacoraSesiones(limit: $limit, Offset: $Offset) {
			id
			UsuarioId
            FechaInicio
            FechaCierre
		}
	}
`;

export const BITACORASESION_QUERY = gql`
	query getbitacoraSesion($id:ID) {
		getbitacoraSesion(id: $id) {
			id
			UsuarioId
            FechaInicio
            FechaCierre
		}
		
	}
`;

