import gql from 'graphql-tag';

export const NUEVO_PACIENTE = gql`
mutation crearPacientes($input: Pacientesinput) {
    crearPacientes(input: $input) {
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

export const ACTUALIZAR_PACIENTE = gql`
mutation actualizarPacientes($input: Pacientesinput) {
    actualizarPacientes(input: $input) {
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

export const ELIMINAR_PACIENTE = gql`
mutation eliminarPacientes($id: ID!) {
    eliminarPacientes(id: $id)
}
`;