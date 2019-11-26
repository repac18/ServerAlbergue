import React, {Component} from 'react';

import MenuBar            from '../../Seguridad/Menu';

class MenuItems extends Component {
  constructor (props) {
    super (props);
    
    this.menus = props.Menus;
    this.login = props.login;
    
  }
  
  render () {
    return (
       <MenuBar Access={ this.props.Access } refetch={ this.props.refetch } />
    );
  }
}

export default MenuItems;