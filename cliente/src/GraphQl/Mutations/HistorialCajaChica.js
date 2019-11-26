import gql from 'graphql-tag';

export const NUEVO_HISTORIALCAJACHICA = gql`
mutation crearHistorialCajaChica($input: HistorialCajaChicainput) {
    crearHistorialCajaChica(input: $input) {
        id
        Cantidad
        Fecha
    }
}
`;

export const ACTUALIZAR_HISTORIALCAJACHICA = gql`
mutation actualizarHistorialCajaChica($input: HistorialCajaChicainput) {
    actualizarHistorialCajaChica(input: $input) {
        id
        Cantidad
        Fecha
    }
}
`;

export const ELIMINAR_HISTORIALCAJACHICA = gql`
mutation eliminarHistorialCajaChica($id: ID!) {
    eliminarHistorialCajaChica(id: $id)
}
`;