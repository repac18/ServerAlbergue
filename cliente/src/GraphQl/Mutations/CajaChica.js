import gql from 'graphql-tag';

export const NUEVO_CAJACHICA = gql`
mutation crearCajaChica($input: cajaChicainput) {
    crearCajaChica(input: $input) {
        id
        Cantidad
        Fecha
    }
}
`;

export const ACTUALIZAR_CAJACHICA = gql`
mutation actualizarCajaChica($input: CajaChicainput) {
    actualizarCajaChica(input: $input) {
        id
        Cantidad
        Fecha
    }
}
`;

export const ELIMINAR_CAJACHICA = gql`
mutation eliminarCajaChica($id: ID!) {
    eliminarCajaChica(id: $id)
}
`;