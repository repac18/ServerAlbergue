import gql from 'graphql-tag';

//Entrada Salida Caja CHica
export const ENTRADASALIDACAJACHICAS_QUERY = gql`
	query getentradaSalidaCajaChicas($limit: Int, $Offset: Int) {
		getentradaSalidaCajaChicas(limit: $limit, Offset: $Offset) {
			id
			DonacionId
            UsuarioId
            Responsable
            Cantidad
            Tipo
            Fecha
            Estado
    }
}
`;

export const ENTRADASALIDACAJACHICA_QUERY = gql`
	query getentradaSalidaCajaChica($id:ID) {
		getentradaSalidaCajaChica(id: $id) {
			id
			DonacionId
            UsuarioId
            Responsable
            Cantidad
            Tipo
            Fecha
            Estado
    }
}
`;

