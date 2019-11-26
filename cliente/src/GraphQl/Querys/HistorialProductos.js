import gql from 'graphql-tag';

//Historial Productos
export const HISTORIALPRODUCTOS_QUERY = gql`
	query gethistorialProductos($limit: Int, $Offset: Int) {
		gethistorialProductos(limit: $limit, Offset: $Offset) {
			id
			ProductoId
            Fecha
            Cantidad
	}
}
`;

export const HISTORIALPRODUCTO_QUERY = gql`
	query gethistorialProducto($id:ID) {
		gethistorialProducto(id: $id) {
			id
			ProductoId
            Fecha
            Cantidad
	}
}
`;



