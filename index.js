import express from 'express';
import cors from 'cors';
import path from 'path';
import "@babel/polyfill";
// graphql

import {ApolloServer} from 'apollo-server-express';
import typeDefs from './Data/Schema/master.graphql';

import jwt from 'jsonwebtoken';
import bcrypt    from 'bcrypt';
//

import { rejects } from 'assert';
import dotenv from 'dotenv';
const ObjectId=mongoose.Types.ObjectId;




//


import mongoose, {Schema, model} from 'mongoose';
import {arch}                    from 'os';

//Variable db[0] mongoServer (Atlas)
const db = [
  'mongodb+srv://epropac16:h7FG6guM6PfUV2CV@cluster0-nt9ru.mongodb.net/Albergue?retryWrites=true&w=majority',
  'mongodb://localhost/Albergue'
];

mongoose.Promise = global.Promise;
mongoose.connect (db[0], {useNewUrlParser: true});

/*
 mongoose.connect(db[0], { useNewUrlParser: true },e=>{
 if(e){
 console.error('Error '+e)
 }else{
 console.log('Success')
 }
 });
 
 */

mongoose.set ('setFindAndModify', false);

// definir el schema de clientes mongoose.Types.ObjectId

const parametrosSchema = new Schema ({
                                       Nombre:    String,
                                       Valor:     String,
                                       Eliminado: Number
                                     });

const configuracionesSchema = new Schema ({
                                            Nombre:    String,
                                            Valor:     Array,
                                            Eliminado: Number
                                          });

const listaDeValoresSchema = new Schema ({
                                           Nombre:    String,
                                           Valor:     Array,
                                           Eliminado: Number
                                         });

const clientesSchema = new Schema ({
                                     Nombre:       String,
                                     Apellido:     String,
                                     Edad:         Number,
                                     Direccion:    String,
                                     Dpi:          String,
                                     Nit:          String,
                                     Sexo:         String,
                                     Municipio:    String,
                                     Departamento: String,
                                     Eliminado:    Number,
                                     Responsable:  Number
                                   });

const edificioSchema = new Schema ({
                                     Nombre:     String,
                                     Latitud:    String,
                                     Longitud:   String,
                                     Estructura: Array,
                                     Eliminado:  Number
                                   });

const bitacoraSchema = new Schema ({
                                     Evento:    String,
                                     Documento: String,
                                     UsuarioId: mongoose.Types.ObjectId,
                                     Fecha:     Date,
                                     Pagina:    String,
                                     Data:      Array
                                   });

const bitacoraSesionSchema = new Schema ({
                                           UsuarioId:   mongoose.Types.ObjectId,
                                           FechaInicio: Date,
                                           FechaCierre: Date
                                         });

const pacientesSchema = new Schema ({
                                      Nombre:       String,
                                      Apellido:     String,
                                      Edad:         Number,
                                      Direccion:    String,
                                      Dpi:          String,
                                      Nit:          String,
                                      Sexo:         String,
                                      Municipio:    String,
                                      Departamento: String,
                                      Eliminado:    Number
                                    });

const hospitalSchema = new Schema ({
                                     Nombre:      String,
                                     Descripcion: String,
                                     Latitud:     String,
                                     Longitud:    String,
                                     Eliminado:   Number
                                   });

const productosSchema = new Schema ({
                                      Nombre:        String,
                                      Descripcion:   String,
                                      SKU:           String,
                                      CodigoBarra:   String,
                                      Clasificacion: String,
                                      Tipo:          String,
                                      Cantidad:      Number,
                                      Precio:        Number,
                                      //FechaCaducidad: Date,
                                      Eliminado:     Number
                                    });

const historialProductosSchema = new Schema ({
                                               ProductoId: mongoose.Types.ObjectId,
                                               Fecha:      Date,
                                               Cantidad:   Number,
                                               Precio:     Number
                                             });

const entradaSalidaInventarioSchema = new Schema ({
                                                    DonacionId:  mongoose.Types.ObjectId,
                                                    UsuarioId:   mongoose.Types.ObjectId,
                                                    Productos:   Array,
                                                    Responsable: String,
                                                    Tipo:        Number,
                                                    Fecha:       Date,
                                                    Estado:      String,
                                                    Total:       Number
                                                  });

const donacionSchema = new Schema ({
                                     UsuarioId:   mongoose.Types.ObjectId,
                                     Responsable: String,
                                     Donante:     String,
                                     Tipo:        Number,
                                     Fecha:       Date,
                                     Estado:      String,
                                     Cantidad:    Number
                                   });

const cajaChicaSchema = new Schema ({
                                      Cantidad: Number,
                                      Fecha:    Date
                                    });

