import gql from 'graphql-tag';

export const ASIGNAR_CLIENTE = gql`
mutation crearAsignacionCliente($input: AsignacionClienteInput) {
    crearAsignacionCliente(input: $input) 
}
`;

export const ELIMINAR_ASIGNACIONCLIENTES = gql`
mutation eliminarAsignacionCliente($id: ID!,$Edificio:String,$Nivel:String,$Habitacion:String) {
    eliminarAsignacionCliente(id: $id,Edificio:$Edificio,Nivel:$Nivel,Habitacion:$Habitacion)
}
`;