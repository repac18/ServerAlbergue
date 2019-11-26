import mongoose  from 'mongoose';
import {rejects} from 'assert';
import bcrypt    from 'bcrypt';

const ObjectId = mongoose.Types.ObjectId;
import jwt       from 'jsonwebtoken';

import {asignarPaciente,parametros, configuraciones, ListaDeValores, clientes, edificio, bitacora, bitacoraSesion, pacientes, hospital, productos, historialProductos, entradaSalidaInventario, donacion,cajaChica, entradaSalidaCajaChica, roles , permisos, historialCajaChica, usuarios,AsignacionCliente} from '../Conexion/db';


//Generando token
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

export const Query= {
getparametros:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	parametros.find({Eliminado:0},(error,parametros)=>{
		if(error) rejects(error);
		else resolve(parametros);
	}).limit(limit).skip(Offset);
})
},
getParametro:(root,{id})=>{
return new Promise((resolve,object)=>{
	parametros.findById(id,(error,parametro)=>{
		if(error) rejects(error);
		else resolve(parametro);
	});
})
},
getConfiguraciones:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	configuraciones.find({Eliminado:0},(error,configuraciones)=>{
		if(error) rejects(error);
		else resolve(configuraciones);
	}).limit(limit).skip(Offset);
})
},
getConfiguracion:(root,{id})=>{
return new Promise((resolve,object)=>{
	configuraciones.findById(id,(error,configuracion)=>{
		if(error) rejects(error);
		else resolve(configuracion);
	});
})
},
getListaDeValores:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	ListaDeValores.find({Eliminado:0},(error,ListaDeValores)=>{
		if(error) rejects(error);
		else resolve(ListaDeValores);
	}).limit(limit).skip(Offset);
})
},
getListaDeValor:(root,{id})=>{
return new Promise((resolve,object)=>{
	ListaDeValores.findById(id,(error,ListaDeValor)=>{
		if(error) rejects(error);
		else resolve(ListaDeValor);
	});
})
},

getAsignacionClientes:(root,{limit, Offset })=>{
	return new Promise((resolve,object)=>{
		AsignacionCliente.find({Eliminado:0},(error,AsignacionClien)=>{
			if(error) rejects(error);
			else resolve(AsignacionClien);
		}).limit(limit).skip(Offset);
	})
	},
	getAsignacionCliente:(root,{id})=>{
	return new Promise((resolve,object)=>{
		AsignacionCliente.findById(id,(error,AsignacionClien)=>{
			if(error) rejects(error);
			else resolve(AsignacionClien);
		});
	})
	},
getclientes:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	clientes.find({Eliminado:0},(error,clientes)=>{
		if(error) rejects(error);
		else resolve(clientes);
	}).limit(limit).skip(Offset);
})
},
getCliente:(root,{id})=>{
return new Promise((resolve,object)=>{
	clientes.findById(id,(error,cliente)=>{
		if(error) rejects(error);
		else resolve(cliente);
	});
})
},
getresponsables:                 (root, {limit, Offset}) => {
  return new Promise ((resolve, object) => {
    clientes.find ({Eliminado: 0, Responsable: 1}, (error, clientes) => {
      if (error) rejects (error);
      else resolve (clientes);
    }).limit (limit).skip (Offset);
  });
},
getResponsable:                  (root, {id}) => {
  return new Promise ((resolve, object) => {
    clientes.findById (id, (error, cliente) => {
      if (error) rejects (error);
      else resolve (cliente);
    });
  });
},

