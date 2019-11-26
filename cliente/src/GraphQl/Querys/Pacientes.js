import gql from 'graphql-tag';

//Pacientes
export const PACIENTES_QUERY = gql`
	query getpacientes($limit: Int, $Offset: Int) {
		getpacientes(limit: $limit, Offset: $Offset) {
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

export const PACIENTE_QUERY = gql`
	query getpaciente($id:ID) {
		getpaciente(id: $id) {
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

