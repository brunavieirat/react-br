import React, { useRef, useState } from 'react';
import useUsers from '../hooks/useUsers';
import Users from './Users';
import RegisterFormModal from './RegisterFormModal';
import { FormData, FormDialogHandles } from './types';

export interface User {
  id?: number | string;
  name: string;
  email: string;
}

const UsersContainer: React.FC = () => {
  const formDialogRef = useRef<FormDialogHandles>(null);
  const [selectedUser, setSelectedUser] = useState<FormData>(); 

  const { data, refetch, isLoading, error } = useUsers();

 

  const deleteUser = async (id: number | string) => {
    await fetch(`/users/${id}`, {
      method: 'DELETE',
    }).then(() => {
      refetch();
    });
  };

  const openFormDialog = () => {
    formDialogRef.current?.openDialog();
  };

  const updateUser = (user: User) => {
    setSelectedUser(user);
    openFormDialog();
  };

  const createEditButton = (user: User) => {
    return <button onClick={() => updateUser(user)}>Editar</button>;
  };

  const createDeleteButton = (id: number | string) => {
    return <button onClick={() => deleteUser(id)}>Excluir</button>;
  };

  return (
    <div>
      {isLoading ? (
        <span>Loading...</span>
      ) : data ? (
        <>
          <RegisterFormModal ref={formDialogRef} initialData={selectedUser} />
          <button onClick={() => openFormDialog()}>Inserir Usuário</button>
          <Users data={data} edit={createEditButton} remove={createDeleteButton} />
        </>
      ) : (
        <span>{JSON.stringify(error)}</span>
      )}
    </div>
  );
};

export default UsersContainer;
