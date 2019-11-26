import gql from 'graphql-tag';

export const NUEVO_RESPONSABLE = gql`
    mutation crearResponsables($input: Clientesinput) {
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
            Responsable
        }
    }
`;

export const ACTUALIZAR_RESPONSABLE = gql`
    mutation actualizarResponsable($input: Clientesinput) {
        actualizarResponsable(input: $input) {
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

export const ELIMINAR_RESPONSABLE = gql`
    mutation eliminarResponsables($id: ID!) {
        eliminarClientes(id: $id)
    }
`;