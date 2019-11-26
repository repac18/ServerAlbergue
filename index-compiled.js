'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('@babel/polyfill');

var _apolloServerExpress = require('apollo-server-express');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _assert = require('assert');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _os = require('os');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// graphql

var typeDefs = 'type Parametros {\r\n    id:ID\r\n    Nombre: String\r\n    Valor: String\r\n    Eliminado: Int\r\n}\r\ntype Configuraciones  {\r\n    id:ID\r\n    Nombre: String\r\n    Valor: [ConfiguracionesValor]\r\n    Eliminado: Int\r\n}\r\ntype AsignacionCliente {\r\n        id:ID\r\n        Edificio:String\r\n        Nivel:String\r\n        Habitacion:String\r\n        Cliente:String\r\n        FechaIngreso:String\r\n        FechaSalida:String\r\n        Eliminado: Int\r\n}\r\ntype ConfiguracionesValor  {\r\n    Nombre: String\r\n    Valor: String\r\n}\r\ntype ListaDeValores  {\r\n    id:ID\r\n    Nombre: String\r\n    Valor: [ListaDeValoresValor]\r\n    Eliminado: Int\r\n}\r\ntype  ListaDeValoresValor {\r\n    Nombre: String\r\n    Valor:String\r\n}\r\ntype Clientes {\r\n    id:ID\r\n    Nombre: String\r\n    Apellido:String\r\n    Edad: Int\r\n    Direccion: String\r\n    Dpi: String\r\n    Nit: String\r\n    Sexo: String\r\n    Municipio: String\r\n    Departamento: String\r\n    Eliminado:Int\r\n    Responsable:Int\r\n}\r\ntype Edificio  {\r\n    id:ID\r\n    Nombre:String\r\n    Latitud:String\r\n    Longitud:String\r\n    Estructura: [Nivel]\r\n    Eliminado: Int\r\n}\r\ntype Nivel {\r\n    Nombre:String\r\n    Nivel:Int\r\n    Habitaciones:[Habitacion]\r\n}\r\ntype Habitacion {\r\n     Nombre: String\r\n     Habitacion: Int\r\n     Capacidad: Int\r\n      Ocupados:Int\r\n}\r\ntype Bitacora  {\r\n    id:ID\r\n    Evento:String\r\n    Documento:String\r\n    UsuarioId:ID\r\n    Fecha:String\r\n    Pagina:String\r\n    Data:[BitacoraData]\r\n}\r\ntype  BitacoraData {\r\n    Nombre: String\r\n    Data:String\r\n}\r\ntype BitacoraSesion {\r\n    id:ID\r\n    UsuarioId:ID\r\n    FechaInicio:String\r\n    FechaCierre:String\r\n}\r\ntype Pacientes {\r\n    id:ID\r\n    Nombre: String\r\n    Apellido: String\r\n    Edad: Int\r\n    Direccion:String\r\n    Dpi:String\r\n    Nit:String\r\n    Sexo:String\r\n    Municipio:String\r\n    Departamento:String\r\n    Eliminado: Int\r\n}\r\ntype Hospital {\r\n    id:ID\r\n    Nombre:String\r\n    Descripcion:String\r\n    Latitud:String\r\n    Longitud:String\r\n    Eliminado: Int\r\n}\r\ntype Productos {\r\n    id:ID\r\n    Nombre:String\r\n    Descripcion:String\r\n    SKU: String\r\n    CodigoBarra:String\r\n    Clasificacion:String\r\n    Tipo:String\r\n    Cantidad: Int\r\n    Precio: Int\r\n    Eliminado: Int\r\n}\r\ntype HistorialProductos {\r\n    id:ID\r\n    ProductoId: ID\r\n    Fecha: String\r\n    Cantidad: Int\r\n    Precio: Int\r\n}\r\ntype EntradaSalidaInventario {\r\n    id:ID\r\n    DonacionId: ID,\r\n    UsuarioId: ID\r\n    Productos: [Productos]\r\n    Responsable: String\r\n    Tipo:Int\r\n    Fecha:String\r\n    Estado:String\r\n    Total:Int\r\n}\r\ntype AsignarPaciente {\r\n       id:ID\r\n    Hospitales:String\r\n    Clientes:[Clientes]\r\n    Pacientes: [Pacientes]\r\n    Fecha: String\r\n    Estado: String\r\n    FechaSalida:String\r\n    Eliminado:Int\r\n    Observaciones:String\r\n}\r\ntype Donacion  {\r\n    id: ID\r\n    UsuarioId:ID\r\n    Responsable: String\r\n    Donante: String\r\n    Tipo:Int\r\n    Fecha:String\r\n    Estado:String\r\n    Cantidad:Int\r\n}\r\ntype CajaChica  {\r\n    id:ID\r\n    Cantidad: Int\r\n    Fecha:String\r\n}\r\ntype EntradaSalidaCajaChica  {\r\n    id:ID\r\n    DonacionId: ID\r\n    UsuarioId: ID\r\n    Responsable: String\r\n    Cantidad: Int\r\n    Tipo:Int\r\n    Fecha:String\r\n    Estado:String\r\n}\r\ntype HistorialCajaChica  {\r\n    id:ID\r\n    Cantidad: Int\r\n    Fecha:String\r\n}\r\ntype Token {\r\n    token:String!\r\n}\r\ntype Usuarios {\r\n    id: ID\r\n    Usuario: String\r\n    Nombre: String\r\n    Password: String\r\n    Rol: [Roles]\r\n    Eliminado: Int\r\n}\r\ntype Roles {\r\n    id: ID\r\n    Nombre: String\r\n    Descripcion: String\r\n    Permiso: [Permisos]\r\n    Eliminado: Int\r\n}\r\ntype Permisos {\r\n    id: ID\r\n    Nombre: String\r\n    Descripcion: String\r\n    URL:String\r\n    Menu:String\r\n    Activo: Boolean\r\n    Opcion:[Opciones]\r\n    Eliminado: Int\r\n}\r\ntype Opciones {\r\n    id: ID\r\n    Nombre: String\r\n    Descripcion: String\r\n    Activo: Boolean\r\n    Eliminado: Int\r\n}\r\ntype Edi {\r\nEdificio:String\r\nNivel:String\r\nHabitacion:String\r\n}\r\ntype asigClier1 {\r\nTotal:Float\r\n_id:String\r\n}\r\ntype asigClier2 {\r\nTotal:Float\r\n_id:String  \r\n}\r\ntype asigpas {\r\nFecha:String\r\nEstado:String\r\n}\r\ntype asigpas1 {\r\nTotal:Float\r\n_id:String\r\n}\r\ntype asigpas2 {\r\nTotal:Float\r\n_id:[Clientes]\r\n}\r\ntype Municipios {\r\n    Municipio:String\r\n}\r\ntype producr1 {\r\nTotal:Float\r\n_id:String\r\n}\r\ntype donacior1 {\r\nTotal:Float\r\n_id:String\r\n}\r\ntype donacior {\r\n   Tipo:String\r\n   id:String\r\n}type Query {\r\n    """Seleccionar todos los parametros"""\r\n    getparametros(limit:Int, Offset: Int):[Parametros]\r\n    """Seleccionar un parametro por id"""\r\n    getParametro(id:ID): Parametros\r\n    """Seleccionar todas las configuraciones"""\r\n    getConfiguraciones(limit:Int, Offset:Int):[Configuraciones]\r\n    """Seleccionar solo una configuracion por id"""\r\n    getConfiguracion(id:ID): Configuraciones\r\n    """Seleccionar todas las listas de valores"""\r\n    getListaDeValores(limit:Int, Offset:Int):[ListaDeValores]\r\n    """Seleccionar una sola lista de valores por id"""\r\n    getListaDeValor(id:ID): ListaDeValores\r\n \r\n  """Seleccionar todas las listas de valores"""\r\n    getAsignacionClientes(limit:Int, Offset:Int):[AsignacionCliente]\r\n    """Seleccionar una sola lista de valores por id"""\r\n    getAsignacionCliente(id:ID): AsignacionCliente\r\n    """Seleccionar todos los clientes"""    \r\n    getclientes(limit:Int, Offset:Int):[Clientes]\r\n    """Seleccionar un cliente por su id"""\r\n    getCliente(id:ID): Clientes\r\n    """seleccionar responsables"""\r\n    getresponsables(limit:Int,Offset:Int):[Clientes]\r\n    """select responsable"""\r\n    getResponsable(id:ID):Clientes\r\n    """Seleccionar todos los edificios"""\r\n    getedificios(limit:Int, Offset:Int):[Edificio]\r\n    """Seleccionar un edificio por su id"""\r\n    getedificio(id:ID): Edificio\r\n    """Seleccionar todas las bitacoras"""\r\n    getbitacoras(limit:Int, Offset:Int):[Bitacora]\r\n    """Seleccionar una bitacora por su id"""\r\n    getbitacora(id:ID): Bitacora\r\n    """Seleccionar todas las bitacoras de sesion"""\r\n    getbitacoraSesiones(limit:Int, Offset:Int):[BitacoraSesion]\r\n    """Seleccionar una bitacora de sesion por su id"""\r\n    getbitacoraSesion(id:ID): BitacoraSesion\r\n    """Seleccionar todos los pacientes"""\r\n    getpacientes(limit:Int, Offset:Int):[Pacientes]\r\n    """Seleccionar un paciente por su id"""\r\n    getpaciente(id:ID): Pacientes\r\n    """Seleccionar todos los hospitales"""\r\n    getHospitales(limit:Int, Offset:Int):[Hospital]\r\n    """Seleccionar un hospital por id"""\r\n    getHospital(id:ID): Hospital\r\n    """Seleccionar todos los productos"""\r\n    getproductos(limit:Int, Offset:Int):[Productos]\r\n    """Seleccionar un producto por su id"""\r\n    getproducto(id:ID): Productos\r\n    """Seleccionar todos los historiales de productos"""\r\n    gethistorialProductos(limit:Int, Offset:Int):[HistorialProductos]\r\n    """Seleccionar un historial de producto por su id"""\r\n    gethistorialProducto(id:ID): HistorialProductos\r\n    """Seleccionar todas las entradas y salidas de inventarios"""\r\n    getentradaSalidaInventarios(limit:Int, Offset:Int):[EntradaSalidaInventario]\r\n    """Seleccionar una entrada o salida de inventario por su id"""\r\n    getentradaSalidaInventario(id:ID): EntradaSalidaInventario\r\n    """Seleccionar todas las donaciones"""\r\n    getdonaciones(limit:Int, Offset:Int):[Donacion]\r\n    """Seleccionar una donacion por su id"""\r\n    getdonacion(id:ID): Donacion\r\n    """Seleccionar todas las cajas chica"""\r\n    getcajaChicas(limit:Int, Offset:Int):[CajaChica]\r\n    """Seleccionar una caja chica por su id"""\r\n    getcajaChica(id:ID): CajaChica\r\n    """Seleccionar todas las entradas y salidas de caja chica"""\r\n    getentradaSalidaCajaChicas(limit:Int, Offset:Int):[EntradaSalidaCajaChica]\r\n    """Seleccionar una entrada o salida de caja chica por su id"""\r\n    getentradaSalidaCajaChica(id:ID): EntradaSalidaCajaChica\r\n    """Seleccionar todos los historiales de caja chica"""\r\n    gethistorialCajaChicas(limit:Int, Offset:Int):[HistorialCajaChica]\r\n    """Seleccionar un historial de caja chica por su id"""\r\n    gethistorialCajaChica(id:ID): HistorialCajaChica\r\n    """Seleccionar todos los roles"""\r\n    getroles(limit:Int, Offset:Int):[Roles]\r\n    """Seleccionar un rol por su id"""\r\n    getrol(id:ID): Roles\r\n    """Seleccionar todos los permisos"""\r\n    getpermisos(limit:Int, Offset:Int):[Permisos]\r\n    """Seleccionar un permiso por su id"""\r\n    getpermiso(id:ID): Permisos\r\n    """Seleccionar todos los usuarios"""\r\n    getusuarios(limit:Int, Offset:Int):[Usuarios]\r\n    """Seleccionar un usuario por su id"""\r\n    getusuario(id:ID): Usuarios\r\n    """Seleccionar todos los AsignarPaciente"""\r\n        getasignacionpacientes(limit:Int, Offset:Int):[AsignarPaciente]\r\n    """Seleccionar un AsignarPaciente por su id"""\r\n        getasignacionpaciente(id:ID): AsignarPaciente\r\n   \r\n    obtenerUsuario:Usuarios \r\nreportesasigClier1(id:ID):[asigClier1]\r\nreportesasigClier2(id:ID):[asigClier2]\r\nreportesasigpas1(id:ID):[asigpas1]\r\nreportesasigpas2(id:ID):[asigpas2]\r\nreportesproducr1(id:ID):[producr1]\r\nreportesdonacior1(id:ID):[donacior1]\r\n}input Parametrosinput {\r\n    id:ID\r\n    Nombre: String\r\n    Valor: String\r\n    Eliminado: Int\r\n}\r\ninput AsignacionClienteInput {\r\n      id:ID\r\n        Edificio:String\r\n        Nivel:String\r\n        Habitacion:String\r\n        Cliente:String\r\n        FechaIngreso:String\r\n        FechaSalida:String\r\n        Eliminado: Int\r\n        Edificios:Edificioinput\r\n}\r\ninput Configuracionesinput  {\r\n    id:ID\r\n    Nombre: String\r\n    Valor: [ConfiguracionesValorinput]\r\n    Eliminado: Int\r\n}\r\ninput ConfiguracionesValorinput {\r\n    Nombre: String\r\n    Valor:String\r\n}\r\ninput ListaDeValoresinput  {\r\n    id:ID\r\n    Nombre: String\r\n    Valor: [ListaDeValoresValorinput]\r\n    Eliminado: Int\r\n}\r\ninput  ListaDeValoresValorinput {\r\n    Nombre: String\r\n    Valor:String\r\n}\r\ninput Clientesinput {\r\n    id:ID\r\n    Nombre: String\r\n    Apellido:String\r\n    Edad: Int\r\n    Direccion: String\r\n    Dpi: String\r\n    Nit: String\r\n    Sexo: String\r\n    Municipio: String\r\n    Departamento: String\r\n    Eliminado:Int\r\n    Responsable:Int\r\n}\r\ninput Edificioinput  {\r\n    id:ID\r\n    Nombre:String\r\n    Latitud:String\r\n    Longitud:String\r\n    Estructura: [Nivelinput]\r\n    Eliminado: Int\r\n}\r\ninput Nivelinput {\r\n     Nombre:String\r\n     Nivel:Int\r\n     Habitaciones:[Habitacioninput]\r\n}\r\ninput Habitacioninput {\r\n     Nombre:String\r\n     Habitacion:Int\r\n     Capacidad:Int\r\n     Ocupados:Int\r\n}\r\ninput Bitacorainput  {\r\n    id:ID\r\n    Evento:String\r\n    Documento:String\r\n    UsuarioId:ID\r\n    Fecha:String\r\n    Pagina:String\r\n    Data:[BitacoraDatainput]   \r\n}\r\ninput BitacoraDatainput {\r\n    Nombre: String\r\n    Data:String\r\n}\r\ninput BitacoraSesioninput {\r\n    id:ID\r\n    UsuarioId:ID\r\n    FechaInicio:String\r\n    FechaCierre:String\r\n}\r\ninput Pacientesinput {\r\n    id:ID\r\n\tNombre: String\r\n    Apellido: String\r\n    Edad: Int\r\n    Direccion:String\r\n    Dpi:String\r\n    Nit:String\r\n    Sexo:String\r\n    Municipio:String\r\n    Departamento:String\r\n    Eliminado: Int\r\n}\r\ninput Hospitalinput {\r\n    id:ID\r\n    Nombre:String\r\n    Descripcion:String\r\n    Latitud:String\r\n    Longitud:String\r\n    Eliminado: Int\r\n}\r\ninput Productosinput {\r\n    id:ID\r\n    Nombre:String\r\n    Descripcion:String\r\n    SKU: String\r\n    CodigoBarra:String\r\n    Clasificacion:String\r\n    Tipo:String\r\n    Cantidad: Int \r\n    Precio: Int \r\n    Eliminado: Int\r\n}\r\ninput HistorialProductosinput {\r\n    id:ID\r\n    ProductoId: ID\r\n    Fecha: String\r\n    Cantidad: Int\r\n    Precio: Int \r\n}\r\ninput EntradaSalidaInventarioinput {\r\n    id:ID\r\n\tDonacionId: ID,\r\n\tUsuarioId: ID\r\n\tProductos: [Productosinput]\r\n    Responsable: String\r\n    Tipo:Int\r\n    Fecha:String\r\n    Estado:String\r\n    Total:Int\r\n}\r\ninput AsignacionPacienteinput {\r\n    id:ID\r\n    Hospitales:String\r\n    Clientes:[Clientesinput]\r\n    Pacientes: [Pacientesinput]\r\n    Fecha: String\r\n    Estado: String\r\n    FechaSalida:String\r\n    Eliminado:Int\r\n    Observaciones:String\r\n}\r\ninput Donacioninput  {\r\n    id: ID\r\n\tUsuarioId:ID\r\n    Responsable: String\r\n    Donante: String\r\n    Tipo:Int\r\n    Fecha:String\r\n    Estado:String\r\n    Cantidad: Int\r\n}\r\ninput CajaChicainput  {\r\n    id:ID\r\n    Cantidad: Int\r\n    Fecha:String\r\n}\r\ninput EntradaSalidaCajaChicainput  {\r\n    id:ID\r\n\tDonacionId: ID\r\n\tUsuarioId: ID\r\n    Responsable: String\r\n    Cantidad: Int\r\n    Tipo:Int\r\n    Fecha:String\r\n    Estado:String\r\n}\r\ninput HistorialCajaChicainput  {\r\n    id:ID\r\n    Cantidad: Int\r\n    Fecha:String\r\n}\r\ninput Rolesinput {\r\n    id: ID\r\n    Nombre: String\r\n    Descripcion: String\r\n    Permiso: [Permisosinput]\r\n    Eliminado: Int\r\n}\r\ninput Permisosinput {\r\n    id: ID\r\n    Nombre: String\r\n    Descripcion: String\r\n    URL:String\r\n    Menu:String\r\n    Activo: Boolean\r\n    Opcion:[Opcionesinput]\r\n    Eliminado: Int\r\n}\r\ninput Usuariosinput {\r\n    id: ID\r\n    Usuario: String\r\n    Nombre: String\r\n    Password: String\r\n    Rol: [Rolesinput]\r\n    Eliminado: Int\r\n}\r\ninput Opcionesinput {\r\n    id: ID\r\n    Nombre: String\r\n    Descripcion: String\r\n    Activo: Boolean\r\n    Eliminado: Int\r\n}\r\ntype Mutation {\r\n    """Crea parametros """\r\n    crearParametros(input:Parametrosinput):Parametros\r\n    """Crear la Configuracion """\r\n    crearConfiguracion(input:Configuracionesinput):Configuraciones\r\n  """Crear la Asignacion Cliente """\r\n  \r\n  crearAsignacionCliente(input:AsignacionClienteInput):String\r\n    crearListaDeValores(input:ListaDeValoresinput):ListaDeValores\r\n    """Crea Los Clientes """\r\n    crearClientes(input:Clientesinput):Clientes\r\n    """CrearResponsable """\r\n    crearResponsables(input:Clientesinput):Clientes\r\n    """Crea el Edificio"""\r\n    crearEdificio(input:Edificioinput):Edificio\r\n    """Crea la Bitacora"""\r\n    crearBitacora(input:Bitacorainput):Bitacora\r\n    """Crea la Bitacora de Sesion"""\r\n    crearBitacoraSesion(input:BitacoraSesioninput):BitacoraSesion\r\n    """Crea Los Pacientes"""\r\n    crearPacientes(input:Pacientesinput):Pacientes\r\n    """Crea el Hospital"""\r\n    crearHospital(input:Hospitalinput):Hospital\r\n    """Crea los Productos"""\r\n    crearProductos(input:Productosinput):Productos\r\n    """Crea el Historial de Productos"""\r\n    crearHistorialProductos(input:HistorialProductosinput):HistorialProductos\r\n    """Crea las Entradas y Salidas del Inventario"""\r\n    crearEntradaSalidaInventario(input:EntradaSalidaInventarioinput):EntradaSalidaInventario\r\n    """Crear Asignacion Pacientes"""\r\n    crearAsignacionPacientes(input:AsignacionPacienteinput):AsignarPaciente\r\n    """Crea las Donaciones al Albergue"""\r\n    crearDonacion(input:Donacioninput):Donacion\r\n    """Crea la Caja Chica"""\r\n    crearCajaChica(input:CajaChicainput):CajaChica\r\n    """Crea la Entrada y Salida de la caja Chica"""\r\n    crearEntradaSalidaCajaChica(input:EntradaSalidaCajaChicainput):EntradaSalidaCajaChica\r\n    """Crea el Historial de la Caja Chica"""\r\n    crearHistorialCajaChica(input:HistorialCajaChicainput):HistorialCajaChica\r\n    """Crea Los Roles """\r\n    crearRoles(input:Rolesinput):String\r\n    """Crea los Permisos """\r\n    crearPermisos(input:Permisosinput):String\r\n    """Crea los Usuarios """\r\n    crearUsuarios(input:Usuariosinput):String\r\n    """AgregarPermisos Los  Roles """\r\n    AgregarPermisos(input:Rolesinput):Roles\r\n    """Actualiza_Los parametros """\r\n    actualizarParametros(input:Parametrosinput):Parametros\r\n    """Actualiza_Los Configuracion """\r\n    actualizarConfiguracion(input:Configuracionesinput):Configuraciones\r\n    actualizarListaDeValores(input:ListaDeValoresinput):ListaDeValores\r\n    """Actualiza_Los Los Clientes """\r\n    actualizarCliente(input:Clientesinput):Clientes\r\n    """Actualiza_Los Los Responsable """\r\n    actualizarResponsable(input:Clientesinput):Clientes\r\n    """Actualiza_Los el Edificio"""\r\n    actualizarEdificio(input:Edificioinput):Edificio\r\n    """Actualiza_Los la Bitacora"""\r\n    actualizarBitacora(input:Bitacorainput):Bitacora\r\n    """Actualiza_Los la Bitacora de Sesion"""\r\n    actualizarBitacoraSesion(input:BitacoraSesioninput):BitacoraSesion\r\n    """Actualiza_Los Los Pacientes"""\r\n    actualizarPacientes(input:Pacientesinput):Pacientes\r\n    """Actualiza_Los el Hospital"""\r\n    actualizarHospital(input:Hospitalinput):Hospital\r\n    """Actualiza_Los los Productos"""\r\n    actualizarProductos(input:Productosinput):Productos\r\n    """Actualiza_Los el Historial de Productos"""\r\n    actualizarHistorialProductos(input:HistorialProductosinput):HistorialProductos\r\n    """Actualiza_Los las Entradas y Salidas del Inventario"""\r\n    actualizarEntradaSalidaInventario(input:EntradaSalidaInventarioinput):EntradaSalidaInventario\r\n    """Actualiza_Los las Donaciones al Albergue"""\r\n    actualizarDonacion(input:Donacioninput):Donacion\r\n    """Actualiza_Los la Caja Chica"""\r\n    actualizarCajaChica(input:CajaChicainput):CajaChica\r\n    """Actualiza_Los la Entrada y Salida de la caja Chica"""\r\n    actualizarEntradaSalidaCajaChica(input:EntradaSalidaCajaChicainput):EntradaSalidaCajaChica\r\n    """Actualiza_Los el Historial de la Caja Chica"""\r\n    actualizarHistorialCajaChica(input:HistorialCajaChicainput):HistorialCajaChica\r\n    """Actualiza_Los Los Roles """\r\n    actualizarRoles(input:Rolesinput):Roles\r\n    """Actualiza_Los los Permisos """\r\n    actualizarPermisos(input:Permisosinput):Permisos\r\n    """Actualiza_Los los Usuarios """\r\n    actualizarUsuarios(input:Usuariosinput):Usuarios\r\n    eliminarParametros(id:ID!):String\r\n    eliminarConfiguracion(id:ID!):String\r\n    eliminarListaDeValores(id:ID!):String\r\n    eliminarClientes (id:ID!):String\r\n    eliminarResponsables(id:ID!):String\r\n    eliminarEdificio(id:ID!):String\r\n    eliminarBitacora(id:ID!):String\r\n    eliminarBitacoraSesion(id:ID!):String\r\n    eliminarPacientes(id:ID!):String\r\n    eliminarHospital(id:ID!):String\r\n    eliminarProductos(id:ID!):String\r\n    eliminarHistorialProductos(id:ID!):String\r\n    eliminarEntradaSalidaInventario(id:ID!):String\r\n    eliminarDonacion(id:ID!):String\r\n    eliminarCajaChica(id:ID!):String\r\n    eliminarEntradaSalidaCajaChica(id:ID!):String\r\n    eliminarHistorialCajaChica(id:ID!):String\r\n    eliminarRoles(id:ID!):String\r\n    eliminarPermisos(id:ID!):String\r\n    eliminarUsuarios(id:ID!):String\r\n    eliminarAsignacionPaciente(id:ID!):String\r\n   eliminarAsignacionCliente(id:ID!,Edificio:String,Nivel:String,Habitacion:String):String\r\n    autenticarUsuario(usuario:String!,password:String!):Token\r\n}\r\n\r\n\r\n\r\n\r\n';
//

