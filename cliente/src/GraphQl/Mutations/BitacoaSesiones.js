import gql from 'graphql-tag';

export const NUEVO_BITACORASESION = gql`
mutation crearBitacoraSesion($input: BitacoraSesioninput) {
    crearBitacoraSesion(input: $input) {
        id
        UsuarioId
        FechaInicio
        FechaCierre
    }
}
`;

export const ACTUALIZAR_BITACORASESION = gql`
mutation actualizarBitacoraSesion($input: BitacoraSesioninput) {
    actualizarBitacoraSesion(input: $input) {
        id
        UsuarioId
        FechaInicio
        FechaCierre
    }
}
`;

export const ELIMINAR_BITACORASESION = gql`
mutation eliminarBitacoraSesion($id: ID!) {
    eliminarBitacoraSesion(id: $id)
}
`;