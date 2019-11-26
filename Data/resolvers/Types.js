import mongoose from 'mongoose';
import { rejects } from 'assert';
import {usuarios,permisos,roles} from '../Conexion/db';
const ObjectId=mongoose.Types.ObjectId;



export const types={
    Usuarios: {
    Rol: async ({ Rol }) => {
           let ids
           let RolesDate
     
      try {
        ids = Rol ? Rol.map(Roles => ObjectId(Roles.id)) : []
         RolesDate = ids.length > 0
          ? await roles.find({ _id: { $in: ids } }          )
          : []
      
      } catch (error) {
        console.error(error)
      }

      return RolesDate
    }
  }
}