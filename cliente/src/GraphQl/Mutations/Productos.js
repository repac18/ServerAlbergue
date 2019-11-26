import gql from 'graphql-tag';

export const NUEVO_PRODUCTO = gql`
mutation crearProductos($input: Productosinput) {
    crearProductos(input: $input) {
        id
        Nombre
        Descripcion
        SKU
        CodigoBarra
        Clasificacion
        Tipo
        Cantidad
        Precio
        Eliminado
    }
}
`;

export const ACTUALIZAR_PRODUCTO = gql`
mutation actualizarProductos($input: Productosinput) {
    actualizarProductos(input: $input) {
        id
        Nombre
        Descripcion
        SKU
        CodigoBarra
        Clasificacion
        Tipo
        Cantidad
        Precio
        Eliminado
    }
}
`;

export const ELIMINAR_PRODUCTO = gql`
mutation eliminarProductos($id: ID!) {
    eliminarProductos(id: $id)
}
`;