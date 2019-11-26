import gql from 'graphql-tag';

export const NUEVO_ENTRADASALIDACAJACHICA = gql`
mutation crearEntradaSalidaCajaChica($input: EntradaSalidaCajaChicainput) {
    crearEntradaSalidaCajaChica(input: $input) {
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

export const ACTUALIZAR_ENTRADASALIDACAJACHICA = gql`
mutation actualizarEntradaSalidaCajaChica($input: EntradaSalidaCajaChicainput) {
    actualizarEntradaSalidaCajaChica(input: $input) {
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

export const ELIMINAR_ENTRADASALIDACAJACHICA = gql`
mutation eliminarEntradaSalidaCajaChica($id: ID!) {
    eliminarEntradaSalidaCajaChica(id: $id)
}
`;