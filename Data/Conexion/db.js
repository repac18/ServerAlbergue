import mongoose, {Schema, model} from 'mongoose';
import bcrypt                    from 'bcrypt';
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

export {
  parametros, configuraciones, ListaDeValores, clientes, edificio, bitacora,
  bitacoraSesion, pacientes, hospital, productos, historialProductos, entradaSalidaInventario, donacion,
  cajaChica, entradaSalidaCajaChica, roles, permisos, historialCajaChica, usuarios, asignarPaciente,AsignacionCliente};
