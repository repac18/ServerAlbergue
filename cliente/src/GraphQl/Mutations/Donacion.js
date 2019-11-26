import gql from 'graphql-tag';

export const NUEVO_DONACION = gql`
mutation crearDonacion($input: Donacioninput) {
    crearDonacion(input: $input) {
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

export const ACTUALIZAR_DONACION = gql`
mutation actualizarDonacion($input: Donacioninput) {
    actualizarDonacion(input: $input) {
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

export const ELIMINAR_DONACION = gql`
mutation eliminarDonacion($id: ID!) {
    eliminarDonacion(id: $id)
}
`;