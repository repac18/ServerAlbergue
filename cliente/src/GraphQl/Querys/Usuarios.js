import gql from 'graphql-tag';

//Configuraciones
export const USUARIOS_QUERY = gql`
	query getusuarios($limit: Int, $Offset: Int) {
		getusuarios(limit: $limit, Offset: $Offset) {
			id
			Nombre
			Password
			Usuario
			Rol {
				id
				Nombre
				Descripcion
				Permiso {
					id
					Nombre
					Descripcion
					URL
					Activo
					Opcion {
						id
						Nombre
						Descripcion
						Activo
					}
				}
			}
        }
    }
`;

export const USUARIO_QUERY = gql`
	query getusuario($id:ID) {
		getusuario(id: $id) {
			id
			Nombre
			Password
			Usuario
			Rol {
				id
				Nombre
				Descripcion
				Permiso {
					id
					Nombre
					Descripcion
					URL
					Activo
					Opcion {
						id
						Nombre
						Descripcion
						Activo
					}
				}
			}
        }
    }
`;