getedificios:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	edificio.find({Eliminado:0},(error,edificio)=>{
		if(error) rejects(error);
		else resolve(edificio);
	}).limit(limit).skip(Offset);
})
},
getedificio:(root,{id})=>{
return new Promise((resolve,object)=>{
	edificio.findById(id,(error,edificio)=>{
		if(error) rejects(error);
		else resolve(edificio);
	});
})
},
getbitacoras:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	bitacora.find({ },(error,bitacora)=>{
		if(error) rejects(error);
		else resolve(bitacora);
	}).limit(limit).skip(Offset);
})
},
getbitacora:(root,{id})=>{
return new Promise((resolve,object)=>{
	bitacora.findById(id,(error,bitacora)=>{
		if(error) rejects(error);
		else resolve(bitacora);
	});
})
},
getbitacoraSesiones:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	bitacoraSesion.find({},(error,bitacoraSesion)=>{
		if(error) rejects(error);
		else resolve(bitacoraSesion);
	}).limit(limit).skip(Offset);
})
},
getbitacoraSesion:(root,{id})=>{
return new Promise((resolve,object)=>{
	bitacoraSesion.findById(id,(error,bitacoraSesion)=>{
		if(error) rejects(error);
		else resolve(bitacoraSesion);
	});
})
},
getpacientes:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	pacientes.find({Eliminado:0},(error,pacientes)=>{
		if(error) rejects(error);
		else resolve(pacientes);
	}).limit(limit).skip(Offset);
})
},
getpaciente:(root,{id})=>{
return new Promise((resolve,object)=>{
	pacientes.findById(id,(error,paciente)=>{
		if(error) rejects(error);
		else resolve(paciente);
	});
})
},
getHospitales:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	hospital.find({Eliminado:0},(error,hospital)=>{
		if(error) rejects(error);
		else resolve(hospital);
	}).limit(limit).skip(Offset);
})
},
getHospital:(root,{id})=>{
return new Promise((resolve,object)=>{
	hospital.findById(id,(error,hospital)=>{
		if(error) rejects(error);
		else resolve(hospital);
	});
})
},
getproductos:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	productos.find({Eliminado:0},(error,productos)=>{
		if(error) rejects(error);
		else resolve(productos);
	}).limit(limit).skip(Offset);
})
},
getproducto:(root,{id})=>{
return new Promise((resolve,object)=>{
	productos.findById(id,(error,producto)=>{
		if(error) rejects(error);
		else resolve(producto);
	});
})
},
gethistorialProductos:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	historialProductos.find({},(error,historialProductos)=>{
		if(error) rejects(error);
		else resolve(historialProductos);
	}).limit(limit).skip(Offset);
})
},
gethistorialProducto:(root,{id})=>{
return new Promise((resolve,object)=>{
	historialProductos.findById(id,(error,historialProducto)=>{
		if(error) rejects(error);
		else resolve(historialProducto);
	});
})
},
getentradaSalidaInventarios:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	entradaSalidaInventario.find({ },(error,entradaSalidaInventario)=>{
		if(error) rejects(error);
		else resolve(entradaSalidaInventario);
	}).limit(limit).skip(Offset);
})
},
getentradaSalidaInventario:(root,{id})=>{
return new Promise((resolve,object)=>{
	entradaSalidaInventario.findById(id,(error,entradaSalidaInventario)=>{
		if(error) rejects(error);
		else resolve(entradaSalidaInventario);
	});
})
},
getdonaciones:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	donacion.find({},(error,donacion)=>{
		if(error) rejects(error);
		else resolve(donacion);
	}).limit(limit).skip(Offset);
})
},
getdonacion:(root,{id})=>{
return new Promise((resolve,object)=>{
	donacion.findById(id,(error,donacion)=>{
		if(error) rejects(error);
		else resolve(donacion);
	});
})
},
getcajaChicas:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	cajaChica.find({ },(error,cajaChica)=>{
		if(error) rejects(error);
		else resolve(cajaChica);
	}).limit(limit).skip(Offset);
})
},
getcajaChica:(root,{id})=>{
return new Promise((resolve,object)=>{
	cajaChica.findById(id,(error,cajaChica)=>{
		if(error) rejects(error);
		else resolve(cajaChica);
	});
})
},
getentradaSalidaCajaChicas:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	entradaSalidaCajaChica.find({ },(error,entradaSalidaCajaChica)=>{
		if(error) rejects(error);
		else resolve(entradaSalidaCajaChica);
	}).limit(limit).skip(Offset);
})
},
getentradaSalidaCajaChica:(root,{id})=>{
return new Promise((resolve,object)=>{
	entradaSalidaCajaChica.findById(id,(error,entradaSalidaCajaChica)=>{
		if(error) rejects(error);
		else resolve(entradaSalidaCajaChica);
	});
})
},
gethistorialCajaChicas:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	historialCajaChica.find({ },(error,historialCajaChica)=>{
		if(error) rejects(error);
		else resolve(historialCajaChica);
	}).limit(limit).skip(Offset);
})
},
gethistorialCajaChica:(root,{id})=>{
return new Promise((resolve,object)=>{
	historialCajaChica.findById(id,(error,historialCajaChica)=>{
		if(error) rejects(error);
		else resolve(historialCajaChica);
	});
})
},
getusuarios:(root,{limit, Offset })=>{
return new Promise((resolve,object)=>{
	usuarios.find({Eliminado:0},(error,usuario)=>{
		if(error) rejects(error)
		else resolve(usuario);
	}).limit(limit).skip(Offset);
})
},
getasignacionpacientes:(root, {limit, Offset}) => {
  return new Promise ((resolve, object) => {
    asignarPaciente.find({Estado: 'ASIGNADO'}, (error, data) => {
      if (error) rejects (error);
      else resolve (data);
    }).limit (limit).skip (Offset);
  });
},
getasignacionpaciente:                  (root, {id}) => {
  return new Promise ((resolve, object) => {
    asignarPaciente.findById (id, (error, data) => {
      if (error) rejects (error);
      else resolve (data);
    });
  });
},
getusuario:(root,{id})=>{
return new Promise((resolve,object)=>{
	usuarios.findById(id,(error,usuario)=>{
		if(error) rejects(error)
		else resolve(usuario);
	});
})
},


  obtenerUsuario: (root, arg, {usuarioActual}) => {
    
    if (!usuarioActual) {
      return null;
    }
    
    //obtener el usuariio actual del request del JWT verificado
    const usuario = usuarios.findOne ({Usuario: usuarioActual.Usuario, Eliminado: 0});
   
	  if (!usuario) {
      return null;
    }
	return usuario;
    
  },
  
  getroles:    (root, {limit, Offset}) => {
    return new Promise ((resolve, object) => {
      roles.find ({Eliminado: 0}, (error, resultado) => {
        if (error) rejects (error);
        else resolve (resultado);
      }).limit (limit).skip (Offset);
    });
  },
  getrol:      (root, {id}) => {
    return new Promise ((resolve, object) => {
      roles.findById (id, (error, resultado) => {
        if (error) rejects (error);
        else resolve (resultado);
      });
    });
  },
  getpermisos: (root, {limit, Offset}) => {
    return new Promise ((resolve, object) => {
      permisos.find ({Eliminado: 0}, (error, resultado) => {
        if (error) rejects (error);
        else resolve (resultado);
      }).limit (limit).skip (Offset);
    });
  },
  getpermiso:  (root, {id}) => {
    return new Promise ((resolve, object) => {
      permisos.findById (id, (error, resultado) => {
        if (error) rejects (error);
        else resolve (resultado);
      });
    });
  },
  reportesasigClier1:  (root, {id}) => {
    return new Promise ((resolve, object) => {
		AsignacionCliente.aggregate([
			{
					$match:{Eliminado: 0}
			},
			{
					$group:{
						_id: "$Edificio",
						Total: { $sum: 1 }
							}
			}
	],(error,resultado)=>{
		if(error) rejects(error);
		else  resolve(resultado);
		})
	})
},
  reportesasigClier2:  (root, {id}) => {
    return new Promise ((resolve, object) => {
    	AsignacionCliente.aggregate( [{
			$match:{Eliminado: 1}
	},
	{
			$group:{
				_id: "$Edificio",
				Total: { $sum: 1 }
					}
	}],(error,resultado)=>{
		if(error) rejects(error);
			else  resolve(resultado);
		})
	})
},
  reportesasigpas1:  (root, {id}) => {
    return new Promise ((resolve, object) => {
    	asignarPaciente.aggregate([
		{
					$group:{
						_id:'$Fecha',
						Total: {
						  $sum: 1
						}
							
			}
		}
	],(error,resultado)=>{
		if(error) rejects(error);
			else  resolve(resultado);
		})
	})
},
  reportesasigpas2:  (root, {id}) => {
    return new Promise ((resolve, object) => {
    	asignarPaciente.aggregate([
			{
					$group:{
						_id:'$Clientes',
					Total: {
						$sum: 1
							}
						}
			}
	],(error,resultado)=>{
		
		if(error) rejects(error);
			else  resolve(resultado);
		})
	})
},
  reportesproducr1:  (root, {id}) => {
    return new Promise ((resolve, object) => {
		productos.aggregate([
			{
					$group:{
						_id:"$Nombre",
						Total:{$sum:"$Cantidad"}
							}
			}
	],(error,resultado)=>{
		if(error) rejects(error);
			else  resolve(resultado);
		})
	})
},
  reportesdonacior1:  (root, {id}) => {
    return new Promise ((resolve, object) => {
		donacion.aggregate([
			{
					$group:{
						_id:"$Fecha",
						Total: { $sum: 1 }
							}
			}
	],(error,resultado)=>{
		if(error) rejects(error);
			else  resolve(resultado);
		})
	})
}

}