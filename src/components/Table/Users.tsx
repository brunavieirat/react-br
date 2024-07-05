import React from 'react';
import TableList from './Table';
import { User } from './UsersContainer';

export type DataProps = {
  data: User[],
  edit: (id:  number) => React.JSX.Element,
  remove: (id: number) => React.JSX.Element;
}

const Users: React.FC<DataProps> = ({data, edit, remove}) => {
  return (
   <TableList data={data} edit={edit} remove={remove}/>
  );
};

export default Users;
