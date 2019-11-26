import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
mutation crearClientes($input: Clientesinput) {
    crearClientes(input: $input) {
        id
        Nombre
        Apellido
        Edad
        Direccion
        Dpi
        Nit
        Sexo
        Municipio
        Departamento
    }
}
`;

export const ACTUALIZAR_CLIENTE = gql`
mutation actualizarCliente($input: Clientesinput) {
    actualizarCliente(input: $input) {
        id
        Nombre
        Apellido
        Edad
        Direccion
        Dpi
        Nit
        Sexo
        Municipio
        Departamento
    }
}
`;

export const ELIMINAR_CLIENTE = gql`
mutation eliminarClientes($id: ID!) {
    eliminarClientes(id: $id)
}
`;