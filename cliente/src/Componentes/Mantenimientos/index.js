import React, {Component}                                                             from 'react';
import {front}                                                                        from '../FrontEnd/frontEnd';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';

class Mantenimintos extends Component {
  base  = new front ();
  state = {
    modal: false
  };
  
  toggle = () => {
    this.setState ({
                     modal: !this.state.modal
                   });
  };
  
  render () {
    return (
       <MDBContainer>
         <MDBBtn onClick={ this.toggle }>Modal</MDBBtn>
         <MDBModal isOpen={ this.state.modal } toggle={ this.toggle } fullHeight position="left">
           <MDBModalHeader toggle={ this.toggle }>MDBModal title</MDBModalHeader>
           <MDBModalBody>
             (...)
           </MDBModalBody>
           <MDBModalFooter>
             <MDBBtn color="secondary" onClick={ this.toggle }>Close</MDBBtn>
             <MDBBtn color="primary">Save changes</MDBBtn>
           </MDBModalFooter>
         </MDBModal>
       </MDBContainer>
    );
  }
}

export default Mantenimintos;