import gql from 'graphql-tag';

//Roles
export const ROLES_QUERY = gql`
	query getroles($limit: Int, $Offset: Int) {
		getroles(limit: $limit, Offset: $Offset) {
			id
			Nombre
			Descripcion
	}
}
`;


export const ROLES_QUERY_ALL_DATA = gql`
	query getroles($limit: Int, $Offset: Int) {
		getroles(limit: $limit, Offset: $Offset) {
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

export const ROL_QUERY = gql`
	query getrol($id:ID) {
		getrol(id: $id) {
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
