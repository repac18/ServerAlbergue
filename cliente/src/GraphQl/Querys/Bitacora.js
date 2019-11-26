import gql from 'graphql-tag';

//Bitacora
export const BITACORAS_QUERY = gql`
	query getbitacoras($limit: Int, $Offset: Int) {
		getbitacoras(limit: $limit, Offset: $Offset) {
			id
            Evento
            Documento
            UsuarioId
            Fecha
            Pagina
            Data{
                Nombre 
                Data 
            }
		}
	}
`;

export const BITACORA_QUERY = gql`
	query getbitacora($id:ID) {
		getbitacora(id: $id) {
			id
            Evento
            Documento
            UsuarioId
            Fecha
            Pagina
            Data{
                Nombre 
                Data 
            }
		}
	}
`;
