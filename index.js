import express from 'express';
import cors from 'cors';
import path from 'path';
// graphql

import {ApolloServer} from 'apollo-server-express';
import {resolvers} from './Data/Resolvers/Resolvers';
import typeDefs from './Data/Schema/master.graphql';

import jwt from 'jsonwebtoken';

const app=express();

app.use(express.static(path.join(__dirname, 'cliente/build')));


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:async ({req})=>{
        //obtener el token del servidor
        const token=req.headers['authorization'];

        if(token !=="null"){
            try {
                // Verificar el token del front end (cliente)
                const usuarioActual=await jwt.verify(token,process.env.SECRETO);
                // agregamos el usuario actual al request

                req.usuarioActual=usuarioActual;
                return{
                    usuarioActual
                };

            } catch (err) {
                // console.log(err);
            }

        }
    }
  });
  
  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/cliente/build/index.html'));
});
  

const port = process.env.PORT || 4000;
server.applyMiddleware({app});
app.listen({port},()=>console.log(`El servidor esta corriendo http://localhost:${port}${server.graphqlPath}`));
