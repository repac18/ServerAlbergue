import gql from 'graphql-tag';

//Configuraciones
export const ASIGNACIONES_CLIENTES_QUERY = gql`
	query getAsignacionClientes($limit: Int, $Offset: Int) {
		getAsignacionClientes(limit: $limit, Offset: $Offset) {
			id
            Edificio
            Nivel
            Habitacion
            Cliente
            FechaIngreso
            FechaSalida
            Eliminado
    }
    }
`;

export const ASIGNACION_CLIENTES_QUERY = gql`
	query getasignacioncliente($id:ID) {
		getasignacioncliente(id: $id) {
			id
            Edificio
            Nivel
            Habitacion
            Cliente
            FechaIngreso
            FechaSalida
            Eliminado
    }
    }
`;