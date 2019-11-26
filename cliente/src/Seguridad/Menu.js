import React, {Component}       from 'react';
import {ListItem, ListItemIcon} from '@material-ui/core';
import {Link as RouterLink}     from 'react-router-dom';
import menuItems                from '../Componentes/FrontEnd/items';
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
  FiberManualRecordOutlined,
  ExpandLess,
  ExpandMore,
  Security,
  CompareArrows,
  WhereToVote
  
}                               from '@material-ui/icons';
import ListItemText             from '@material-ui/core/ListItemText';
import Collapse                 from '@material-ui/core/Collapse';
import withStyles               from '@material-ui/core/styles/withStyles';

const styles = {
  list:       {
    width: 20
  },
  links:      {
    textDecoration: 'none'
  },
  menuHeader: {
    paddingLeft: '20px'
  }
};

class MenuBar extends Component {
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
    this.state = {};
    this.login = props.login;
    this.Link1 = React.forwardRef ((props, ref) => <RouterLink innerRef={ ref } { ...props } />);
    /**
     *
     * @type {Array.<itemRoutes>}
     */
    this.routes = [];
    this.menu = [];
  }
  
  /**
   *
   * @returns {Array}
   */
  getMenu (children) {
    const {state} = this;
    return children.map ((subOption) => {
      
      if (!subOption.children) {
        if (this.props.Access (subOption.name, 'Acceder')) {
          return (
             <div key={ subOption.name + subOption.title }>
               <ListItem
                  button
                  key={ subOption.name + subOption.title }
                  to={ subOption.url }
                  component={ RouterLink }>
                 <ListItemIcon>
                   { MenuBar.getIcon (subOption.Icon) }
                 </ListItemIcon>
                 <ListItemText
                    primary={ subOption.title }
                 />
               </ListItem>
             </div>
          );
        } else {
          return false;
        }
        
      }
      return (
         <div key={ subOption.title }>
           <ListItem
              button
              onClick={ () => this.handleClick (subOption.title) }>
             <ListItemIcon>
               { MenuBar.getIcon (subOption.Icon) }
             </ListItemIcon>
             <ListItemText
                primary={ subOption.title }/>
             { state[subOption.name] ?
               <ExpandLess/> :
               <ExpandMore/>
             }
           </ListItem>
           <Collapse
              in={ state[subOption.title] }
              timeout="auto"
              unmountOnExit
           >
             { this.getMenu (subOption.children) }
           </Collapse>
         </div>
      );
      
    });
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
      case 'Seguridad':
        return <Security/>;
      case 'Movimientos':
        return <CompareArrows/>;
      case 'Asignacion':
        return <WhereToVote/>;
      default:
        return <FiberManualRecordOutlined/>;
    }
  }
  
  handleClick (item) {
    this.setState (prevState => (
       {[item]: !prevState[item]}
    ));
  }
  
  render () {
    return (
       this.getMenu (menuItems)
    );
  }
  
}

export default withStyles (styles) (MenuBar);