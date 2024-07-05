import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import { User } from './UsersContainer';

interface DataProps {
  data: User[];
  edit: (user: User) => React.ReactNode;
  remove: (id: number | string) => React.ReactNode;
}

function TableList({ data, edit, remove }: DataProps) {
  const rows = data?.map(user => ({
    ...user,
    edit: edit(user),
    remove: remove(user.id)
  }));

  const columns = data?.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns?.map((columnName) => (
              <TableCell key={columnName}> {columnName}</TableCell>
            ))}
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns?.map((columnName, colIndex) => (
                <TableCell key={colIndex}>{row[columnName]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableList;
