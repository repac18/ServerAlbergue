import gql from 'graphql-tag';

//Configuraciones
export const ASIGNACIONES_PACIENTES_QUERY = gql`
	query getasignacionpacientes($limit: Int, $Offset: Int) {
		getasignacionpacientes(limit: $limit, Offset: $Offset) {
			id
            Hospitales
            Clientes {
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
                    Eliminado
                    Responsable
            }
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
                    Eliminado
            }
            Fecha
            Estado
            Observaciones
        }
    }
`;

export const ASIGNACION_PACIENTES_QUERY = gql`
	query getasignacionpaciente($id:ID) {
		getasignacionpaciente(id: $id) {
			id
            Hospitales
            Clientes {
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
                    Eliminado
                    Responsable
            }
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
                    Eliminado
            }
            Fecha
            Estado
            Observaciones
        }
    }
`;