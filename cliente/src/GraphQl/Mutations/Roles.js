import gql from 'graphql-tag';

export const NUEVO_ROL = gql`
mutation crearRoles($input: Rolesinput) {
    crearRoles(input: $input) 
}
`;

export const ACTUALIZAR_ROL = gql`
mutation actualizarRoles($input: Rolesinput) {
    actualizarRoles(input: $input) {
        id
    Nombre
    Descripcion
    Permiso{
      id
      Nombre
      Descripcion
      URL
      Menu
 			Activo
      Opcion{
        id
        Descripcion
        Activo
        Nombre
      }
    }
  
    }
}
`;

export const ELIMINAR_ROL = gql`
mutation eliminarRoles($id: ID!) {
    eliminarRoles(id: $id)
}
`;



//AgregarPermisos
export const ACTUALIZAR_PERMISOS = gql`
mutation AgregarPermisos($input: Rolesinput) {
  AgregarPermisos(input: $input) {
        id
    Nombre
    Descripcion
    Permiso{
      id
      Nombre
      Descripcion
      URL
      Menu
 			Activo
      Opcion{
        id
        Descripcion
        Activo
        Nombre
      }
    }
  
    }
}
`;