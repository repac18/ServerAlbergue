import gql from 'graphql-tag';

//Edificios
export const EDIFICIOS_QUERY = gql`
	query getedificios($limit: Int, $Offset: Int) {
		getedificios(limit: $limit, Offset: $Offset) {
			id
			Nombre
            Latitud
            Longitud
            Estructura{
                Nombre
                Nivel 
                Habitaciones{
                    Nombre 
                    Habitacion 
                    Capacidad
                    Ocupados
                }
            }
		}
	}
`;

export const EDIFICIO_QUERY = gql`
	query getedificio($id:ID) {
		getedificio(id: $id) {
			id
			Nombre
            Latitud
            Longitud
            Estructura{
                Nombre
                Nivel 
                Habitaciones{
                    Nombre 
                    Habitacion 
                    Capacidad
                    Ocupados
                }
            }
		}
	}
`;