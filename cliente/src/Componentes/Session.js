import React from 'react'
import {Query} from 'react-apollo';
import {USUARIO_ACTUAL} from '../../src/GraphQl/Querys/Auth.js'

const Session =Component=>props=>( //esto es un AOC ALL ORDER COMPONENT estos rodena a todo lo que este adentro en los componetes
    <Query query={USUARIO_ACTUAL}>
    {({loading,error,data,refetch})=>{
        if(loading) return  null;
        return  <Component  {...props} refetch={refetch} session={data}/>
            }}
    </Query>
);


export default Session;