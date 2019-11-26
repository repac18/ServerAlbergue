import gql from 'graphql-tag';

//Permisos
export const PERMISOS_QUERY = gql`
	query getpermisos($limit: Int, $Offset: Int) {
		getpermisos(limit: $limit, Offset: $Offset) {
			id
			Nombre
			Descripcion
			URL
			Menu
			Activo
			Opcion {
				Nombre
				Descripcion
				Activo
			}
		}
	}
`;

export const PERMISO_QUERY = gql`
	query getpermiso($id: ID) {
		getpermiso(id: $id) {
			id
			Nombre
			Descripcion
			URL
			Menu
			Activo
			Opcion {
				Nombre
				Descripcion
				Activo
			}
		}
	}
`;