var ObjectId = _mongoose2.default.Types.ObjectId;

//


//Variable db[0] mongoServer (Atlas)
var db = ['mongodb+srv://epropac16:h7FG6guM6PfUV2CV@cluster0-nt9ru.mongodb.net/Albergue?retryWrites=true&w=majority', 'mongodb://localhost/Albergue'];

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(db[0], { useNewUrlParser: true });

/*
 mongoose.connect(db[0], { useNewUrlParser: true },e=>{
 if(e){
 console.error('Error '+e)
 }else{
 console.log('Success')
 }
 });
 
 */

_mongoose2.default.set('setFindAndModify', false);

// definir el schema de clientes mongoose.Types.ObjectId

var parametrosSchema = new _mongoose.Schema({
  Nombre: String,
  Valor: String,
  Eliminado: Number
});

var configuracionesSchema = new _mongoose.Schema({
  Nombre: String,
  Valor: Array,
  Eliminado: Number
});

var listaDeValoresSchema = new _mongoose.Schema({
  Nombre: String,
  Valor: Array,
  Eliminado: Number
});

var clientesSchema = new _mongoose.Schema({
  Nombre: String,
  Apellido: String,
  Edad: Number,
  Direccion: String,
  Dpi: String,
  Nit: String,
  Sexo: String,
  Municipio: String,
  Departamento: String,
  Eliminado: Number,
  Responsable: Number
});

