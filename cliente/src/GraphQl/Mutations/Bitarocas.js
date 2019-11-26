import gql from 'graphql-tag';

export const NUEVO_BITACORA = gql`
mutation crearBitacora($input: Bitacorainput) {
    crearBitacora(input: $input) {
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

export const ACTUALIZAR_BITACORA = gql`
mutation actualizarBitacora($input: bitacorainput) {
    actualizarBitacora(input: $input) {
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

export const ELIMINAR_BITACORA = gql`
mutation eliminarBitacora($id: ID!) {
    eliminarBitacora(id: $id)
}
`;