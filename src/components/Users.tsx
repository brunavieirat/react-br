import React from 'react';
import TableList from './UsersTable';
import { User } from './UsersContainer';

export type DataProps = {
  data: User[],
  edit: (user: User) => React.JSX.Element,
  remove: (id: number | string) => React.JSX.Element;
}

const Users: React.FC<DataProps> = ({data, edit, remove}) => {
  return (
   <TableList data={data} edit={edit} remove={remove}/>
  );
};

export default Users;
