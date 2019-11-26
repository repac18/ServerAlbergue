import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const initialState = {
    id:"",
    Nombre:"",
    Descripcion:""
  }

 class SelectRol extends Component {
    
    constructor(props){
        super(props)
        this.state = {
       Roles:this.props.Roles
        };
    }
 
	ClearState = () => {
		this.setState({
			...initialState
		});
	};

componentWillUnmount(){
    this.ClearState();
  }


  render() {
    
    return (
     <Fragment>
     
        <div className="form-group">
            <label>Roles:</label>
  

<Select
					onChange={this.props.SelectRol}
					options={this.state.Roles}
					isMulti={false}
					components={makeAnimated()}
					placeholder={'Seleccionar el Rol'}
					getOptionLabel={(options) => options.Nombre}
					getOptionValue={(options) => options.id}
					value={this.props.rol}
				/>  
 </div>
        </Fragment>
    )
  }
}

export default withRouter(SelectRol);