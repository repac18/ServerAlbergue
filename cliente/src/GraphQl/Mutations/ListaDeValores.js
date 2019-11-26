import gql from 'graphql-tag';

export const NUEVO_LISTADEVALORES = gql`
mutation crearListaDeValores($input: ListaDeValoresinput) {
    crearListaDeValores(input: $input) {
        id
        Nombre
        Valor{
            Nombre
            Valor   
        }
    }
}
`;

export const ACTUALIZAR_LISTADEVALORES = gql`
mutation actualizarListaDeValores($input: ListaDeValoresinput) {
    actualizarListaDeValores(input: $input) {
        id
        Nombre
        Valor{
            Nombre
            Valor   
        }
    }
}
`;

export const ELIMINAR_LISTADEVALORES = gql`
mutation eliminarListaDeValores($id: ID!) {
    eliminarListaDeValores(id: $id)
}
`;