var edificioSchema = new _mongoose.Schema({
  Nombre: String,
  Latitud: String,
  Longitud: String,
  Estructura: Array,
  Eliminado: Number
});

var bitacoraSchema = new _mongoose.Schema({
  Evento: String,
  Documento: String,
  UsuarioId: _mongoose2.default.Types.ObjectId,
  Fecha: Date,
  Pagina: String,
  Data: Array
});

var bitacoraSesionSchema = new _mongoose.Schema({
  UsuarioId: _mongoose2.default.Types.ObjectId,
  FechaInicio: Date,
  FechaCierre: Date
});

var pacientesSchema = new _mongoose.Schema({
  Nombre: String,
  Apellido: String,
  Edad: Number,
  Direccion: String,
  Dpi: String,
  Nit: String,
  Sexo: String,
  Municipio: String,
  Departamento: String,
  Eliminado: Number
});

var hospitalSchema = new _mongoose.Schema({
  Nombre: String,
  Descripcion: String,
  Latitud: String,
  Longitud: String,
  Eliminado: Number
});

var productosSchema = new _mongoose.Schema({
  Nombre: String,
  Descripcion: String,
  SKU: String,
  CodigoBarra: String,
  Clasificacion: String,
  Tipo: String,
  Cantidad: Number,
  Precio: Number,
  //FechaCaducidad: Date,
  Eliminado: Number
});

var historialProductosSchema = new _mongoose.Schema({
  ProductoId: _mongoose2.default.Types.ObjectId,
  Fecha: Date,
  Cantidad: Number,
  Precio: Number
});

var entradaSalidaInventarioSchema = new _mongoose.Schema({
  DonacionId: _mongoose2.default.Types.ObjectId,
  UsuarioId: _mongoose2.default.Types.ObjectId,
  Productos: Array,
  Responsable: String,
  Tipo: Number,
  Fecha: Date,
  Estado: String,
  Total: Number
});

var donacionSchema = new _mongoose.Schema({
  UsuarioId: _mongoose2.default.Types.ObjectId,
  Responsable: String,
  Donante: String,
  Tipo: Number,
  Fecha: Date,
  Estado: String,
  Cantidad: Number
});

var cajaChicaSchema = new _mongoose.Schema({
  Cantidad: Number,
  Fecha: Date
});

var entradaSalidaCajaChicaSchema = new _mongoose.Schema({
  DonacionId: _mongoose2.default.Types.ObjectId,
  UsuarioId: _mongoose2.default.Types.ObjectId,
  Responsable: String,
  Cantidad: Number,
  Tipo: Number,
  Fecha: Date,
  Estado: String
});

