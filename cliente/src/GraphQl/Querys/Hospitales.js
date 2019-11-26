import gql from 'graphql-tag';

//Hospitales
export const HOSPITALES_QUERY = gql`
	query getHospitales($limit: Int, $Offset: Int) {
		getHospitales(limit: $limit, Offset: $Offset) {
			id
			Nombre
			Descripcion 
            Latitud
            Longitud
             
		}
	}
`;

export const HOSPITAL_QUERY = gql`
	query getHospital($id:ID) {
		getHospital(id: $id) {
			id
			Nombre
			Descripcion 
            Latitud
            Longitud
             
		}
	}
`;
