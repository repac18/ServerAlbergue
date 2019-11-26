import React, {Component} from 'react';
import './InternalServer.css';

class internalServer extends Component {
  render () {
   return (
      <div>
        <redirect to='/' />
      </div>
   )
   
  }
}

export default internalServer;