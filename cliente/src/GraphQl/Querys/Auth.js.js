import gql from 'graphql-tag';

//usuarios
export const USUARIO_ACTUAL = gql`
	query obtenerUsuario {
		obtenerUsuario {
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