const entradaSalidaCajaChicaSchema = new Schema ({
                                                   DonacionId:  mongoose.Types.ObjectId,
                                                   UsuarioId:   mongoose.Types.ObjectId,
                                                   Responsable: String,
                                                   Cantidad:    Number,
                                                   Tipo:        Number,
                                                   Fecha:       Date,
                                                   Estado:      String
                                                 });

const historialCajaChicaSchema = new Schema ({
                                               Cantidad: Number,
                                               Fecha:    Date
                                             });

const usuariosSchema = new Schema ({
                                     Usuario:   String,
                                     Nombre:    String,
                                     Password:  String,
                                     Rol:       Array,
                                     Eliminado: Number
                                   });

const rolesSchema = new Schema ({
                                  Nombre:      String,
                                  Descripcion: String,
                                  Permiso:     Array,
                                  Eliminado:   Number
                                });

const permisosSchema = new Schema ({
                                     Nombre:      String,
                                     Descripcion: String,
                                     URL:         String,
                                     Menu:        String,
                                     Activo:      Boolean,
                                     Opcion:      Array,
                                     Eliminado:   Number
                                   });

const asignacionPacienteSchema = new Schema ({
                                               Hospitales: String,
                                               Clientes:  Array,
                                               Pacientes: Array,
                                               Fecha:Date,
                                               FechaSalida:Date,
                                               Estado:String,
                                               Observaciones:String,
                                               Eliminado:   Number
                                             });
                                             
//usuarios

const AsignacionClienteSchema = new Schema({
  Edificio: String,
  Nivel: String,
  Habitacion: String,
  Cliente: String,
  FechaIngreso:Date,
  FechaSalida:Date,
  Eliminado: Number
});


const parametros              = model ('parametros', parametrosSchema);
const configuraciones         = model ('configuraciones', configuracionesSchema);
const ListaDeValores          = model ('ListaDeValores', listaDeValoresSchema);
const clientes                = model ('clientes', clientesSchema);
const edificio                = model ('edificio', edificioSchema);
const bitacora                = model ('bitacora', bitacoraSchema);
const bitacoraSesion          = model ('bitacoraSesion', bitacoraSesionSchema);
const pacientes               = model ('pacientes', pacientesSchema);
const hospital                = model ('hospital', hospitalSchema);
const productos               = model ('productos', productosSchema);
const historialProductos      = model ('historialProductos', historialProductosSchema);
const entradaSalidaInventario = model ('entradaSalidaInventario', entradaSalidaInventarioSchema);
const donacion                = model ('donacion', donacionSchema);
const cajaChica               = model ('cajaChica', cajaChicaSchema);
const entradaSalidaCajaChica  = model ('entradaSAlidaCajaChica', entradaSalidaCajaChicaSchema);
const roles                   = model ('roles', rolesSchema);
const permisos                = model ('permisos', permisosSchema);
const asignarPaciente         = model ('asignacionPaciente', asignacionPacienteSchema);
const AsignacionCliente=model('AsignacionCliente',AsignacionClienteSchema);

const historialCajaChica=model('historialCajaChica', historialCajaChicaSchema);




usuariosSchema.pre ('save', function(next) {
  //si el password no esta modificado ejecuta la siguiente funcion
  if (!this.isModified ('Password')) {
    return next ();
  }
  console.log(":1")
  bcrypt.genSalt (10, (err, salt) => {
    if (err) return next (err);
  console.log(":2")
    
    bcrypt.hash (this.Password, salt, (err, hash) => {
      if (err) return next (err);

      console.log(":3")
      this.Password = hash;
      next ();
    });
  });
});







const usuarios = model ('usuarios', usuariosSchema);
//



const types={
    Usuarios: {
    Rol: async ({ Rol }) => {
           let ids
           let RolesDate
     
      try {
        ids = Rol ? Rol.map(Roles => ObjectId(Roles.id)) : []
         RolesDate = ids.length > 0
          ? await roles.find({ _id: { $in: ids } }          )
          : []
      
      } catch (error) {
        console.error(error)
      }

      return RolesDate
    }
  }
}
//





//


//Generando token

dotenv.config({ path: 'variables.env' });

