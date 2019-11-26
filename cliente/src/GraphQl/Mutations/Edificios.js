import gql from 'graphql-tag';

export const NUEVO_EDIFICIO = gql`
mutation crearEdificio($input: Edificioinput) {
    crearEdificio(input: $input) {
        id
        Nombre
        Latitud
        Longitud
        Estructura{
            Nombre
            Nivel
            Habitaciones {
                Nombre
                Habitacion
                Capacidad
                Ocupados
            }
        }
    }
}
`;

export const ACTUALIZAR_EDIFICIO = gql`
mutation actualizarEdificio($input: Edificioinput) {
    actualizarEdificio(input: $input) {
        id
        Nombre
        Latitud
        Longitud
        Estructura{
            Nombre
            Nivel
            Habitaciones {
                Nombre
                Habitacion
                Capacidad
                Ocupados
            }
        }
    }
}
`;

export const ELIMINAR_EDIFICIO = gql`
mutation eliminarEdificio($id: ID!) {
    eliminarEdificio(id: $id)
}
`;