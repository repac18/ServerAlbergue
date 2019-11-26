import React, {Fragment}                                  from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import CerrarSesion                                       from './Componentes/FrontEnd/Layout/CerrarSesion';

//Agregados recientemente
import UsuariosNuevo  from './Componentes/Auth/Registro';
import Login          from './Componentes/Auth/Login';
import Usuarios       from './Componentes/Auth/';
import UsuariosEditar from './Componentes/Auth/Edit';

import MovimientoInventario       from './Componentes/EntradaySalidaInventario';
import MovimientoInventarioEditar from './Componentes/EntradaySalidaInventario/Edit';

import Vendedores        from './Componentes/Reportes/Reportes';
//Errores Pagina
import InternalServer from './Componentes/ErrorPages/InternalServer';
import Session        from './Componentes/Session';

import Roles       from './Componentes/Roles';
import NuevosRoles from './Componentes/Roles/Nuevo';
import RolesEdit   from './Componentes/Roles/Edit';

import Permisos      from './Componentes/Permisos';
import PermisosEdit  from './Componentes/Permisos/Edit';
import NuevoPermisos from './Componentes/Permisos/Nuevo';
import Aginacionrxp  from './Componentes/Asignacion_rxp';

//Paginas Index
import Index              from './Componentes/index';
import Productos          from './Componentes/Productos/index.js';
import Clientes           from './Componentes/Clientes/index.js';
import Caja               from './Componentes/Caja/index.js';
import CajaentradaSalida  from './Componentes/Caja/entradaSalida.js';
import Donacion           from './Componentes/Donaciones/index.js';
import Edificio           from './Componentes/Edificio/index.js';
import Pacientes          from './Componentes/Pacientes/Index.js';
import ListaDeValores     from './Componentes/Mantenimientos/ListadeValores/index.js';
import Hospitales         from './Componentes/Hospitales/index.js';

import AsignacionPaciente from './Componentes/AsignacionPaciente/index.js';



import VerEdificios from './Componentes/AsingacionClienteH/index.js';
import AsignacionCliente  from './Componentes/AsingacionClienteH/Edit';
import Responsable        from './Componentes/Responsables/index.js';
//Nuevo
import ProductosNuevo     from './Componentes/Productos/Nuevo.js';
import ClientesNuevo      from './Componentes/Clientes/Nuevo.js';
import DonacionNuevo      from './Componentes/Donaciones/Nuevo.js';
import NuevoEdificio      from './Componentes/Edificio/Nuevo';
import HospitalNuevo      from './Componentes/Hospitales/Nuevo';
import ResponsableNuevo   from './Componentes/Responsables/create.js';
//import NuevoPacientes from './Componentes/Pacientes/Nuevo';
import ListaDeValoresEdit
                          from './Componentes/Mantenimientos/ListadeValores/Edit';
import PacienteNuevo      from './Componentes/Pacientes/Nuevo';
import RegistroAsignacion from './Componentes/AsignacionPaciente/Registros.js';
import RegistroAsignacionCliente  from './Componentes/AsingacionClienteH/Registros.js';


//Editar /Caja/Edit/
import CajaEdit  from './Componentes/Caja/Edit';
import CajaChica from './Componentes/Caja/CajaChica';

import ProductosEdit           from './Componentes/Productos/Edit.js';
import ClientesEdit            from './Componentes/Clientes/Edit.js';
import DonacionEdit            from './Componentes/Donaciones/Edit.js';
import EntradaSalidaInventario from './Componentes/EntradaySalidaInventario/Nuevo';
import EdificioEdit            from './Componentes/Edificio/Edit';
import HospitalEdit            from './Componentes/Hospitales/Edit';
//import PacientesEdit from './Componentes/Pacientes/Edit';
import PacienteEdit            from './Componentes/Pacientes/Edit';
import ResponsablesEdit        from './Componentes/Responsables/edit';

/**
 * FrontEnd
 */
import MenuItems               from './Componentes/FrontEnd/menu.js';
import clsx                    from 'clsx';
import {makeStyles}            from '@material-ui/core/styles';
import CssBaseline             from '@material-ui/core/CssBaseline';
import Drawer                  from '@material-ui/core/Drawer';
import AppBar                  from '@material-ui/core/AppBar';
import Toolbar                 from '@material-ui/core/Toolbar';
import Typography              from '@material-ui/core/Typography';
import IconButton              from '@material-ui/core/IconButton';
import Container               from '@material-ui/core/Container';
import MenuIcon                from '@material-ui/icons/Menu';
import ChevronLeftIcon         from '@material-ui/icons/ChevronLeft';

