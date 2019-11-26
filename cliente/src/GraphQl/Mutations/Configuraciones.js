import gql from 'graphql-tag';

export const NUEVO_CONFIGURACION = gql`
mutation crearConfiguracion($input: Configuracionesinput) {
    crearConfiguracion(input: $input) {
        id
        Nombre
        Valor{
            Nombre
            Valor
            }
        Eliminado
    }
}
`;

export const ACTUALIZAR_CONFIGURACION = gql`
mutation actualizarConfiguracion($input: Configuracionesinput) {
    actualizarConfiguracion(input: $input) {
        id
        Nombre
        Valor{
            Nombre
            Valor
            }
        Eliminado
    }
}
`;

export const ELIMINAR_CONFIGURACION = gql`
mutation eliminarConfiguracion($id: ID!) {
    eliminarConfiguracion(id: $id)
}
`;