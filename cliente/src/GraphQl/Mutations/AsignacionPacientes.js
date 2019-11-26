import gql from 'graphql-tag';

export const NUEVO_ASIGNACIONPACIENTE = gql`
    mutation crearAsignacionPacientes($input: AsignacionPacienteinput) {
        crearAsignacionPacientes(input: $input) {
            id
            Pacientes {
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
            Clientes{
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
            Hospitales
            Fecha
            Estado,
            Observaciones
        }
    }
`;

export const ACTUALIZAR_ASIGNACIONPACIENTE = gql`
    mutation actualizarASIGNACIONPACIENTE($input: EntradaSalidaInventarioinput) {
        actualizarEntradaSalidaInventario(input: $input) {
            id
            DonacionId
            UsuarioId
            Productos {
                id
                Nombre
                Descripcion
                SKU
                CodigoBarra
                Clasificacion
                Tipo
                Cantidad
                Precio
            }
            Responsable
            Tipo
            Fecha
            Estado
            Total
        }
    }
`;

export const ELIMINAR_ASIGNACIONPACIENTES = gql`
        mutation eliminarAsignacionPaciente($id: ID!) {
            eliminarAsignacionPaciente(id: $id)
        }
`;
