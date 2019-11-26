import React, {Fragment}                                     from 'react';
import {Query}                                               from 'react-apollo';
import {reportes}                                            from '../../GraphQl/Querys/reportes';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

// const data = [
//       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];

const Vendedores = () => {
  const VendedoresGrafica = [];
  return (
     <Query query={ reportes }>
       { ({loading, error, data}) => {
         if (loading) return 'Cargando';
         if (error) return `Error ${ error.message }`;
         
         data.reportesasigClier1.map ((vendedor, index) => {
           return VendedoresGrafica[index] = {
             Edificio: vendedor._id,
             Total:    vendedor.Total
           };
         });
         
         const reportesasigClier2 = [];
         
         data.reportesasigClier2.map ((vendedor, index) => {
           return reportesasigClier2[index] = {
             Edificio: vendedor._id,
             Total:    vendedor.Total
           };
         });
         
         const reportesasigpas1 = [];
         
         data.reportesasigpas1.map ((vendedor, index) => {
           return reportesasigpas1[index] = {
             Fecha: new Date (Number (vendedor._id)).toISOString ().substring (0, 10),
             Total: vendedor.Total
           };
         });
         
         const reportesasigpas2 = [];
         
         data.reportesasigpas2.map ((vendedor, index) => {
           return reportesasigpas2[index] = {
             Cliente: vendedor._id[0].Municipio,
             Total:   vendedor.Total
           };
         });
         
         const reportesproducr1 = [];
         
         data.reportesproducr1.map ((vendedor, index) => {
           return  reportesproducr1[index] = {
             Nombre: vendedor._id,
             Total:  vendedor.Total
           };
         });
         
         const reportesdonacior1 = [];
         
         data.reportesdonacior1.map ((vendedor, index) => {
           return reportesdonacior1[index] = {
             Fecha: new Date (Number (vendedor._id)).toISOString ().substring (0, 10),
             Total: vendedor.Total
           };
         });
         return (
            <Fragment>
              <Fragment>
                <h1 className="text-center my-5">Total de clientes hospedados</h1>
                <BarChart
                   width={ 900 }
                   height={ 300 }
                   data={ VendedoresGrafica }
                   margin={ {top: 5, right: 30, left: 20, bottom: 5} }
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Edificio"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="Total" fill="#82ca9d"/>
                </BarChart>
              </Fragment>
              
              
              <Fragment>
                <h1 className="text-center my-5">Total de clientes que se hospedaron</h1>
                <BarChart
                   width={ 900 }
                   height={ 300 }
                   data={ reportesasigClier2 }
                   margin={ {top: 5, right: 30, left: 20, bottom: 5} }
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Edificio"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="Total" fill="#ADD8E6"/>
                </BarChart>
              </Fragment>
              
              
              <Fragment>
                <h1 className="text-center my-5">Total de pacientes asignados por fecha</h1>
                <BarChart
                   width={ 900 }
                   height={ 300 }
                   data={ reportesasigpas1 }
                   margin={ {top: 5, right: 30, left: 20, bottom: 5} }
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Fecha"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="Total" fill="#B0E0E6"/>
                </BarChart>
              </Fragment>
              
              
              <Fragment>
                <h1 className="text-center my-5">Total Clientes Segun municipio</h1>
                <BarChart
                   width={ 900 }
                   height={ 300 }
                   data={ reportesasigpas2 }
                   margin={ {top: 5, right: 30, left: 20, bottom: 5} }
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Cliente"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="Total" fill="	#00CED1"/> {/* colorreportes  todos los fill*/ }
                </BarChart>
              </Fragment>
              
              
              <Fragment>
                <h1 className="text-center my-5">Total de existencias de productos</h1>
                <BarChart
                   width={ 900 }
                   height={ 300 }
                   data={ reportesproducr1 }
                   margin={ {top: 5, right: 30, left: 20, bottom: 5} }
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Nombre"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="Total" fill="#AFEEEE"/>
                </BarChart>
              </Fragment>
              
              
              <Fragment>
                <h1 className="text-center my-5">Cantidad de Donaciones por fecha</h1>
                <BarChart
                   width={ 900 }
                   height={ 300 }
                   data={ reportesdonacior1 }
                   margin={ {top: 5, right: 30, left: 20, bottom: 5} }
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="Fecha"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="Total" fill="#87CEFA"/>
                </BarChart>
              </Fragment>
            
            </Fragment>
         );
       } }
     </Query>
  );
};

export default Vendedores;
