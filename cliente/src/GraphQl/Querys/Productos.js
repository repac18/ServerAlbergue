import gql from 'graphql-tag';

//Productos
export const PRODUCTOS_QUERY = gql`
	query getproductos($limit: Int, $Offset: Int) {
		getproductos(limit: $limit, Offset: $Offset) {
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
}
`;

export const PRODUCTO_QUERY = gql`
	query getproducto($id:ID) {
		getproducto(id: $id) {
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
}
`;



