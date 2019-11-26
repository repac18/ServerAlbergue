import {Textos}     from './Layout/textos';
import {Buttons}    from './Layout/buttons';
import {Messages}   from './Layout/messages';
import {Icons}      from './Layout/icons';
import React        from 'react';
import {Link}       from 'react-router-dom';
import swal2 from '../Scripts/SweetAlert2'

class front {
  text       = new Textos ();
  button     = new Buttons ();
  mensaje    = new Messages ();
  icons      = new Icons ();
  // eslint-disable-next-line
  cardHeader = new CardHeaderIndex (this);
  // eslint-disable-next-line
  table      = new Table (this);
  swal2      = new swal2 ();
}

export {front};

export class CardHeaderIndex {
  constructor (context) {
    this.base = context;
  }
  
  getCard (tittle = '/', url = '/', index = true, listaValor = false) {
    if (index && !listaValor) {
      return (
         <div className="card-header text-center">
           <h5 className="card-title text-center mb-5 textUpper">
             { tittle }
             <Link to={ `/${ url }` }>
               
               <button type="button" className={ this.base.button.GuardarCircle + ' float-right' } data-toggle="tooltip" data-placement="left"
                       title={ this.base.text.Agregar }>
                   <i className={ this.base.icons.cardcreatePlus }>
                   </i>
               </button>
             
             </Link>
           </h5>
         </div>
      );
    }
    if (!index && !listaValor) {
      return (
         <div className="card-header text-center">
           <h4 className="card-title text-center mb-5">
             <Link to={ `/${ url }` }>
               <button type="button" className={ this.base.button.GuardarCircle + ' float-left' } data-toggle="tooltip" data-placement="left"
                       title={ this.base.text.Atras }>
                 <i className={ this.base.icons.btnBack }>
                 </i>
               </button>
             </Link>
             { tittle }
           </h4>
         </div>
      );
    }
    if (listaValor) {
      return (
         <div className="card-header text-center">
           <h4 className="card-title text-center mb-5">
             { tittle }
           </h4>
         </div>
      );
    }
    
  }
}

// eslint-disable-next-line
export class Table {
  constructor (context) {
    this.base = context;
  }
  
  // eslint-disable-next-line
  TableMenu (headers = [], rows = []) {
    if (headers.length < 1) {
      headers = [];
    }
    return this.getColumns (headers);
  }
  
  getColumns (header = []) {
    return (
       <thead>
       <tr className="table-dark text-dark">{ header.map ((item) => <th  key={item.Nombre} scope="col">{ item.Nombre }</th>) }
       </tr>
       </thead>
    );
  }
}