var historialCajaChicaSchema = new _mongoose.Schema({
  Cantidad: Number,
  Fecha: Date
});

var usuariosSchema = new _mongoose.Schema({
  Usuario: String,
  Nombre: String,
  Password: String,
  Rol: Array,
  Eliminado: Number
});

var rolesSchema = new _mongoose.Schema({
  Nombre: String,
  Descripcion: String,
  Permiso: Array,
  Eliminado: Number
});

var permisosSchema = new _mongoose.Schema({
  Nombre: String,
  Descripcion: String,
  URL: String,
  Menu: String,
  Activo: Boolean,
  Opcion: Array,
  Eliminado: Number
});

var asignacionPacienteSchema = new _mongoose.Schema({
  Hospitales: String,
  Clientes: Array,
  Pacientes: Array,
  Fecha: Date,
  FechaSalida: Date,
  Estado: String,
  Observaciones: String,
  Eliminado: Number
});

//usuarios

var AsignacionClienteSchema = new _mongoose.Schema({
  Edificio: String,
  Nivel: String,
  Habitacion: String,
  Cliente: String,
  FechaIngreso: Date,
  FechaSalida: Date,
  Eliminado: Number
});

var parametros = (0, _mongoose.model)('parametros', parametrosSchema);
var configuraciones = (0, _mongoose.model)('configuraciones', configuracionesSchema);
var ListaDeValores = (0, _mongoose.model)('ListaDeValores', listaDeValoresSchema);
var clientes = (0, _mongoose.model)('clientes', clientesSchema);
var edificio = (0, _mongoose.model)('edificio', edificioSchema);
var bitacora = (0, _mongoose.model)('bitacora', bitacoraSchema);
var bitacoraSesion = (0, _mongoose.model)('bitacoraSesion', bitacoraSesionSchema);
var pacientes = (0, _mongoose.model)('pacientes', pacientesSchema);
var hospital = (0, _mongoose.model)('hospital', hospitalSchema);
var productos = (0, _mongoose.model)('productos', productosSchema);
var historialProductos = (0, _mongoose.model)('historialProductos', historialProductosSchema);
var entradaSalidaInventario = (0, _mongoose.model)('entradaSalidaInventario', entradaSalidaInventarioSchema);
var donacion = (0, _mongoose.model)('donacion', donacionSchema);
var cajaChica = (0, _mongoose.model)('cajaChica', cajaChicaSchema);
var entradaSalidaCajaChica = (0, _mongoose.model)('entradaSAlidaCajaChica', entradaSalidaCajaChicaSchema);
var roles = (0, _mongoose.model)('roles', rolesSchema);
var permisos = (0, _mongoose.model)('permisos', permisosSchema);
var asignarPaciente = (0, _mongoose.model)('asignacionPaciente', asignacionPacienteSchema);
var AsignacionCliente = (0, _mongoose.model)('AsignacionCliente', AsignacionClienteSchema);

var historialCajaChica = (0, _mongoose.model)('historialCajaChica', historialCajaChicaSchema);

usuariosSchema.pre('save', function (next) {
  var _this = this;

  //si el password no esta modificado ejecuta la siguiente funcion
  if (!this.isModified('Password')) {
    return next();
  }
  console.log(":1");
  _bcrypt2.default.genSalt(10, function (err, salt) {
    if (err) return next(err);
    console.log(":2");

    _bcrypt2.default.hash(_this.Password, salt, function (err, hash) {
      if (err) return next(err);

      console.log(":3");
      _this.Password = hash;
      next();
    });
  });
});

var usuarios = (0, _mongoose.model)('usuarios', usuariosSchema);
//


var types = {
  Usuarios: {
    Rol: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var _Rol = _ref2.Rol;
        var ids, RolesDate;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ids = void 0;
                RolesDate = void 0;
                _context.prev = 2;

                ids = _Rol ? _Rol.map(function (Roles) {
                  return ObjectId(Roles.id);
                }) : [];

                if (!(ids.length > 0)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 7;
                return roles.find({ _id: { $in: ids } });

              case 7:
                _context.t0 = _context.sent;
                _context.next = 11;
                break;

              case 10:
                _context.t0 = [];

              case 11:
                RolesDate = _context.t0;
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t1 = _context['catch'](2);

                console.error(_context.t1);

              case 17:
                return _context.abrupt('return', RolesDate);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[2, 14]]);
      }));

      return function Rol(_x) {
        return _ref.apply(this, arguments);
      };
    }()
  }
  //


  //


  //Generando token

};_dotenv2.default.config({ path: 'variables.env' });

