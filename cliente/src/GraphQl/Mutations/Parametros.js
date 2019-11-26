import gql from 'graphql-tag';

export const NUEVO_PARAMETRO = gql`
mutation crearParametros($input: Parametrosinput) {
    crearParametros(input: $input) {
        id
        Nombre
        Valor
    }
}
`;

export const ACTUALIZAR_PARAMETRO = gql`
mutation actualizarParametros($input: Parametrosinput) {
    actualizarParametros(input: $input) {
        id
        Nombre
        Valor
    }
}
`;

export const ELIMINAR_PARAMETRO = gql`
mutation eliminarParametros($id: ID!) {
    eliminarParametros(id: $id)
}
`;