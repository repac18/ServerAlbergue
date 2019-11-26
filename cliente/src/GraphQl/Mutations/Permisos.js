import gql from 'graphql-tag';

export const NUEVO_PERMISO = gql`
mutation crearPermisos($input: Permisosinput) {
    crearPermisos(input: $input)
}
`;

export const ACTUALIZAR_PERMISO = gql`
mutation actualizarPermisos($input: Permisosinput) {
    actualizarPermisos(input: $input) {
        Nombre
    Descripcion
    URL
    Menu
    Activo
    Opcion{
      Nombre
      Descripcion
      Activo
    }
  
    }
}
`;

export const ELIMINAR_PERMISO = gql`
mutation eliminarPermisos($id: ID!) {
    eliminarPermisos(id: $id)
}
`;