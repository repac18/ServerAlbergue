import gql from 'graphql-tag';

export const reportes = gql`

query reportes{
    reportesasigClier1{
      _id
      Total
    },
    reportesasigClier2{_id Total},
    reportesasigpas1{Total _id},
    reportesasigpas2{Total _id{ Municipio}},
    reportesproducr1{Total _id},
    reportesdonacior1{Total _id}
      }
    `;
	

