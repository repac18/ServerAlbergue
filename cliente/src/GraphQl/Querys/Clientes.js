import gql from 'graphql-tag';

//Clientes
export const CLIENTES_QUERY = gql`
	query getclientes($limit: Int, $Offset: Int) {
		getclientes(limit: $limit, Offset: $Offset) {
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

export const CLIENTE_QUERY = gql`
	query getCliente($id:ID) {
		getCliente(id: $id) {
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
