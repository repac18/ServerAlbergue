import gql from 'graphql-tag';


export const NUEVO_HOSPITAL = gql`
mutation crearHospital($input: Hospitalinput) {
    crearHospital(input: $input) {
        id
        Nombre
        Descripcion
        Latitud
        Longitud
        
    }
}
`;

export const ACTUALIZAR_HOSPITAL = gql`
mutation actualizarHospital($input: Hospitalinput) {
    actualizarHospital(input: $input) {
        id
        Nombre
        Descripcion
        Latitud
        Longitud
    
    }
}
`;

export const ELIMINAR_HOSPITAL = gql`
mutation eliminarHospital($id: ID!) {
    eliminarHospital(id: $id)
}
`;