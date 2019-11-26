import ReactContent from 'sweetalert2-react-content';
import Swal         from "sweetalert2";
import React        from 'react';

export default class swal2 {
  swal2 = ReactContent (Swal);
  
  success (tipo = '', messege = '', header = '') {
    switch (tipo) {
      case 'create':
        messege = messege === '' ? 'EL REGISTRO A SIDO AGREADO' : messege;
        header  = header === '' ? 'CREADO' : header;
        break;
      case 'edit':
        messege = messege === '' ? 'EL REGISTRO A SIDO EDITADO' : messege;
        header  = header === '' ? 'EDITADO' : header;
        break;
      case 'delete':
        messege = messege === '' ? 'EL REGISTRO A SIDO ELIMIADO' : messege;
        header  = header === '' ? 'ELIMINADO' : header;
        break;
      default:
        messege = messege === '' ? 'EL REGISTRO A SIDO AGREADO' : messege;
        header  = header === '' ? 'CREADO' : header;
        break;
    }
    return this.swal2.fire ({
                              title:             header,
                              text:              messege,
                              type:              'success',
                              showConfirmButton: false,
                              timer:             2000
                            }
    );
  }
  
  create (tipo = '', messege = '') {
    let type = '';
    switch (tipo) {
      case 'create':
        messege = messege === '' ? '¿DESEA CREAR EL REGISTRO?' : messege;
        break;
      case 'edit':
        messege = messege === '' ? '¿DESEA EDITAR EL REGISTRO?' : messege;
        break;
      case 'delete':
        messege = messege === '' ? '¿DESEA ELIMINAR EL REGISTRO?' : messege;
        type    = 'warning';
        break;
      default:
        messege = messege === '' ? '¿DESEA CREAR EL REGISTRO?' : messege;
        break;
    }
    return this.swal2.fire ({
                              title:             <p>ADVERTENCIA</p>,
                              text:              messege,
                              type:              type,
                              footer:            'UMG Copyright 2019',
                              showCancelButton:  true,
                              confirmButtonText: 'Si!',
                              cancelButtonText:  'No'
                            });
  }
  
  error (messege = '') {
    return this.swal2.fire ({
                              type:  'error',
                              title: 'INFORMACION',
                              text:  messege === '' ? 'A OCURRIDO UN ERROR' : messege
                            });
  }
}