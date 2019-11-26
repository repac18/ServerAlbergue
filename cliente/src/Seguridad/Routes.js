import React, {Component}       from 'react';
import {ListItem, ListItemIcon} from '@material-ui/core';
import {Link as RouterLink}     from 'react-router-dom';
import {
  Assessment,
  Business,
  Home,
  Info,
  LocalHospital,
  LocalParking,
  MonetizationOn,
  People,
  Person,
  SettingsApplications,
  PersonPin,
  Timeline,
  VpnKey,
  Work,
  FiberManualRecordOutlined

}                               from '@material-ui/icons';
import ListItemText             from '@material-ui/core/ListItemText';

export class Routes extends Component {
  /**
   * @typedef {{
   *   Nombre:String,
   *   Ruta:String,
   *   Icon: String,
   *   Vista: Boolean,
   *   Children:[]
   * }} itemRoutes
   */
  constructor (props) {
    super (props);
    this.login = props.login;
    this.Link1 = React.forwardRef ((props, ref) => <RouterLink innerRef={ ref } { ...props } />);
    /**
     *
     * @type {Array.<itemRoutes>}
     */
    this.routes = [
      {Nombre: 'Inicio', Ruta: '/', Icon: 'Inicio', Vista: true},
      {Nombre: 'Clientes', Ruta: '/Clientes', Icon: 'Clientes', Vista: true},
      {Nombre: 'Pacientes', Ruta: '/Pacientes', Icon: 'Pacientes', Vista: true},
      {Nombre: 'Hospitales', Ruta: '/Hospitales', Icon: 'Hospitales', Vista: true},
      {Nombre: 'Caja', Ruta: '/Caja', Icon: 'Cajas', Vista: true},
      {Nombre: 'Movimiento Caja', Ruta: '/MovimientoCaja', Icon: 'Default', Vista: true},
      {Nombre: 'Movimiento Inventario', Ruta: '/MovimientoInventario', Icon: 'Default', Vista: true},
      {Nombre: 'Usuarios', Ruta: '/Usuarios', Icon: 'Usuarios', Vista: true},
      {Nombre: 'Edificios', Ruta: '/Edificios', Icon: 'Edificios', Vista: true},
      {Nombre: 'Asignar Clientes', Ruta: '/AsignacionClientes', Icon: 'Edificios', Vista: true},
      {Nombre: 'Donaciones', Ruta: '/Donaciones', Icon: 'Donaciones', Vista: true},
      {Nombre: 'Productos', Ruta: '/Productos', Icon: 'Productos', Vista: true},
      {Nombre: 'Mantenimientos', Ruta: '/Mantenimientos/ListaDeValores', Icon: 'Mantenimientos', Vista: true},
      {Nombre: 'Permisos', Ruta: '/Permisos', Icon: 'Permisos', Vista: true},
      {Nombre: 'Roles', Ruta: '/Roles', Icon: '', Vista: true},
      {Nombre: 'Asignar Permiso', Ruta: '/AsignarPermisos', Icon: 'Default', Vista: true},
      {Nombre: 'Reportes', Ruta: '/Reportes', Icon: 'Reportes', Vista: true},
      {Nombre: 'Responsables', Ruta: '/Responsables', Icon: 'Reportes', Vista: true}
    ];
    this.menu = [];
    if (this.routes.length !== null || this.routes.length > 0) {
      if (!this.login) {
        this.routes = [];
      }
      this.getMenu ();
    }
  }
  
  /**
   *
   * @returns {Array}
   */
  getMenu () {
    // eslint-disable-next-line
    this.menu = this.routes.map ((item) => {
                                   if (this.props.Access (item.Nombre, 'Acceder')) {
                                     return (<ListItem button key={ item.Ruta } component={ RouterLink } to={ item.Ruta }>
                                       <ListItemIcon>
                                         { Routes.getIcon (item.Icon) }
                                       </ListItemIcon>
                                       <ListItemText primary={ item.Nombre }/>
                                     </ListItem>);
                                   }
                                 }
    );
    // eslint-disable-next-line
    this.props.refetch ();
    return this.menu;
  }
  
  /***
   * No colocar ";"
   * @param icon
   * @returns {*}
   */
  static getIcon (icon = '') {
    switch (icon) {
      case 'Inicio':
        return <Home/>;
      case 'Clientes':
        return <People/>;
      case 'Pacientes':
        return <Person/>;
      case 'Hospitales':
        return <LocalHospital/>;
      case 'Cajas':
        return <Work/>;
      case 'Reportes':
        return <Timeline/>;
      case 'Inventarios':
        return <Assessment/>;
      case 'Usuarios':
        return <PersonPin/>;
      case 'Edificios':
        return <Business/>;
      case 'Donaciones':
        return <MonetizationOn/>;
      case 'Productos':
        return <LocalParking/>;
      case 'Mantenimientos':
        return <SettingsApplications/>;
      case 'Permisos':
        return <VpnKey/>;
      case 'Info':
        return <Info/>;
      default:
        return <FiberManualRecordOutlined/>;
    }
  }
  
  render () {
    return (
       this.menu
    );
  }
  
}