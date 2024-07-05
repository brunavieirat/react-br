import React, { useRef, useState } from 'react';
import useUsers from '../hooks/useUsers';
import Users from './Users';
import FormDialog, { FormData, FormDialogHandles } from './Modal';

export interface User {
  id?: number | string;
  name: string;
  email: string;
}

const UsersContainer: React.FC = () => {
  const formDialogRef = useRef<FormDialogHandles>(null);
  const [selectedUser, setSelectedUser] = useState<FormData | undefined>(undefined); // Estado para controlar o usuário selecionado para edição

  const { data, refetch, isLoading, error } = useUsers();

  const openFormDialog = (user?: User) => {
    setSelectedUser(user ? { id: user.id, name: user.name, email: user.email } : undefined); // Define o usuário selecionado para edição se existir
    formDialogRef.current?.openDialog();
  };

  const deleteUser = async (id: number | undefined) => {
    await fetch(`/users/${id}`, {
      method: 'DELETE',
    }).then(() => {
      refetch();
    });
  };

  const createEditButton = (user: User) => {
    return <button onClick={() => openFormDialog(user)}>Editar</button>;
  };

  const createDeleteButton = (id: number | undefined) => {
    return <button onClick={() => deleteUser(id)}>Excluir</button>;
  };

  return (
    <div>
      {isLoading ? (
        <span>Loading...</span>
      ) : data ? (
        <>
          <FormDialog ref={formDialogRef} initialData={selectedUser} />
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