var Query = {
  getparametros: function getparametros(root, _ref3) {
    var limit = _ref3.limit,
        Offset = _ref3.Offset;

    return new Promise(function (resolve, object) {
      parametros.find({ Eliminado: 0 }, function (error, parametros) {
        if (error) (0, _assert.rejects)(error);else resolve(parametros);
      }).limit(limit).skip(Offset);
    });
  },
  getParametro: function getParametro(root, _ref4) {
    var id = _ref4.id;

    return new Promise(function (resolve, object) {
      parametros.findById(id, function (error, parametro) {
        if (error) (0, _assert.rejects)(error);else resolve(parametro);
      });
    });
  },
  getConfiguraciones: function getConfiguraciones(root, _ref5) {
    var limit = _ref5.limit,
        Offset = _ref5.Offset;

    return new Promise(function (resolve, object) {
      configuraciones.find({ Eliminado: 0 }, function (error, configuraciones) {
        if (error) (0, _assert.rejects)(error);else resolve(configuraciones);
      }).limit(limit).skip(Offset);
    });
  },
  getConfiguracion: function getConfiguracion(root, _ref6) {
    var id = _ref6.id;

    return new Promise(function (resolve, object) {
      configuraciones.findById(id, function (error, configuracion) {
        if (error) (0, _assert.rejects)(error);else resolve(configuracion);
      });
    });
  },
  getListaDeValores: function getListaDeValores(root, _ref7) {
    var limit = _ref7.limit,
        Offset = _ref7.Offset;

    return new Promise(function (resolve, object) {
      ListaDeValores.find({ Eliminado: 0 }, function (error, ListaDeValores) {
        if (error) (0, _assert.rejects)(error);else resolve(ListaDeValores);
      }).limit(limit).skip(Offset);
    });
  },
  getListaDeValor: function getListaDeValor(root, _ref8) {
    var id = _ref8.id;

    return new Promise(function (resolve, object) {
      ListaDeValores.findById(id, function (error, ListaDeValor) {
        if (error) (0, _assert.rejects)(error);else resolve(ListaDeValor);
      });
    });
  },

  getAsignacionClientes: function getAsignacionClientes(root, _ref9) {
    var limit = _ref9.limit,
        Offset = _ref9.Offset;

    return new Promise(function (resolve, object) {
      AsignacionCliente.find({ Eliminado: 0 }, function (error, AsignacionClien) {
        if (error) (0, _assert.rejects)(error);else resolve(AsignacionClien);
      }).limit(limit).skip(Offset);
    });
  },
  getAsignacionCliente: function getAsignacionCliente(root, _ref10) {
    var id = _ref10.id;

    return new Promise(function (resolve, object) {
      AsignacionCliente.findById(id, function (error, AsignacionClien) {
        if (error) (0, _assert.rejects)(error);else resolve(AsignacionClien);
      });
    });
  },
  getclientes: function getclientes(root, _ref11) {
    var limit = _ref11.limit,
        Offset = _ref11.Offset;

    return new Promise(function (resolve, object) {
      clientes.find({ Eliminado: 0 }, function (error, clientes) {
        if (error) (0, _assert.rejects)(error);else resolve(clientes);
      }).limit(limit).skip(Offset);
    });
  },
  getCliente: function getCliente(root, _ref12) {
    var id = _ref12.id;

    return new Promise(function (resolve, object) {
      clientes.findById(id, function (error, cliente) {
        if (error) (0, _assert.rejects)(error);else resolve(cliente);
      });
    });
  },
  getresponsables: function getresponsables(root, _ref13) {
    var limit = _ref13.limit,
        Offset = _ref13.Offset;

    return new Promise(function (resolve, object) {
      clientes.find({ Eliminado: 0, Responsable: 1 }, function (error, clientes) {
        if (error) (0, _assert.rejects)(error);else resolve(clientes);
      }).limit(limit).skip(Offset);
    });
  },
  getResponsable: function getResponsable(root, _ref14) {
    var id = _ref14.id;

    return new Promise(function (resolve, object) {
      clientes.findById(id, function (error, cliente) {
        if (error) (0, _assert.rejects)(error);else resolve(cliente);
      });
    });
  },

  getedificios: function getedificios(root, _ref15) {
    var limit = _ref15.limit,
        Offset = _ref15.Offset;

    return new Promise(function (resolve, object) {
      edificio.find({ Eliminado: 0 }, function (error, edificio) {
        if (error) (0, _assert.rejects)(error);else resolve(edificio);
      }).limit(limit).skip(Offset);
    });
  },
  getedificio: function getedificio(root, _ref16) {
    var id = _ref16.id;

    return new Promise(function (resolve, object) {
      edificio.findById(id, function (error, edificio) {
        if (error) (0, _assert.rejects)(error);else resolve(edificio);
      });
    });
  },
  getbitacoras: function getbitacoras(root, _ref17) {
    var limit = _ref17.limit,
        Offset = _ref17.Offset;

    return new Promise(function (resolve, object) {
      bitacora.find({}, function (error, bitacora) {
        if (error) (0, _assert.rejects)(error);else resolve(bitacora);
      }).limit(limit).skip(Offset);
    });
  },
  getbitacora: function getbitacora(root, _ref18) {
    var id = _ref18.id;

    return new Promise(function (resolve, object) {
      bitacora.findById(id, function (error, bitacora) {
        if (error) (0, _assert.rejects)(error);else resolve(bitacora);
      });
    });
  },
  getbitacoraSesiones: function getbitacoraSesiones(root, _ref19) {
    var limit = _ref19.limit,
        Offset = _ref19.Offset;

    return new Promise(function (resolve, object) {
      bitacoraSesion.find({}, function (error, bitacoraSesion) {
        if (error) (0, _assert.rejects)(error);else resolve(bitacoraSesion);
      }).limit(limit).skip(Offset);
    });
  },
  getbitacoraSesion: function getbitacoraSesion(root, _ref20) {
    var id = _ref20.id;

    return new Promise(function (resolve, object) {
      bitacoraSesion.findById(id, function (error, bitacoraSesion) {
        if (error) (0, _assert.rejects)(error);else resolve(bitacoraSesion);
      });
    });
  },
  getpacientes: function getpacientes(root, _ref21) {
    var limit = _ref21.limit,
        Offset = _ref21.Offset;

    return new Promise(function (resolve, object) {
      pacientes.find({ Eliminado: 0 }, function (error, pacientes) {
        if (error) (0, _assert.rejects)(error);else resolve(pacientes);
      }).limit(limit).skip(Offset);
    });
  },
  getpaciente: function getpaciente(root, _ref22) {
    var id = _ref22.id;

    return new Promise(function (resolve, object) {
      pacientes.findById(id, function (error, paciente) {
        if (error) (0, _assert.rejects)(error);else resolve(paciente);
      });
    });
  },
  getHospitales: function getHospitales(root, _ref23) {
    var limit = _ref23.limit,
        Offset = _ref23.Offset;

    return new Promise(function (resolve, object) {
      hospital.find({ Eliminado: 0 }, function (error, hospital) {
        if (error) (0, _assert.rejects)(error);else resolve(hospital);
      }).limit(limit).skip(Offset);
    });
  },
  getHospital: function getHospital(root, _ref24) {
    var id = _ref24.id;

    return new Promise(function (resolve, object) {
      hospital.findById(id, function (error, hospital) {
        if (error) (0, _assert.rejects)(error);else resolve(hospital);
      });
    });
  },
  getproductos: function getproductos(root, _ref25) {
    var limit = _ref25.limit,
        Offset = _ref25.Offset;

    return new Promise(function (resolve, object) {
      productos.find({ Eliminado: 0 }, function (error, productos) {
        if (error) (0, _assert.rejects)(error);else resolve(productos);
      }).limit(limit).skip(Offset);
    });
  },
  getproducto: function getproducto(root, _ref26) {
    var id = _ref26.id;

    return new Promise(function (resolve, object) {
      productos.findById(id, function (error, producto) {
        if (error) (0, _assert.rejects)(error);else resolve(producto);
      });
    });
  },
  gethistorialProductos: function gethistorialProductos(root, _ref27) {
    var limit = _ref27.limit,
        Offset = _ref27.Offset;

    return new Promise(function (resolve, object) {
      historialProductos.find({}, function (error, historialProductos) {
        if (error) (0, _assert.rejects)(error);else resolve(historialProductos);
      }).limit(limit).skip(Offset);
    });
  },
  gethistorialProducto: function gethistorialProducto(root, _ref28) {
    var id = _ref28.id;

    return new Promise(function (resolve, object) {
      historialProductos.findById(id, function (error, historialProducto) {
        if (error) (0, _assert.rejects)(error);else resolve(historialProducto);
      });
    });
  },
  getentradaSalidaInventarios: function getentradaSalidaInventarios(root, _ref29) {
    var limit = _ref29.limit,
        Offset = _ref29.Offset;

    return new Promise(function (resolve, object) {
      entradaSalidaInventario.find({}, function (error, entradaSalidaInventario) {
        if (error) (0, _assert.rejects)(error);else resolve(entradaSalidaInventario);
      }).limit(limit).skip(Offset);
    });
  },
  getentradaSalidaInventario: function getentradaSalidaInventario(root, _ref30) {
    var id = _ref30.id;

    return new Promise(function (resolve, object) {
      entradaSalidaInventario.findById(id, function (error, entradaSalidaInventario) {
        if (error) (0, _assert.rejects)(error);else resolve(entradaSalidaInventario);
      });
    });
  },
  getdonaciones: function getdonaciones(root, _ref31) {
    var limit = _ref31.limit,
        Offset = _ref31.Offset;

    return new Promise(function (resolve, object) {
      donacion.find({}, function (error, donacion) {
        if (error) (0, _assert.rejects)(error);else resolve(donacion);
      }).limit(limit).skip(Offset);
    });
  },
  getdonacion: function getdonacion(root, _ref32) {
    var id = _ref32.id;

    return new Promise(function (resolve, object) {
      donacion.findById(id, function (error, donacion) {
        if (error) (0, _assert.rejects)(error);else resolve(donacion);
      });
    });
  },
  getcajaChicas: function getcajaChicas(root, _ref33) {
    var limit = _ref33.limit,
        Offset = _ref33.Offset;

    return new Promise(function (resolve, object) {
      cajaChica.find({}, function (error, cajaChica) {
        if (error) (0, _assert.rejects)(error);else resolve(cajaChica);
      }).limit(limit).skip(Offset);
    });
  },
  getcajaChica: function getcajaChica(root, _ref34) {
    var id = _ref34.id;

    return new Promise(function (resolve, object) {
      cajaChica.findById(id, function (error, cajaChica) {
        if (error) (0, _assert.rejects)(error);else resolve(cajaChica);
      });
    });
  },
  getentradaSalidaCajaChicas: function getentradaSalidaCajaChicas(root, _ref35) {
    var limit = _ref35.limit,
        Offset = _ref35.Offset;

    return new Promise(function (resolve, object) {
      entradaSalidaCajaChica.find({}, function (error, entradaSalidaCajaChica) {
        if (error) (0, _assert.rejects)(error);else resolve(entradaSalidaCajaChica);
      }).limit(limit).skip(Offset);
    });
  },
  getentradaSalidaCajaChica: function getentradaSalidaCajaChica(root, _ref36) {
    var id = _ref36.id;

    return new Promise(function (resolve, object) {
      entradaSalidaCajaChica.findById(id, function (error, entradaSalidaCajaChica) {
        if (error) (0, _assert.rejects)(error);else resolve(entradaSalidaCajaChica);
      });
    });
  },
  gethistorialCajaChicas: function gethistorialCajaChicas(root, _ref37) {
    var limit = _ref37.limit,
        Offset = _ref37.Offset;

    return new Promise(function (resolve, object) {
      historialCajaChica.find({}, function (error, historialCajaChica) {
        if (error) (0, _assert.rejects)(error);else resolve(historialCajaChica);
      }).limit(limit).skip(Offset);
    });
  },
  gethistorialCajaChica: function gethistorialCajaChica(root, _ref38) {
    var id = _ref38.id;

    return new Promise(function (resolve, object) {
      historialCajaChica.findById(id, function (error, historialCajaChica) {
        if (error) (0, _assert.rejects)(error);else resolve(historialCajaChica);
      });
    });
  },
  getusuarios: function getusuarios(root, _ref39) {
    var limit = _ref39.limit,
        Offset = _ref39.Offset;

    return new Promise(function (resolve, object) {
      usuarios.find({ Eliminado: 0 }, function (error, usuario) {
        if (error) (0, _assert.rejects)(error);else resolve(usuario);
      }).limit(limit).skip(Offset);
    });
  },
  getasignacionpacientes: function getasignacionpacientes(root, _ref40) {
    var limit = _ref40.limit,
        Offset = _ref40.Offset;

    return new Promise(function (resolve, object) {
      asignarPaciente.find({ Estado: 'ASIGNADO' }, function (error, data) {
        if (error) (0, _assert.rejects)(error);else resolve(data);
      }).limit(limit).skip(Offset);
    });
  },
  getasignacionpaciente: function getasignacionpaciente(root, _ref41) {
    var id = _ref41.id;

    return new Promise(function (resolve, object) {
      asignarPaciente.findById(id, function (error, data) {
        if (error) (0, _assert.rejects)(error);else resolve(data);
      });
    });
  },
  getusuario: function getusuario(root, _ref42) {
    var id = _ref42.id;

    return new Promise(function (resolve, object) {
      usuarios.findById(id, function (error, usuario) {
        if (error) (0, _assert.rejects)(error);else resolve(usuario);
      });
    });
  },

  obtenerUsuario: function obtenerUsuario(root, arg, _ref43) {
    var usuarioActual = _ref43.usuarioActual;


    if (!usuarioActual) {
      return null;
    }

    //obtener el usuariio actual del request del JWT verificado
    var usuario = usuarios.findOne({ Usuario: usuarioActual.Usuario, Eliminado: 0 });

    if (!usuario) {
      return null;
    }
    return usuario;
  },

  getroles: function getroles(root, _ref44) {
    var limit = _ref44.limit,
        Offset = _ref44.Offset;

    return new Promise(function (resolve, object) {
      roles.find({ Eliminado: 0 }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      }).limit(limit).skip(Offset);
    });
  },
  getrol: function getrol(root, _ref45) {
    var id = _ref45.id;

    return new Promise(function (resolve, object) {
      roles.findById(id, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  },
  getpermisos: function getpermisos(root, _ref46) {
    var limit = _ref46.limit,
        Offset = _ref46.Offset;

    return new Promise(function (resolve, object) {
      permisos.find({ Eliminado: 0 }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      }).limit(limit).skip(Offset);
    });
  },
  getpermiso: function getpermiso(root, _ref47) {
    var id = _ref47.id;

    return new Promise(function (resolve, object) {
      permisos.findById(id, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  },
  reportesasigClier1: function reportesasigClier1(root, _ref48) {
    var id = _ref48.id;

    return new Promise(function (resolve, object) {
      AsignacionCliente.aggregate([{
        $match: { Eliminado: 0 }
      }, {
        $group: {
          _id: "$Edificio",
          Total: { $sum: 1 }
        }
      }], function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  },
  reportesasigClier2: function reportesasigClier2(root, _ref49) {
    var id = _ref49.id;

    return new Promise(function (resolve, object) {
      AsignacionCliente.aggregate([{
        $match: { Eliminado: 1 }
      }, {
        $group: {
          _id: "$Edificio",
          Total: { $sum: 1 }
        }
      }], function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  },
  reportesasigpas1: function reportesasigpas1(root, _ref50) {
    var id = _ref50.id;

    return new Promise(function (resolve, object) {
      asignarPaciente.aggregate([{
        $group: {
          _id: '$Fecha',
          Total: {
            $sum: 1
          }

        }
      }], function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  },
  reportesasigpas2: function reportesasigpas2(root, _ref51) {
    var id = _ref51.id;

    return new Promise(function (resolve, object) {
      asignarPaciente.aggregate([{
        $group: {
          _id: '$Clientes',
          Total: {
            $sum: 1
          }
        }
      }], function (error, resultado) {

        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  },
  reportesproducr1: function reportesproducr1(root, _ref52) {
    var id = _ref52.id;

    return new Promise(function (resolve, object) {
      productos.aggregate([{
        $group: {
          _id: "$Nombre",
          Total: { $sum: "$Cantidad" }
        }
      }], function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  },
  reportesdonacior1: function reportesdonacior1(root, _ref53) {
    var id = _ref53.id;

    return new Promise(function (resolve, object) {
      donacion.aggregate([{
        $group: {
          _id: "$Fecha",
          Total: { $sum: 1 }
        }
      }], function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve(resultado);
      });
    });
  }
  //


  //


  //Generando token

};var crearToken = function crearToken(usuarioLogin, secreto, expiresIn) {
  var Usuario = usuarioLogin.Usuario;

  return _jsonwebtoken2.default.sign({ Usuario: Usuario }, secreto, { expiresIn: expiresIn });
};

var Mutation = {
  crearParametros: function crearParametros(root, _ref54) {
    var input = _ref54.input;

    var Save_Data = new parametros({
      Nombre: input.Nombre,
      Valor: input.Valor,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearConfiguracion: function crearConfiguracion(root, _ref55) {
    var input = _ref55.input;

    var Save_Data = new configuraciones({
      Nombre: input.Nombre,
      Valor: input.Valor,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearListaDeValores: function crearListaDeValores(root, _ref56) {
    var input = _ref56.input;

    var Save_Data = new ListaDeValores({
      Nombre: input.Nombre,
      Valor: input.Valor,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearClientes: function crearClientes(root, _ref57) {
    var input = _ref57.input;

    var Save_Data = new clientes({
      Nombre: input.Nombre,
      Apellido: input.Apellido,
      Edad: input.Edad,
      Direccion: input.Direccion,
      Dpi: input.Dpi,
      Nit: input.Nit,
      Sexo: input.Sexo,
      Municipio: input.Municipio,
      Departamento: input.Departamento,
      Responsable: input.Responsable,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },

  crearAsignacionCliente: function crearAsignacionCliente(root, _ref58) {
    var input = _ref58.input;

    var Save_Data = new AsignacionCliente({
      Edificio: input.Edificio,
      Nivel: input.Nivel,
      Habitacion: input.Habitacion,
      FechaIngreso: input.FechaIngreso,
      FechaSalida: input.FechaSalida,
      Cliente: input.Cliente,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    for (var index = 0; index < input.Edificios.Estructura.length; index++) {
      for (var index1 = 0; index1 < input.Edificios.Estructura[index].Habitaciones.length; index1++) {
        if (input.Edificios.Estructura[index].Habitaciones[index1].Nombre == input.Habitacion) {
          input.Edificios.Estructura[index].Habitaciones[index1].Ocupados++;
        }
      }
    }

    return new Promise(function (resolve, object) {

      console.log(input.Edificios.id);

      edificio.findOneAndUpdate({ _id: ObjectId(input.Edificios.id) }, input.Edificios, { new: true }, function (error, edificio) {
        if (error) (0, _assert.rejects)(error);else resolve(edificio);
      });

      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve("Cliente Asignado");
      });
    });
  },
  crearResponsables: function crearResponsables(root, _ref59) {
    var input = _ref59.input;

    var Save_Data = new clientes({
      Nombre: input.Nombre,
      Apellido: input.Apellido,
      Edad: input.Edad,
      Direccion: input.Direccion,
      Dpi: input.Dpi,
      Nit: input.Nit,
      Sexo: input.Sexo,
      Municipio: input.Municipio,
      Departamento: input.Departamento,
      Responsable: 1,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },

  crearEdificio: function crearEdificio(root, _ref60) {
    var input = _ref60.input;

    var Save_Data = new edificio({
      Nombre: input.Nombre,
      Latitud: input.Latitud,
      Longitud: input.Longitud,
      Estructura: input.Estructura,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearBitacora: function crearBitacora(root, _ref61) {
    var input = _ref61.input;

    var Save_Data = new bitacora({
      Evento: input.Evento,
      Documento: input.Documento,
      UsuarioId: input.UsuarioId,
      Fecha: input.Fecha,
      Pagina: input.Pagina,
      Data: input.Data
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearBitacoraSesion: function crearBitacoraSesion(root, _ref62) {
    var input = _ref62.input;

    var Save_Data = new bitacoraSesion({
      UsuarioId: input.UsuarioId,
      FechaInicio: input.FechaInicio,
      FechaCierre: input.FechaCierre
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearPacientes: function crearPacientes(root, _ref63) {
    var input = _ref63.input;

    var Save_Data = new pacientes({
      Nombre: input.Nombre,
      Apellido: input.Apellido,
      Edad: input.Edad,
      Direccion: input.Direccion,
      Dpi: input.Dpi,
      Nit: input.Nit,
      Sexo: input.Sexo,
      Municipio: input.Municipio,
      Departamento: input.Departamento,
      Estado: input.Estado,
      ClienteId: input.ClienteId,
      Hospital: input.hospital,
      Sala: input.Sala,
      Habitacion: input.Habitacion,
      FechaIngreso: input.FechaIngreso,
      FechaSalida: input.FechaSalida,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearHospital: function crearHospital(root, _ref64) {
    var input = _ref64.input;

    var Save_Data = new hospital({
      Nombre: input.Nombre,
      Descripcion: input.Descripcion,
      Latitud: input.Latitud,
      Longitud: input.Longitud,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearProductos: function crearProductos(root, _ref65) {
    var input = _ref65.input;

    var Save_Data = new productos({
      Nombre: input.Nombre,
      Descripcion: input.Descripcion,
      SKU: input.SKU,
      CodigoBarra: input.CodigoBarra,
      Clasificacion: input.Clasificacion,
      Tipo: input.Tipo,
      Precio: input.Precio,
      Cantidad: input.Cantidad,
      Eliminado: 0
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearHistorialProductos: function crearHistorialProductos(root, _ref66) {
    var input = _ref66.input;

    var Save_Data = new historialProductos({
      ProductoId: input.ProductoId,
      Fecha: input.Fecha,
      Cantidad: input.Cantidad,
      Precio: input.Precio
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearEntradaSalidaInventario: function crearEntradaSalidaInventario(root, _ref67) {
    var input = _ref67.input;

    var Save_Data = new entradaSalidaInventario({
      DonacionId: input.DonacionId,
      UsuarioId: input.UsuarioId,
      Productos: input.Productos,
      Responsable: input.Responsable,
      Tipo: input.Tipo,
      Fecha: input.Fecha,
      Estado: input.Estado,
      Total: input.Total
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      var Estado = input.Estado;
      var Tipo = input.Tipo;


      if (Estado === 'APROBADO') {
        var instruccion = void 0;
        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }

        Save_Data.Productos.forEach(function (producto) {
          console.log(producto);
          productos.updateOne({ _id: ObjectId(producto.id) }, {
            $inc: { Cantidad: '' + instruccion + producto.Cantidad }
          }, function (error) {
            if (error) return new Error(error);
          });
        });
      }

      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearAsignacionPacientes: function crearAsignacionPacientes(root, _ref68) {
    var input = _ref68.input;

    var Save_Data = new asignarPaciente({
      Hospitales: input.Hospitales,
      Clientes: input.Clientes,
      Pacientes: input.Pacientes,
      Fecha: input.Fecha,
      FechaSalida: input.FechaSalida,
      Eliminado: 0,
      Estado: input.Estado,
      Observaciones: input.Observaciones
    });
    Save_Data.id = Save_Data._id;

    console.log(Save_Data.Eliminado);
    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearDonacion: function crearDonacion(root, _ref69) {
    var input = _ref69.input;

    var Save_Data = new donacion({
      UsuarioId: input.UsuarioId,
      Responsable: input.Responsable,
      Donante: input.Donante,
      Tipo: input.Tipo,
      Fecha: input.Fecha,
      Estado: input.Estado,
      Cantidad: input.Cantidad
    });
    Save_Data.id = Save_Data._id;
    return new Promise(function (resolve, object) {
      var instruccion = '+';

      if (input.Tipo === 1) {
        cajaChica.updateOne({}, {
          $inc: { Cantidad: '' + instruccion + input.Cantidad }
        }, function (error) {
          if (error) return new Error(error);
        });
      }
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearCajaChica: function crearCajaChica(root, _ref70) {
    var input = _ref70.input;

    var Save_Data = new cajaChica({
      Cantidad: input.Cantidad,
      Fecha: input.Fecha
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearEntradaSalidaCajaChica: function crearEntradaSalidaCajaChica(root, _ref71) {
    var input = _ref71.input;

    var Save_Data = new entradaSalidaCajaChica({
      DonacionId: input.DonacionId,
      UsuarioId: input.UsuarioId,
      Responsable: input.Responsable,
      Cantidad: input.Cantidad,
      Tipo: input.Tipo,
      Fecha: input.Fecha,
      Estado: input.Estado
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      var Estado = input.Estado;
      var Tipo = input.Tipo;
      var Cantidad = input.Cantidad;


      if (Estado === 'APROBADO') {
        var instruccion = void 0;
        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }

        cajaChica.updateOne({}, {
          $inc: { Cantidad: '' + instruccion + Cantidad }
        }, function (error) {
          if (error) return new Error(error);
        });
      }

      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  crearHistorialCajaChica: function crearHistorialCajaChica(root, _ref72) {
    var input = _ref72.input;

    var Save_Data = new historialCajaChica({
      Cantidad: input.Cantidad,
      Fecha: input.Fecha
    });
    Save_Data.id = Save_Data._id;

    return new Promise(function (resolve, object) {
      Save_Data.save(function (error) {
        if (error) (0, _assert.rejects)(error);else resolve(Save_Data);
      });
    });
  },
  actualizarListaDeValores: function actualizarListaDeValores(root, _ref73) {
    var input = _ref73.input;

    return new Promise(function (resolve, object) {
      ListaDeValores.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, lista) {
        if (error) (0, _assert.rejects)(error);else resolve(lista);
      });
    });
  },

  crearUsuarios: function () {
    var _ref74 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, _ref75) {
      var input = _ref75.input;
      var Usuario, existe, Save_Data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              Usuario = input.Usuario;
              _context2.next = 3;
              return usuarios.findOne({ Usuario: Usuario });

            case 3:
              existe = _context2.sent;

              if (!existe) {
                _context2.next = 6;
                break;
              }

              throw new Error('El usuario ya existe');

            case 6:
              Save_Data = new usuarios({
                Usuario: input.Usuario,
                Nombre: input.Nombre,
                Password: input.Password,
                Rol: input.Rol,
                Eliminado: 0
              });

              // return(`El Usuario fue creado con exito`)

              Save_Data.id = Save_Data._id;

              return _context2.abrupt('return', new Promise(function (resolve, object) {
                Save_Data.save(function (error) {
                  if (error) (0, _assert.rejects)(error);else resolve('El Usuario fue creado con exito');
                });
              }));

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function crearUsuarios(_x2, _x3) {
      return _ref74.apply(this, arguments);
    };
  }(),
  autenticarUsuario: function () {
    var _ref76 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root, _ref77) {
      var usuario = _ref77.usuario,
          password = _ref77.password;
      var nombreUsuario, passwordCorrecto;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return usuarios.findOne({ Usuario: usuario, Eliminado: 0 });

            case 2:
              nombreUsuario = _context3.sent;

              if (nombreUsuario) {
                _context3.next = 5;
                break;
              }

              throw new Error('Usuario no encontrado');

            case 5:
              _context3.next = 7;
              return _bcrypt2.default.compare(password, nombreUsuario.Password);

            case 7:
              passwordCorrecto = _context3.sent;

              if (passwordCorrecto) {
                _context3.next = 10;
                break;
              }

              throw new Error('Password Incorrecto');

            case 10:
              return _context3.abrupt('return', {
                token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
              });

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function autenticarUsuario(_x4, _x5) {
      return _ref76.apply(this, arguments);
    };
  }(),
  crearRoles: function () {
    var _ref78 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, _ref79) {
      var input = _ref79.input;
      var Nombre, existe, Save_Data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              Nombre = input.Nombre;
              _context4.next = 3;
              return roles.findOne({ Nombre: Nombre });

            case 3:
              existe = _context4.sent;

              if (!existe) {
                _context4.next = 6;
                break;
              }

              throw new Error('El rol ya existe');

            case 6:
              Save_Data = new roles({
                Nombre: input.Nombre,
                Descripcion: input.Descripcion,
                Permiso: input.Permiso,
                Eliminado: 0
              });


              Save_Data.id = Save_Data._id;

              return _context4.abrupt('return', new Promise(function (resolve, object) {
                Save_Data.save(function (error) {
                  if (error) (0, _assert.rejects)(error);else resolve('El Rol fue creado con exito');
                });
              }));

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function crearRoles(_x6, _x7) {
      return _ref78.apply(this, arguments);
    };
  }(),

  AgregarPermisos: function () {
    var _ref80 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(root, _ref81) {
      var input = _ref81.input;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt('return', new Promise(function (resolve, object) {
                roles.update({ _id: input.id }, { $set: { Permiso: input.Permiso } }, function (error, usuarios) {
                  if (error) (0, _assert.rejects)(error);else resolve(usuarios);
                });
              }));

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function AgregarPermisos(_x8, _x9) {
      return _ref80.apply(this, arguments);
    };
  }(),

  crearPermisos: function () {
    var _ref82 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(root, _ref83) {
      var input = _ref83.input;
      var Nombre, existe, Save_Data;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              Nombre = input.Nombre;
              _context6.next = 3;
              return permisos.findOne({ Nombre: Nombre });

            case 3:
              existe = _context6.sent;

              if (!existe) {
                _context6.next = 6;
                break;
              }

              throw new Error('El permiso ya existe');

            case 6:
              Save_Data = new permisos({
                Nombre: input.Nombre,
                Descripcion: input.Descripcion,
                URL: input.URL,
                Menu: input.Menu,
                Activo: input.Activo,
                Opcion: input.Opcion,
                Eliminado: 0
              });

              Save_Data.id = Save_Data._id;

              return _context6.abrupt('return', new Promise(function (resolve, object) {
                Save_Data.save(function (error) {
                  if (error) (0, _assert.rejects)(error);else resolve('El Permiso fue creado con exito');
                });
              }));

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function crearPermisos(_x10, _x11) {
      return _ref82.apply(this, arguments);
    };
  }(),

  actualizarCliente: function actualizarCliente(root, _ref84) {
    var input = _ref84.input;

    return new Promise(function (resolve, object) {
      clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, cliente) {
        if (error) (0, _assert.rejects)(error);else resolve(cliente);
      });
    });
  },
  actualizarResponsable: function actualizarResponsable(root, _ref85) {
    var input = _ref85.input;

    return new Promise(function (resolve, object) {
      clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, cliente) {
        if (error) (0, _assert.rejects)(error);else resolve(cliente);
      });
    });
  },

  actualizarEdificio: function actualizarEdificio(root, _ref86) {
    var input = _ref86.input;

    return new Promise(function (resolve, object) {
      edificio.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, edificio) {
        if (error) (0, _assert.rejects)(error);else resolve(edificio);
      });
    });
  },

  actualizarBitacora: function actualizarBitacora(root, _ref87) {
    var input = _ref87.input;

    return new Promise(function (resolve, object) {
      bitacora.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, bitacora) {
        if (error) (0, _assert.rejects)(error);else resolve(bitacora);
      });
    });
  },

  actualizarBitacoraSesion: function actualizarBitacoraSesion(root, _ref88) {
    var input = _ref88.input;

    return new Promise(function (resolve, object) {
      bitacoraSesion.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, bitacoraS) {
        if (error) (0, _assert.rejects)(error);else resolve(bitacoraS);
      });
    });
  },

  actualizarPacientes: function actualizarPacientes(root, _ref89) {
    var input = _ref89.input;

    return new Promise(function (resolve, object) {
      pacientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, pacientes) {
        if (error) (0, _assert.rejects)(error);else resolve(pacientes);
      });
    });
  },

  actualizarHospital: function actualizarHospital(root, _ref90) {
    var input = _ref90.input;

    return new Promise(function (resolve, object) {
      hospital.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, hospital) {
        if (error) (0, _assert.rejects)(error);else resolve(hospital);
      });
    });
  },

  actualizarProductos: function actualizarProductos(root, _ref91) {
    var input = _ref91.input;

    return new Promise(function (resolve, object) {
      productos.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, productos) {
        if (error) (0, _assert.rejects)(error);else resolve(productos);
      });
    });
  },

  actualizarHistorialProductos: function actualizarHistorialProductos(root, _ref92) {
    var input = _ref92.input;

    return new Promise(function (resolve, object) {
      pistorialProductos.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, historialproductos) {
        if (error) (0, _assert.rejects)(error);else resolve(historialproductos);
      });
    });
  },

  actualizarEntradaSalidaInventario: function actualizarEntradaSalidaInventario(root, _ref93) {
    var input = _ref93.input;

    return new Promise(function (resolve, object) {
      var Estado = input.Estado;
      var Tipo = input.Tipo;


      if (Estado === 'APROBADO') {
        var instruccion = void 0;

        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }

        input.Productos.forEach(function (producto) {
          productos.updateOne({ _id: ObjectId(producto.id) }, {
            $inc: { Cantidad: '' + instruccion + producto.Cantidad }
          }, function (error) {
            if (error) return new Error(error);
          });
        });
      }

      entradaSalidaInventario.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, esinventario) {
        if (error) (0, _assert.rejects)(error);else resolve(esinventario);
      });
    });
  },

  actualizarDonacion: function actualizarDonacion(root, _ref94) {
    var input = _ref94.input;

    return new Promise(function (resolve, object) {
      donacion.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, donacion) {
        if (error) (0, _assert.rejects)(error);else resolve(donacion);
      });
    });
  },

  actualizarCajaChica: function actualizarCajaChica(root, _ref95) {
    var input = _ref95.input;

    return new Promise(function (resolve, object) {
      cajaChica.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, cajachica) {
        if (error) (0, _assert.rejects)(error);else resolve(cajachica);
      });
    });
  },

  actualizarEntradaSalidaCajaChica: function actualizarEntradaSalidaCajaChica(root, _ref96) {
    var input = _ref96.input;

    return new Promise(function (resolve, object) {
      var Estado = input.Estado;
      var Tipo = input.Tipo;
      var Cantidad = input.Cantidad;


      if (Estado === 'APROBADO') {
        var instruccion = void 0;
        if (Tipo === 1) {
          instruccion = '+';
        } else if (Tipo === 2) {
          instruccion = '-';
        }

        cajaChica.updateOne({}, {
          $inc: { Cantidad: '' + instruccion + Cantidad }
        }, function (error) {
          if (error) return new Error(error);
        });
      }

      entradaSalidaCajaChica.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, escajachica) {
        if (error) (0, _assert.rejects)(error);else resolve(escajachica);
      });
    });
  },

  actualizarHistorialCajaChica: function actualizarHistorialCajaChica(root, _ref97) {
    var input = _ref97.input;

    return new Promise(function (resolve, object) {
      historialCajaChica.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, historialcajachica) {
        if (error) (0, _assert.rejects)(error);else resolve(historialcajachica);
      });
    });
  },

  actualizarRoles: function actualizarRoles(root, _ref98) {
    var input = _ref98.input;

    return new Promise(function (resolve, object) {
      roles.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, rol) {
        if (error) (0, _assert.rejects)(error);else resolve(rol);
      });
    });
  },

  actualizarPermisos: function actualizarPermisos(root, _ref99) {
    var input = _ref99.input;

    return new Promise(function (resolve, object) {
      permisos.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, permisos) {
        if (error) (0, _assert.rejects)(error);else resolve(permisos);
      });
    });
  },

  actualizarUsuarios: function () {
    var _ref100 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(root, _ref101) {
      var input = _ref101.input;
      var nombreUsuario;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return usuarios.findOne({ Password: input.Password });

            case 2:
              nombreUsuario = _context7.sent;

              if (nombreUsuario) {
                _context7.next = 7;
                break;
              }

              _bcrypt2.default.genSalt(10, function (err, salt) {
                if (err) return next(err);
                _bcrypt2.default.hash(input.Password, salt, function (err, hash) {
                  if (err) return next(err);
                  input.Password = hash;
                  return new Promise(function (resolve, object) {
                    usuarios.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, usuarios) {
                      if (error) (0, _assert.rejects)(error);else resolve(usuarios);
                    });
                  });
                });
              });
              _context7.next = 8;
              break;

            case 7:
              return _context7.abrupt('return', new Promise(function (resolve, object) {
                usuarios.findOneAndUpdate({ _id: input.id }, input, { new: true }, function (error, usuarios) {
                  if (error) (0, _assert.rejects)(error);else resolve(usuarios);
                });
              }));

            case 8:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function actualizarUsuarios(_x12, _x13) {
      return _ref100.apply(this, arguments);
    };
  }(),

  eliminarParametros: function eliminarParametros(root, _ref102) {
    var id = _ref102.id;

    return new Promise(function (resolve, object) {
      parametros.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Parametros');
      });
    });
  },
  eliminarConfiguracion: function eliminarConfiguracion(root, _ref103) {
    var id = _ref103.id;

    return new Promise(function (resolve, object) {
      configuracion.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Configuracion');
      });
    });
  },
  eliminarListaDeValores: function eliminarListaDeValores(root, _ref104) {
    var id = _ref104.id;

    return new Promise(function (resolve, object) {
      ListaDeValores.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el ListaDeValores');
      });
    });
  },
  eliminarClientes: function eliminarClientes(root, _ref105) {
    var id = _ref105.id;

    return new Promise(function (resolve, object) {
      clientes.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Clientes');
      });
    });
  },
  eliminarResponsables: function eliminarResponsables(root, _ref106) {
    var id = _ref106.id;

    return new Promise(function (resolve, object) {
      clientes.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Clientes');
      });
    });
  },
  eliminarEdificio: function eliminarEdificio(root, _ref107) {
    var id = _ref107.id;

    return new Promise(function (resolve, object) {
      edificio.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Edificio');
      });
    });
  },
  eliminarBitacora: function eliminarBitacora(root, _ref108) {
    var id = _ref108.id;

    return new Promise(function (resolve, object) {
      bitacora.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Bitacora');
      });
    });
  },
  eliminarBitacoraSesion: function eliminarBitacoraSesion(root, _ref109) {
    var id = _ref109.id;

    return new Promise(function (resolve, object) {
      bitacoraSesion.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el BitacoraSesion');
      });
    });
  },
  eliminarPacientes: function eliminarPacientes(root, _ref110) {
    var id = _ref110.id;

    return new Promise(function (resolve, object) {
      pacientes.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Pacientes');
      });
    });
  },
  eliminarHospital: function eliminarHospital(root, _ref111) {
    var id = _ref111.id;

    return new Promise(function (resolve, object) {
      hospital.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Hospital');
      });
    });
  },
  eliminarProductos: function eliminarProductos(root, _ref112) {
    var id = _ref112.id;

    return new Promise(function (resolve, object) {
      productos.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Productos');
      });
    });
  },
  eliminarHistorialProductos: function eliminarHistorialProductos(root, _ref113) {
    var id = _ref113.id;

    return new Promise(function (resolve, object) {
      historialProductos.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el HistorialProductos');
      });
    });
  },
  eliminarEntradaSalidaInventario: function eliminarEntradaSalidaInventario(root, _ref114) {
    var id = _ref114.id;

    return new Promise(function (resolve, object) {
      entradaSalidaInventario.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el EntradaSalidaInventario');
      });
    });
  },
  eliminarDonacion: function eliminarDonacion(root, _ref115) {
    var id = _ref115.id;

    return new Promise(function (resolve, object) {
      donacion.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Donacion');
      });
    });
  },
  eliminarCajaChica: function eliminarCajaChica(root, _ref116) {
    var id = _ref116.id;

    return new Promise(function (resolve, object) {
      cajaChica.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el CajaChica');
      });
    });
  },
  eliminarEntradaSalidaCajaChica: function eliminarEntradaSalidaCajaChica(root, _ref117) {
    var id = _ref117.id;

    return new Promise(function (resolve, object) {
      entradaSalidaCajaChica.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el EntradaSalidaCajaChica');
      });
    });
  },
  eliminarHistorialCajaChica: function eliminarHistorialCajaChica(root, _ref118) {
    var id = _ref118.id;

    return new Promise(function (resolve, object) {
      historialCajaChica.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el HistorialCajaChica');
      });
    });
  },
  eliminarRoles: function eliminarRoles(root, _ref119) {
    var id = _ref119.id;

    return new Promise(function (resolve, object) {
      rol.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Rol');
      });
    });
  },
  eliminarPermisos: function eliminarPermisos(root, _ref120) {
    var id = _ref120.id;

    return new Promise(function (resolve, object) {
      permisos.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Permisos');
      });
    });
  },
  eliminarUsuarios: function eliminarUsuarios(root, _ref121) {
    var id = _ref121.id;

    return new Promise(function (resolve, object) {
      usuarios.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se al eliminado correctamente el Usuarios');
      });
    });
  },
  eliminarAsignacionPaciente: function eliminarAsignacionPaciente(root, _ref122) {
    var id = _ref122.id;

    return new Promise(function (resolve, object) {
      asignarPaciente.findByIdAndUpdate({ _id: id }, { $set: { Estado: 'NO ASIGNADO', FechaSalida: new Date() } }, function (error, resultado) {
        if (error) (0, _assert.rejects)(error);else resolve('Se a eliminado correctamente la asiganacion al paciente');
      });
    });
  },
  eliminarAsignacionCliente: function () {
    var _ref123 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(root, _ref124) {
      var id = _ref124.id,
          Edificio = _ref124.Edificio,
          Nivel = _ref124.Nivel,
          Habitacion = _ref124.Habitacion;
      var existeedificio;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return edificio.findOne({ Nombre: Edificio });

            case 2:
              existeedificio = _context8.sent;
              return _context8.abrupt('return', new Promise(function (resolve, object) {

                for (var index = 0; index < existeedificio.Estructura.length; index++) {
                  for (var index1 = 0; index1 < existeedificio.Estructura[index].Habitaciones.length; index1++) {
                    if (existeedificio.Estructura[index].Habitaciones[index1].Nombre == Habitacion) {
                      existeedificio.Estructura[index].Habitaciones[index1].Ocupados--;
                    }
                  }
                }

                edificio.findOneAndUpdate({ _id: ObjectId(existeedificio.id) }, existeedificio, { new: true }, function (error, edificio) {
                  if (error) (0, _assert.rejects)(error);else resolve(edificio);
                });

                AsignacionCliente.findByIdAndUpdate({ _id: id }, { $set: { Eliminado: 1 } }, function (error, resultado) {
                  if (error) (0, _assert.rejects)(error);else resolve('Se a eliminado correctamente la asiganacion cliente');
                });
              }));

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function eliminarAsignacionCliente(_x14, _x15) {
      return _ref123.apply(this, arguments);
    };
  }()
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


var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, 'cliente/build')));

var server = new _apolloServerExpress.ApolloServer(_extends({
  typeDefs: typeDefs,

  Mutation: Mutation,
  Query: Query
}, types, {
  context: function () {
    var _ref125 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref126) {
      var req = _ref126.req;
      var token, usuarioActual;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              //obtener el token del servidor
              token = req.headers['authorization'];

              if (!(token !== "null")) {
                _context9.next = 12;
                break;
              }

              _context9.prev = 2;
              _context9.next = 5;
              return _jsonwebtoken2.default.verify(token, process.env.SECRETO);

            case 5:
              usuarioActual = _context9.sent;

              // agregamos el usuario actual al request

              req.usuarioActual = usuarioActual;
              return _context9.abrupt('return', {
                usuarioActual: usuarioActual
              });

            case 10:
              _context9.prev = 10;
              _context9.t0 = _context9['catch'](2);

            case 12:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[2, 10]]);
    }));

    return function context(_x16) {
      return _ref125.apply(this, arguments);
    };
  }()
}));

app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname + '/cliente/build/index.html'));
});

var port = process.env.PORT || 4000;
server.applyMiddleware({ app: app });
app.listen({ port: port }, function () {
  return console.log('El servidor esta corriendo http://localhost:' + port + server.graphqlPath);
});
