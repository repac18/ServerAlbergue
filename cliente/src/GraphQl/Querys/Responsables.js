import gql from 'graphql-tag';

//Clientes
export const RESPONSABLES_QUERY = gql`
    query getResponsables($limit: Int, $Offset: Int) {
        getresponsables(limit: $limit, Offset: $Offset) {
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

export const RESPONSABLE_QUERY = gql`
    query getResponsable($id:ID) {
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