const Query= {
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
//





//






//Generando token

const crearToken = (usuarioLogin, secreto, expiresIn) => {
  const {Usuario} = usuarioLogin;
  return jwt.sign ({Usuario}, secreto, {expiresIn});
};

const Mutation = {
  crearParametros:     (root, {input}) => {
    const Save_Data = new parametros ({
                                        Nombre:    input.Nombre,
                                        Valor:     input.Valor,
                                        Eliminado: 0
                                      });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearConfiguracion:  (root, {input}) => {
    const Save_Data = new configuraciones ({
                                             Nombre:    input.Nombre,
                                             Valor:     input.Valor,
                                             Eliminado: 0
                                           });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearListaDeValores: (root, {input}) => {
    const Save_Data = new ListaDeValores ({
                                            Nombre:    input.Nombre,
                                            Valor:     input.Valor,
                                            Eliminado: 0
                                          });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearClientes:       (root, {input}) => {
    const Save_Data = new clientes ({
                                      Nombre:       input.Nombre,
                                      Apellido:     input.Apellido,
                                      Edad:         input.Edad,
                                      Direccion:    input.Direccion,
                                      Dpi:          input.Dpi,
                                      Nit:          input.Nit,
                                      Sexo:         input.Sexo,
                                      Municipio:    input.Municipio,
                                      Departamento: input.Departamento,
                                      Responsable:  input.Responsable,
                                      Eliminado:    0
                                    });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  

  crearAsignacionCliente: (root, { input }) => {
		const Save_Data = new AsignacionCliente({
		Edificio:input.Edificio,
		Nivel:input.Nivel,
		Habitacion:input.Habitacion,
		FechaIngreso:input.FechaIngreso,
		FechaSalida:input.FechaSalida,
		Cliente:input.Cliente,
		Eliminado:0
		});
		Save_Data.id = Save_Data._id;

    for (let index = 0; index < input.Edificios.Estructura.length; index++) {
				for (let index1 = 0; index1 < input.Edificios.Estructura[index].Habitaciones.length; index1++) {
				if(input.Edificios.Estructura[index].Habitaciones[index1].Nombre==input.Habitacion)
      			{
					  input.Edificios.Estructura[index].Habitaciones[index1].Ocupados++;  
}
				}
		}
		
		return new Promise((resolve, object) => {
		
			console.log(input.Edificios.id)
    
      edificio.findOneAndUpdate({ _id:ObjectId(input.Edificios.id) }, input.Edificios, { new: true }, (error, edificio) => {
				if (error) rejects(error);
				else resolve(edificio);
			});


			Save_Data.save((error) => {
				if (error) rejects(error);
				else resolve("Cliente Asignado");
			});
		});
	},
  crearResponsables:       (root, {input}) => {
    const Save_Data = new clientes ({
                                      Nombre:       input.Nombre,
                                      Apellido:     input.Apellido,
                                      Edad:         input.Edad,
                                      Direccion:    input.Direccion,
                                      Dpi:          input.Dpi,
                                      Nit:          input.Nit,
                                      Sexo:         input.Sexo,
                                      Municipio:    input.Municipio,
                                      Departamento: input.Departamento,
                                      Responsable:  1,
                                      Eliminado:    0,
                                    });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  
  crearEdificio:                (root, {input}) => {
    const Save_Data = new edificio ({
                                      Nombre:     input.Nombre,
                                      Latitud:    input.Latitud,
                                      Longitud:   input.Longitud,
                                      Estructura: input.Estructura,
                                      Eliminado:  0
                                    });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearBitacora:                (root, {input}) => {
    const Save_Data = new bitacora ({
                                      Evento:    input.Evento,
                                      Documento: input.Documento,
                                      UsuarioId: input.UsuarioId,
                                      Fecha:     input.Fecha,
                                      Pagina:    input.Pagina,
                                      Data:      input.Data
                                    });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearBitacoraSesion:          (root, {input}) => {
    const Save_Data = new bitacoraSesion ({
                                            UsuarioId:   input.UsuarioId,
                                            FechaInicio: input.FechaInicio,
                                            FechaCierre: input.FechaCierre
                                          });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearPacientes:               (root, {input}) => {
    const Save_Data = new pacientes ({
                                       Nombre:       input.Nombre,
                                       Apellido:     input.Apellido,
                                       Edad:         input.Edad,
                                       Direccion:    input.Direccion,
                                       Dpi:          input.Dpi,
                                       Nit:          input.Nit,
                                       Sexo:         input.Sexo,
                                       Municipio:    input.Municipio,
                                       Departamento: input.Departamento,
                                       Estado:       input.Estado,
                                       ClienteId:    input.ClienteId,
                                       Hospital:     input.hospital,
                                       Sala:         input.Sala,
                                       Habitacion:   input.Habitacion,
                                       FechaIngreso: input.FechaIngreso,
                                       FechaSalida:  input.FechaSalida,
                                       Eliminado:    0
                                     });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearHospital:                (root, {input}) => {
    const Save_Data = new hospital ({
                                      Nombre:      input.Nombre,
                                      Descripcion: input.Descripcion,
                                      Latitud:     input.Latitud,
                                      Longitud:    input.Longitud,
                                      Eliminado:   0
                                    });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearProductos:               (root, {input}) => {
    const Save_Data = new productos ({
                                       Nombre:        input.Nombre,
                                       Descripcion:   input.Descripcion,
                                       SKU:           input.SKU,
                                       CodigoBarra:   input.CodigoBarra,
                                       Clasificacion: input.Clasificacion,
                                       Tipo:          input.Tipo,
                                       Precio:        input.Precio,
                                       Cantidad:      input.Cantidad,
                                       Eliminado:     0
                                     });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearHistorialProductos:      (root, {input}) => {
    const Save_Data = new historialProductos ({
                                                ProductoId: input.ProductoId,
                                                Fecha:      input.Fecha,
                                                Cantidad:   input.Cantidad,
                                                Precio:     input.Precio
                                              });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearEntradaSalidaInventario: (root, {input}) => {
    const Save_Data = new entradaSalidaInventario ({
                                                     DonacionId:  input.DonacionId,
                                                     UsuarioId:   input.UsuarioId,
                                                     Productos:   input.Productos,
                                                     Responsable: input.Responsable,
                                                     Tipo:        input.Tipo,
                                                     Fecha:       input.Fecha,
                                                     Estado:      input.Estado,
                                                     Total:       input.Total
                                                   });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      const {Estado} = input;
      const {Tipo}   = input;
      
      if (Estado === 'APROBADO') {
        let instruccion;
        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }
        
        Save_Data.Productos.forEach ((producto) => {
          console.log (producto);
          productos.updateOne (
             {_id: ObjectId (producto.id)},
             {
               $inc: {Cantidad: `${ instruccion }${ producto.Cantidad }`}
             },
             function(error) {
               if (error) return new Error (error);
             }
          );
        });
      }
      
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearAsignacionPacientes: (root, {input}) => {
    const Save_Data = new asignarPaciente ({
                                                     Hospitales:   input.Hospitales,
                                                     Clientes:   input.Clientes,
                                                     Pacientes: input.Pacientes,
                                                     Fecha:        input.Fecha,
                                                     FechaSalida:        input.FechaSalida,
                                                     Eliminado:0,
                                                     Estado:       input.Estado,
                                                     Observaciones:      input.Observaciones
                                                   });
    Save_Data.id    = Save_Data._id;

    console.log(Save_Data.Eliminado)
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearDonacion:                (root, {input}) => {
    const Save_Data = new donacion ({
                                      UsuarioId:   input.UsuarioId,
                                      Responsable: input.Responsable,
                                      Donante:     input.Donante,
                                      Tipo:        input.Tipo,
                                      Fecha:       input.Fecha,
                                      Estado:      input.Estado,
                                      Cantidad:    input.Cantidad
                                    });
    Save_Data.id    = Save_Data._id;
    return new Promise ((resolve, object) => {
        let instruccion = '+';

        if(input.Tipo === 1){
            cajaChica.updateOne({}, {
                    $inc: {Cantidad: `${instruccion}${input.Cantidad}`}
                },
                function(error){
                    if(error) return new Error(error);
                }
            );
        }
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearCajaChica:               (root, {input}) => {
    const Save_Data = new cajaChica ({
                                       Cantidad: input.Cantidad,
                                       Fecha:    input.Fecha
                                     });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearEntradaSalidaCajaChica:  (root, {input}) => {
    const Save_Data = new entradaSalidaCajaChica ({
                                                    DonacionId:  input.DonacionId,
                                                    UsuarioId:   input.UsuarioId,
                                                    Responsable: input.Responsable,
                                                    Cantidad:    input.Cantidad,
                                                    Tipo:        input.Tipo,
                                                    Fecha:       input.Fecha,
                                                    Estado:      input.Estado
                                                  });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      const {Estado}   = input;
      const {Tipo}     = input;
      const {Cantidad} = input;
      
      if (Estado === 'APROBADO') {
        let instruccion;
        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }
        
        cajaChica.updateOne (
           {},
           {
             $inc: {Cantidad: `${ instruccion }${ Cantidad }`}
           },
           function(error) {
             if (error) return new Error (error);
           }
        );
      }
      
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  crearHistorialCajaChica:      (root, {input}) => {
    const Save_Data = new historialCajaChica ({
                                                Cantidad: input.Cantidad,
                                                Fecha:    input.Fecha
                                              });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (Save_Data);
      });
    });
  },
  actualizarListaDeValores:     (root, {input}) => {
    return new Promise ((resolve, object) => {
      ListaDeValores.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, lista) => {
        if (error) rejects (error);
        else resolve (lista);
      });
    });
  },
  
  crearUsuarios:     async (root, {input}) => {
    const {Usuario} = input;
    const existe    = await usuarios.findOne ({Usuario});
    
    if (existe) {
      throw new Error ('El usuario ya existe');
    }
    const Save_Data = new usuarios ({
                                      Usuario:   input.Usuario,
                                      Nombre:    input.Nombre,
                                      Password:  input.Password,
                                      Rol:       input.Rol,
                                      Eliminado: 0
                                    });
    
    // return(`El Usuario fue creado con exito`)
    
    Save_Data.id = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (`El Usuario fue creado con exito`);
      });
    });
  },
  autenticarUsuario: async (root, {usuario, password}) => {
    const nombreUsuario = await usuarios.findOne ({Usuario: usuario, Eliminado:0});
    if (!nombreUsuario) {
      throw new Error ('Usuario no encontrado');
    }
    
    const passwordCorrecto = await bcrypt.compare (password, nombreUsuario.Password);
    //si el password es incorrecto
    if (!passwordCorrecto) {
      throw new Error ('Password Incorrecto');
    }
    // console.log( crearToken(nombreUsuario, process.env.SECRETO, '1hr'))
    return {
      token: crearToken (nombreUsuario, process.env.SECRETO, '1hr')
    };
  },
  crearRoles:        async (root, {input}) => {
    const {Nombre} = input;
    const existe   = await roles.findOne ({Nombre});
    
    if (existe) {
      throw new Error ('El rol ya existe');
    }
    
    const Save_Data = new roles ({
                                   Nombre:      input.Nombre,
                                   Descripcion: input.Descripcion,
                                   Permiso:     input.Permiso,
                                   Eliminado:   0
                                 });
    
    Save_Data.id = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (`El Rol fue creado con exito`);
      });
    });
  },
  
  AgregarPermisos: async (root, {input}) => {
    // // const existe = ? await roles.find({ Permiso:{_id:input.Permiso._id} });
    
    // console.log("veamos si existeis 234234")
    
    // const ids = input.Permiso ? input.Permiso.map(Permiso => ObjectId(Permiso.id)) : []
    
    // const Data = ids.length > 0
    //  ? await roles.find({ "Permiso.id": { $in: ids } }          )
    //  : []
    
    //  console.log("veamos si existeis 234234",ids)
    
    return new Promise ((resolve, object) => {
      roles.update ({_id: input.id}, {$set: {Permiso: input.Permiso}}, (error, usuarios) => {
        if (error) rejects (error);
        else resolve (usuarios);
      });
    });
  },
  
  crearPermisos: async (root, {input}) => {
    const {Nombre} = input;
    const existe   = await permisos.findOne ({Nombre});
    
    if (existe) {
      throw new Error ('El permiso ya existe');
    }
    
    const Save_Data = new permisos ({
                                      Nombre:      input.Nombre,
                                      Descripcion: input.Descripcion,
                                      URL:         input.URL,
                                      Menu:        input.Menu,
                                      Activo:      input.Activo,
                                      Opcion:      input.Opcion,
                                      Eliminado:   0
                                    });
    Save_Data.id    = Save_Data._id;
    
    return new Promise ((resolve, object) => {
      Save_Data.save ((error) => {
        if (error) rejects (error);
        else resolve (`El Permiso fue creado con exito`);
      });
    });
  },
  
  actualizarCliente: (root, {input}) => {
    return new Promise ((resolve, object) => {
      clientes.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, cliente) => {
        if (error) rejects (error);
        else resolve (cliente);
      });
    });
  },
  actualizarResponsable: (root, {input}) => {
    return new Promise ((resolve, object) => {
      clientes.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, cliente) => {
        if (error) rejects (error);
        else resolve (cliente);
      });
    });
  },
  
  actualizarEdificio: (root, {input}) => {
    return new Promise ((resolve, object) => {
      edificio.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, edificio) => {
        if (error) rejects (error);
        else resolve (edificio);
      });
    });
  },
  
  actualizarBitacora: (root, {input}) => {
    return new Promise ((resolve, object) => {
      bitacora.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, bitacora) => {
        if (error) rejects (error);
        else resolve (bitacora);
      });
    });
  },
  
  actualizarBitacoraSesion: (root, {input}) => {
    return new Promise ((resolve, object) => {
      bitacoraSesion.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, bitacoraS) => {
        if (error) rejects (error);
        else resolve (bitacoraS);
      });
    });
  },
  
  actualizarPacientes: (root, {input}) => {
    return new Promise ((resolve, object) => {
      pacientes.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, pacientes) => {
        if (error) rejects (error);
        else resolve (pacientes);
      });
    });
  },
  
  actualizarHospital: (root, {input}) => {
    return new Promise ((resolve, object) => {
      hospital.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, hospital) => {
        if (error) rejects (error);
        else resolve (hospital);
      });
    });
  },
  
  actualizarProductos: (root, {input}) => {
    return new Promise ((resolve, object) => {
      productos.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, productos) => {
        if (error) rejects (error);
        else resolve (productos);
      });
    });
  },
  
  actualizarHistorialProductos: (root, {input}) => {
    return new Promise ((resolve, object) => {
      pistorialProductos.findOneAndUpdate (
         {_id: input.id},
         input,
         {new: true},
         (error, historialproductos) => {
           if (error) rejects (error);
           else resolve (historialproductos);
         }
      );
    });
  },
  
  actualizarEntradaSalidaInventario: (root, {input}) => {
    return new Promise ((resolve, object) => {
      
      const {Estado} = input;
      const {Tipo}   = input;
      
      if (Estado === 'APROBADO') {
        let instruccion;
        
        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }
        
        input.Productos.forEach ((producto) => {
          productos.updateOne (
             {_id: ObjectId (producto.id)},
             {
               $inc: {Cantidad: `${ instruccion }${ producto.Cantidad }`}
             },
             function(error) {
               if (error) return new Error (error);
             }
          );
        });
      }
      
      entradaSalidaInventario.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, esinventario) => {
        if (error) rejects (error);
        else resolve (esinventario);
      });
    });
  },
  
  actualizarDonacion: (root, {input}) => {
    return new Promise ((resolve, object) => {
      donacion.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, donacion) => {
        if (error) rejects (error);
        else resolve (donacion);
      });
    });
  },
  
  actualizarCajaChica: (root, {input}) => {
    return new Promise ((resolve, object) => {
      cajaChica.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, cajachica) => {
        if (error) rejects (error);
        else resolve (cajachica);
      });
    });
  },
  
  actualizarEntradaSalidaCajaChica: (root, {input}) => {
    return new Promise ((resolve, object) => {
      const {Estado}   = input;
      const {Tipo}     = input;
      const {Cantidad} = input;
      
      if (Estado === 'APROBADO') {
        let instruccion;
        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }
        
        cajaChica.updateOne (
           {},
           {
             $inc: {Cantidad: `${ instruccion }${ Cantidad }`}
           },
           function(error) {
             if (error) return new Error (error);
           }
        );
      }
      
      entradaSalidaCajaChica.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, escajachica) => {
        if (error) rejects (error);
        else resolve (escajachica);
      });
    });
  },
  
  actualizarHistorialCajaChica: (root, {input}) => {
    return new Promise ((resolve, object) => {
      historialCajaChica.findOneAndUpdate (
         {_id: input.id},
         input,
         {new: true},
         (error, historialcajachica) => {
           if (error) rejects (error);
           else resolve (historialcajachica);
         }
      );
    });
  },
  
  actualizarRoles: (root, {input}) => {
    return new Promise ((resolve, object) => {
      roles.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, rol) => {
        if (error) rejects (error);
        else resolve (rol);
      });
    });
  },
  
  actualizarPermisos: (root, {input}) => {
    return new Promise ((resolve, object) => {
      permisos.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, permisos) => {
        if (error) rejects (error);
        else resolve (permisos);
      });
    });
  },
  
  actualizarUsuarios: async (root, {input}) => {
    
    const nombreUsuario = await usuarios.findOne({Password: input.Password });
    
if(!nombreUsuario)
  {  
      bcrypt.genSalt (10, (err, salt) => {
      if (err) return next (err);
      bcrypt.hash (input.Password, salt, (err, hash) => {
        if (err) return next (err);
        input.Password = hash;
        return new Promise ((resolve, object) => {
          usuarios.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, usuarios) => {
            if (error) rejects (error);
            else resolve (usuarios);
          });
        });
      });
    });
  }else{
    return new Promise ((resolve, object) => {
      usuarios.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, usuarios) => {
        if (error) rejects (error);
        else resolve (usuarios);
      });
    });
  }
    // else
    // { return new Promise ((resolve, object) => {
    //   usuarios.findOneAndUpdate ({_id: input.id}, input, {new: true}, (error, usuarios) => {
    //     if (error) rejects (error);
    //     else resolve (usuarios);
    //   });
    // });}


  
  },
  
  eliminarParametros:              (root, {id}) => {
    return new Promise ((resolve, object) => {
      parametros.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Parametros');
      });
    });
  },
  eliminarConfiguracion:           (root, {id}) => {
    return new Promise ((resolve, object) => {
      configuracion.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Configuracion');
      });
    });
  },
  eliminarListaDeValores:          (root, {id}) => {
    return new Promise ((resolve, object) => {
      ListaDeValores.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el ListaDeValores');
      });
    });
  },
  eliminarClientes:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      clientes.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Clientes');
      });
    });
  },
  eliminarResponsables:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      clientes.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Clientes');
      });
    });
  },
  eliminarEdificio:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      edificio.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Edificio');
      });
    });
  },
  eliminarBitacora:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      bitacora.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Bitacora');
      });
    });
  },
  eliminarBitacoraSesion:          (root, {id}) => {
    return new Promise ((resolve, object) => {
      bitacoraSesion.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el BitacoraSesion');
      });
    });
  },
  eliminarPacientes:               (root, {id}) => {
    return new Promise ((resolve, object) => {
      pacientes.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Pacientes');
      });
    });
  },
  eliminarHospital:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      hospital.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Hospital');
      });
    });
  },
  eliminarProductos:               (root, {id}) => {
    return new Promise ((resolve, object) => {
      productos.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Productos');
      });
    });
  },
  eliminarHistorialProductos:      (root, {id}) => {
    return new Promise ((resolve, object) => {
      historialProductos.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el HistorialProductos');
      });
    });
  },
  eliminarEntradaSalidaInventario: (root, {id}) => {
    return new Promise ((resolve, object) => {
      entradaSalidaInventario.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el EntradaSalidaInventario');
      });
    });
  },
  eliminarDonacion:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      donacion.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Donacion');
      });
    });
  },
  eliminarCajaChica:               (root, {id}) => {
    return new Promise ((resolve, object) => {
      cajaChica.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el CajaChica');
      });
    });
  },
  eliminarEntradaSalidaCajaChica:  (root, {id}) => {
    return new Promise ((resolve, object) => {
      entradaSalidaCajaChica.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el EntradaSalidaCajaChica');
      });
    });
  },
  eliminarHistorialCajaChica:      (root, {id}) => {
    return new Promise ((resolve, object) => {
      historialCajaChica.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el HistorialCajaChica');
      });
    });
  },
  eliminarRoles:                   (root, {id}) => {
    return new Promise ((resolve, object) => {
      rol.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Rol');
      });
    });
  },
  eliminarPermisos:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      permisos.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Permisos');
      });
    });
  },
  eliminarUsuarios:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      usuarios.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se al eliminado correctamente el Usuarios');
      });
    });
  },
  eliminarAsignacionPaciente:                (root, {id}) => {
    return new Promise ((resolve, object) => {
      asignarPaciente.findByIdAndUpdate ({_id: id}, {$set: {Estado: 'NO ASIGNADO', FechaSalida: new Date()}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se a eliminado correctamente la asiganacion al paciente');
      });
    });
  },
  eliminarAsignacionCliente:          async      (root, {id,Edificio,Nivel,Habitacion}) => {

    const existeedificio =  await edificio.findOne({ Nombre:Edificio });
    
    return new Promise ((resolve, object) => {

  
    for (let index = 0; index < existeedificio.Estructura.length; index++) {
      for (let index1 = 0; index1 < existeedificio.Estructura[index].Habitaciones.length; index1++) {
      if(existeedificio.Estructura[index].Habitaciones[index1].Nombre==Habitacion)
          {
            existeedificio.Estructura[index].Habitaciones[index1].Ocupados--;  

}
      }
  } 



      edificio.findOneAndUpdate({ _id:ObjectId(existeedificio.id) }, existeedificio, { new: true }, (error, edificio) => {
        if (error) rejects(error);
        else resolve(edificio);
      });

      

      AsignacionCliente.findByIdAndUpdate ({_id: id}, {$set: {Eliminado: 1}}, (error, resultado) => {
        if (error) rejects (error);
        else resolve ('Se a eliminado correctamente la asiganacion cliente');
      });
    });
  }
  // actualizarCliente: (root, { input }) => {
  // 	return new Promise((resolve, object) => {
  // 		Clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, cliente) => {
  // 			if (error) rejects(error);
  // 			else resolve(cliente);
  // 		});
  // 	});
  // },
  // elimnarCliente: (root, { id }) => {
  // 	return new Promise((resolve, object) => {
  // 		Clientes.findOneAndDelete({ _id: id }, (error) => {
  // 			if (error) rejects(error);
  // 			else resolve('El Cliente se Eliminó Correctamente');
  // 		});
  // 	});
  // },
  // nuevoProducto: (root, { input }) => {
  // 	const nuevoProducto = new Productos({
  // 		nombre: input.nombre,
  // 		precio: input.precio,
  // 		stock: input.stock
  // 	});
  
  // 	nuevoProducto.id = nuevoProducto._id;
  
  // 	return new Promise((resolve, object) => {
  // 		nuevoProducto.save((error) => {
  // 			if (error) rejects(error);
  // 			else resolve(nuevoProducto);
  // 		});
  // 	});
  // },
  // actualizarProducto: (root, { input }) => {
  // 	return new Promise((resolve, producto) => {
  // 		Productos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, producto) => {
  // 			if (error) rejects(error);
  // 			else resolve(producto);
  // 		});
  // 	});
  // },
  // elimnarProducto: (root, { id }) => {
  // 	return new Promise((resolve, producto) => {
  // 		Productos.findOneAndDelete({ _id: id }, (error) => {
  // 			if (error) rejects(error);
  // 			else resolve('El Prodcuto se Eliminó Correctamente');
  // 		});
  // 	});
  // },
  // nuevoPedido: (root, { input }) => {
  // 	const nuevoPedido = new Pedidos({
  // 		pedido: input.pedido,
  // 		total: input.total,
  // 		fecha: new Date(),
  // 		cliente: input.cliente,
  // 		estado: "PENDIENTE",
  // 		vendedor:input.vendedor
  // 	});
  // 	nuevoPedido.id=nuevoPedido._id;
  
  // 	return new Promise((resolve,object)=>{
  
  // 		nuevoPedido.save((error)=>{
  // 			if(error) rejects(error)
  // 			else resolve(nuevoPedido)
  // 		})
  // 	})
  
  // },
  // actualizarEstado:(root,{input})=>{
  // 	return new Promise((resolve,object)=>
  // 	{
  
  // 	//recorrer y  actulizar la cantidad de productos en base al estado del pedido
  
  // 	const {estado}=input;
  // 	let instruccion;
  // 	if(estado==='COMPLETADO'){
  // 		instruccion='-';
  // 	}else if(estado==='CANCELADO'){
  // 		instruccion='+';
  // 	}
  
  // 	input.pedido.forEach(pedido => {
  // 		Productos.updateOne({_id:pedido.id},
  // 			{ "$inc":
  // 				{ "stock":`${instruccion}${pedido.cantidad }`}
  // 			},function(error,){
  // 				if(error) return new Error(error)
  // 			}
  // 		)
  // 	});
  
  // 		Pedidos.findOneAndUpdate({_id:input.id},input,{new :true},(error) =>{
  // 				if(error)rejects(error);
  // 				else resolve("Se actualizó correctamente")
  // 		})
  // 	}
  // 	)
  
  // }
  // ,
  // crearUsuario: async (root, { usuario,nombre, password,rol }) => {
  // 	//revisando si un usuario contiene este password
  // 	const existeUsuario = await Usuarios.findOne({ usuario });
  
  // 	if (existeUsuario) {
  // 		throw new Error('El usuario ya existe');
  // 	}
  // 	const nuevoUsuario = await new Usuarios({
  // 		usuario,
  // 		nombre,
  // 		password,
  // 		rol
  // 	}).save();
  // 	return 'Creado correctamente';
  // },
  // autenticarUsuario: async (root, { usuario, password }) => {
  // 	const nombreUsuario = await Usuarios.findOne({ usuario });
  // 	if (!nombreUsuario) {
  // 		throw new Error('Usuario no encontrado');
  // 	}
  
  // 	const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password);
  // 	//si el password es incorrecto
  // 	if (!passwordCorrecto) {
  // 		throw new Error('Password Incorrecto');
  // 	}
  
  // 	return {
  // 		token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
  // 	};
  // }
};


//


const app=express();

app.use(express.static(path.join(__dirname, 'cliente/build')));


const server = new ApolloServer({
    typeDefs,
    
		Mutation,
		Query,
		...types
	,
    context:async ({req})=>{
        //obtener el token del servidor
        const token=req.headers['authorization'];

        if(token !=="null"){
            try {
                // Verificar el token del front end (cliente)
                const usuarioActual=await jwt.verify(token,process.env.SECRETO);
                // agregamos el usuario actual al request

                req.usuarioActual=usuarioActual;
                return{
                    usuarioActual
                };

            } catch (err) {
                // console.log(err);
            }

        }
    }
  });
  
  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/cliente/build/index.html'));
});
  

const port = process.env.PORT || 4000;
server.applyMiddleware({app});
app.listen({port},()=>console.log(`El servidor esta corriendo http://localhost:${port}${server.graphqlPath}`));
