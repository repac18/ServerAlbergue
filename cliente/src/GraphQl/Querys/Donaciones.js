import gql from 'graphql-tag';

//Donaciones
export const DONACIONES_QUERY = gql`
	query getdonaciones($limit: Int, $Offset: Int) {
		getdonaciones(limit: $limit, Offset: $Offset) {
			id
			UsuarioId
			Responsable
			Donante
			Tipo
			Fecha
			Estado
			Cantidad
	}
}
`;

export const DONACION_QUERY = gql`
	query getdonacion($id:ID) {
		getdonacion(id: $id) {
			id
			UsuarioId
			Responsable
			Donante
			Tipo
			Fecha
			Estado
			Cantidad
	}
}
`;


