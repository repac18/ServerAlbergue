import gql from 'graphql-tag';

//Entrada y Salida de Inventarios
export const ENTRADASALIDAINVENTARIOs_QUERY = gql`
	query getentradaSalidaInventarios($limit: Int, $Offset: Int) {
		getentradaSalidaInventarios(limit: $limit, Offset: $Offset) {
			id
			DonacionId
			UsuarioId
			Productos {
				id
				Nombre
				Descripcion
				SKU
				CodigoBarra
				Clasificacion
				Tipo
				Cantidad
				Precio
			}
			Responsable
			Tipo
			Fecha
			Estado
			Total
	}
}
`;

export const ENTRADASALIDAINVENTARIO_QUERY = gql`
	query getentradaSalidaInventario($id:ID) {
		getentradaSalidaInventario(id: $id) {
			id
			DonacionId
			UsuarioId
			Productos {
				id
				Nombre
				Descripcion
				SKU
				CodigoBarra
				Clasificacion
				Tipo
				Cantidad
				Precio
			}
			Responsable
			Tipo
			Fecha
			Estado
			Total
	}
}
`;