// function Access (modulo, acceso) {
//   const {obtenerUsuario: {Rol}} = this.props.session;
//   let resultadoBusqueda;
//   const rest                    = Rol.map ((data, index) => {
//     return data.Permiso.map ((per, index_p) => {
//       if (per.Nombre == modulo) {
//         return per.Opcion.map ((op, index_O) => {
//           if (op.Nombre === acceso) {
//             resultadoBusqueda = op.Activo;
//             return op.Activo;
//           } else {
//             return false;
//           }
//         });
//       } else {
//         return false;
//       }
//
//     });
//   });
//
//
//   return !!resultadoBusqueda;
// }
/*function Copyright () {
  return (
     <Typography variant="body2" color="textSecondary" align="center">
       { 'Copyright © ' }
       <Link color="inherit" href="https://material-ui.com/">
         Decimo Semestre UMG
       </Link>{ ' ' }
       { new Date ().getFullYear () }
       { '.' }
     </Typography>
  );
}*/

const drawerWidth = 180;

const useStyles = makeStyles (theme => ({
  root:             {
    display: 'flex'
  },
  toolbar:          {
    paddingRight: 22
  },
  toolbarIcon:      {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'flex-end',
    padding:        '0 8px',
    ...theme.mixins.toolbar
  },
  appBar:           {
    zIndex:     theme.zIndex.drawer + 1,
    transition: theme.transitions.create ([
                                            'width',
                                            'margin'
                                          ], {
                                            easing:   theme.transitions.easing.sharp,
                                            duration: theme.transitions.duration.leavingScreen
                                          })
  },
  appBarShift:      {
    marginLeft: drawerWidth,
    width:      `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create ([
                                            'width',
                                            'margin'
                                          ], {
                                            easing:   theme.transitions.easing.sharp,
                                            duration: theme.transitions.duration.enteringScreen
                                          })
  },
  menuButton:       {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title:            {
    flexGrow: 1
  },
  drawerPaper:      {
    position:   'relative',
    whiteSpace: 'nowrap',
    width:      drawerWidth,
    transition: theme.transitions.create ('width', {
      easing:   theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX:                     'hidden',
    transition:                    theme.transitions.create ('width', {
      easing:   theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width:                         theme.spacing (0),
    [theme.breakpoints.up ('sm')]: {
      width: theme.spacing (6)
    }
  },
  appBarSpacer:     theme.mixins.toolbar,
  content:          {
    flexGrow: 1,
    height:   '100vh',
    overflow: 'auto'
  },
  container:        {
    paddingTop:    theme.spacing (4),
    paddingBottom: theme.spacing (4)
  },
  paper:            {
    padding:       theme.spacing (2),
    display:       'flex',
    overflow:      'auto',
    flexDirection: 'column'
  },
  fixedHeight:      {
    height: 200
  }
}));

const App = ({refetch, session}) => {
  
  /**
   * @return {boolean}
   */
  function Access (modulo, acceso) {
    
    if (obtenerUsuario) {
      const {obtenerUsuario: {Rol}} = session;
      let resultadoBusqueda;
      // eslint-disable-next-line
      const rest                    = Rol.map ((data, index) => {
        return data.Permiso.map ((per, index_p) => {
          
          if (per.Nombre === modulo) {
            return per.Opcion.map ((op, index_O) => {
              
              if (op.Nombre === acceso) {
                
                resultadoBusqueda = op.Activo;
                return op.Activo;
              } else {
                return false;
              }
            });
          } else {
            return false;
          }
          
        });
      });
      
      return !!resultadoBusqueda;
    }
    return false;
  }
  
  const {obtenerUsuario} = session;
  
  const menu = (obtenerUsuario) ? obtenerUsuario.Rol[0] : [];
  
  const mensaje = (obtenerUsuario) ? `Bienvenido: ${ obtenerUsuario.Nombre }` : <Redirect to='/Login'/>;
  
  //console.log (obtenerUsuario);
  
  const classes         = useStyles ();
  const [open, setOpen] = React.useState (!!obtenerUsuario);
  
  const handleDrawerOpen  = () => {
    setOpen (true);
  };
  const handleDrawerClose = () => {
    setOpen (false);
  };
  if (true) {
    return (
       <Router>
         <Fragment>
           <div className={ classes.root }>
             <CssBaseline/>
             <AppBar position="absolute" className={ clsx (classes.appBar, open &&
                classes.appBarShift) }>
               <Toolbar className={ classes.toolbar }>
                 <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={ handleDrawerOpen }
                    className={ clsx (classes.menuButton,
                                      open && classes.menuButtonHidden) }
                 >
                   <MenuIcon/>
                 </IconButton>
                 <Typography component="h2" variant="h6" color="inherit" noWrap
                             className={ classes.title }>
                   ALBERGUE COATEPEQUE
                 </Typography>
                 
                 { (obtenerUsuario) && (
                    <CerrarSesion/>
                 )
                 }
               </Toolbar>
             </AppBar>
             <Drawer
                variant="permanent"
                classes={ {
                  paper: clsx (classes.drawerPaper,
                               !open && classes.drawerPaperClose)
                } }
                open={ open }
             >
               <div className={ classes.toolbarIcon }>
                 <IconButton onClick={ handleDrawerClose }>
                   <ChevronLeftIcon/>
                 </IconButton>
               </div>
               { (obtenerUsuario) && (
                  < MenuItems Menus={ menu } Access={ Access } login={ true } refetch={ refetch }/>
               ) }
             </Drawer>
             
             <main className={ classes.content }>
               <div className={ classes.appBarSpacer }/>
               <Container maxWidth="lg" className={ classes.container }>
                 <div className="container">
                   { mensaje }
                   <Switch>
                     
                     
                     <Route exact path="/" render={ () => <Index/> }/>
                     <Route exact path="/MovimientoInventario/Edit/:id"
                            render={ () => <MovimientoInventarioEditar session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     <Route exact path="/MovimientoInventario"
                            render={ () => <MovimientoInventario session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/MovimientoCaja" render={ () => <Caja session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/AsignacionPaciente" render={ () => <AsignacionPaciente session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/AsignacionPaciente/Registros" render={ () => <RegistroAsignacion session={ session } refetch={ refetch } Access={ Access }/> }/>

                     <Route exact path="/Caja" render={ () => <CajaChica session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Cajas/Edit/:id" render={ () => <CajaEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Cajas/entradaSalida" render={ () => <CajaentradaSalida session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Clientes" render={ () => <Clientes session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Clientes/Nuevo" render={ () => <ClientesNuevo session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Clientes/Edit/:id" render={ () => <ClientesEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Responsables" render={ () => <Responsable session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Responsables/Nuevo" render={ () => <ResponsableNuevo session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Responsables/Edit/:id" render={ () => <ResponsablesEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Donaciones" render={ () => <Donacion session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Donaciones/Nuevo" render={ () => <DonacionNuevo session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Donaciones/Edit/:id" render={ () => <DonacionEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Productos" render={ () => <Productos session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Productos/Nuevo" render={ () => <ProductosNuevo session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Productos/Edit/:id" render={ () => <ProductosEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Hospitales/Edit/:id" render={ () => <HospitalEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Usuarios" render={ () => <Usuarios session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Usuarios/Nuevo"
                            render={ () => <UsuariosNuevo session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Usuarios/Edit/:id"
                            render={ () => <UsuariosEditar session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Edificios" render={ () => <Edificio session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Edificios/Nuevo" render={ () => <NuevoEdificio session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Edificios/Edit/:id" render={ () => <EdificioEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                    
                     <Route exact path="/VerEdificios/:idCliente" render={ () => <VerEdificios session={ session } refetch={ refetch } Access={ Access }/> }/>
                      <Route exact path="/AsignacionCliente/Edit/:idCliente&:idEdificio" render={ () => <AsignacionCliente session={ session } refetch={ refetch } Access={ Access }/> }/>
                 
                      <Route exact path="/AsignacionCliente/Registros" render={ () => <RegistroAsignacionCliente session={ session } refetch={ refetch } Access={ Access }/> }/>

                     <Route exact path="/Pacientes" render={ () => <Pacientes session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Pacientes/Nuevo" render={ () => <PacienteNuevo session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Pacientes/Edit/:id" render={ () => <PacienteEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     <Route exact path="/Hospitales" render={ () => <Hospitales session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Hospitales/Nuevo" render={ () => <HospitalNuevo session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     <Route exact path="/MovimientoInventario/Nuevo"
                            render={ () => <EntradaSalidaInventario session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     
                     {/*  Mantenimientos*/ }
                     <Route exact path="/Mantenimientos/ListaDeValores"
                            render={ () => <ListaDeValores session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Mantenimientos/ListaDeValores/Edit/:id"
                            render={ () => <ListaDeValoresEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     <Route exact path="/Login" render={ () => <Login refetch={ refetch }/> }/>
<Route exact path="/Reportes" render={ () => <Vendedores session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     <Route exact path="/Permisos" render={ () => <Permisos session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Permisos/Nuevo"
                            render={ () => <NuevoPermisos session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Permisos/Edit/:id"
                            render={ () => <PermisosEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     <Route exact path="/Roles" render={ () => <Roles session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Roles/Nuevo"
                            render={ () => <NuevosRoles session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/Roles/Edit/:id"
                            render={ () => <RolesEdit session={ session } refetch={ refetch } Access={ Access }/> }/>
                     <Route exact path="/AsignarPermisos"
                            render={ () => <Aginacionrxp session={ session } refetch={ refetch } Access={ Access }/> }/>
                     
                     {/*  AsignacionClientes*/ }
                     <Route path="*" render={ () => <InternalServer status={ 404 } encontrado={ false }/> }/>
                   </Switch>
                 </div>
               
               </Container>
             
             </main>
           </div>
         </Fragment>
       </Router>
    );
  }
};

const RootSession = Session (App);

export {RootSession};
