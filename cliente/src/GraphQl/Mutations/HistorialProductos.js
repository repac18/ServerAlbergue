import gql from 'graphql-tag';

export const NUEVO_HISTORIALPRODUCTO = gql`
mutation crearHistorialProductos($input: HistorialProductosinput) {
    crearHistorialProductos(input: $input) {
        id
        ProductoId
        Fecha
        Cantidad
    }
}
`;

export const ACTUALIZAR_HISTORIALPRODUCTO = gql`
mutation actualizarHistorialProductos($input: HistorialProductosinput) {
    actualizarHistorialProductos(input: $input) {
        id
        ProductoId
        Fecha
        Cantidad
    }
}
`;

export const ELIMINAR_HISTORIALPRODUCTO = gql`
mutation eliminarHistorialProductos($id: ID!) {
    eliminarHistorialProductos(id: $id)
}
`;