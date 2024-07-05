import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataProps } from './Users';
import { User } from './UsersContainer';
import React from 'react';

// type DataTable = {
//   user: User,
//   edit: (id: string | number ) => React.ReactNode,
//   remove: (id: string | number) => React.ReactNode
// }

function createData(user: User, edit: (id: string | number | undefined ) => React.JSX.Element, remove: (id: string | number | undefined ) => React.JSX.Element){

    const dataTable = { 
      ...user,
      edit: edit(user.id),
      remove: remove(user.id)
      };
    return dataTable
}



const TableList: React.FC<DataProps> = ({data, edit, remove}) => {

  const rows = data?.map(user => createData(user, edit, remove));

  const columns = data?.length > 0 ? Object.keys(rows[0]): [];

    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns?.map((columnName)=> <TableCell key={columnName}> {columnName}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns?.map((columnName, colIndex) => (
                 <TableCell key={colIndex} component="th" scope="row">
                 {row[columnName]}
               </TableCell>
              ))}
             
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default TableList;