import gql from 'graphql-tag';

export const NUEVO_ENTRADASALIDAINVENTARIO = gql`
	mutation crearEntradaSalidaInventario($input: EntradaSalidaInventarioinput) {
		crearEntradaSalidaInventario(input: $input) {
			id
			DonacionId
			UsuarioId
			Productos {
				id
				Nombre
				Descripcion
				SKU
				CodigoBarra
				Clasificacion
				Tipo
				Cantidad
				Precio
			}
			Responsable
			Tipo
			Fecha
			Estado
			Total
		}
	}
`;

export const ACTUALIZAR_ENTRADASALIDAINVENTARIO = gql`
	mutation actualizarEntradaSalidaInventario($input: EntradaSalidaInventarioinput) {
		actualizarEntradaSalidaInventario(input: $input) {
			id
			DonacionId
			UsuarioId
			Productos {
				id
				Nombre
				Descripcion
				SKU
				CodigoBarra
				Clasificacion
				Tipo
				Cantidad
				Precio
			}
			Responsable
			Tipo
			Fecha
			Estado
			Total
		}
	}
`;

export const ELIMINAR_ENTRADASALIDAINVENTARIO = gql`
	mutation eliminarEntradaSalidaInventario($id: ID!) {
		eliminarEntradaSalidaInventario(id: $id)
	}
`;
