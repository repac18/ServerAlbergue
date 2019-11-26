import gql from 'graphql-tag';

export const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($usuario: String!, $password: String!) {
		autenticarUsuario(usuario: $usuario, password: $password) {
            token
		}
	}
`;


export const NUEVO_USUARIO = gql`
mutation crearUsuarios($input: Usuariosinput) {
    crearUsuarios(input: $input)
}
`;

export const ACTUALIZAR_USUARIO = gql`
mutation actualizarUsuarios($input: Usuariosinput) {
    actualizarUsuarios(input: $input) {
        id
        Usuario
        Nombre
        Password
        Rol{
            id
            Nombre
        }
    }
}
`;

export const ELIMINAR_USUARIO = gql`
mutation eliminarUsuarios($id: ID!) {
    eliminarUsuarios(id: $id)
}
`;
