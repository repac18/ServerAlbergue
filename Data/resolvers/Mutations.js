import mongoose  from 'mongoose';

import {
  parametros,
  configuraciones,
  ListaDeValores,
  clientes,
  edificio,
  bitacora,
  bitacoraSesion,
  pacientes,
  hospital,
  productos,
  historialProductos,
  entradaSalidaInventario,
  donacion,
  cajaChica,
  entradaSalidaCajaChica,
  roles,
  permisos,
  historialCajaChica,
  usuarios,
  AsignacionCliente, asignarPaciente } from '../Conexion/db';

import {rejects} from 'assert';
import bcrypt    from 'bcrypt';

const ObjectId = mongoose.Types.ObjectId;

//Generando token
import dotenv from 'dotenv';

dotenv.config ({path: 'variables.env'});

import jwt from 'jsonwebtoken';

const crearToken = (usuarioLogin, secreto, expiresIn) => {
  const {Usuario} = usuarioLogin;
  return jwt.sign ({Usuario}, secreto, {expiresIn});
};

export const Mutation = {
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
