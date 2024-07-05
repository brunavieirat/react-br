import React, { useRef, useState } from 'react';

import useUsers from '../hooks/useUsers';
import Users from './Users';
import FormModal, { FormDialogHandles } from './Modal';

export interface User {
  id: number | string;
  name: string;
  email: string;
}

const UsersContainer: React.FC = () => {
  const formDialogRef = useRef<FormDialogHandles>(null);
  const [user, setUser] = useState<User>();

  const openFormDialog = () => {
    formDialogRef.current?.openDialog();
  };

  const initialData: User = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  const { data, refetch, isLoading, error } = useUsers();

  const updateUsers = async (id: number|string) => { 
    console.log(id, 'id')

    await fetch(`/users/${id}`,  {
      method: "PATCH",
      body: JSON.stringify({name:'Lince'}),
    })
      .then(response => {

        if(response.ok){
         return response.json(); 
        }})
      .then(() => {
        refetch()
      
   })      
  }

  const deleteUser = async (id: number|undefined) => { 
    console.log(id,   'id')
    await fetch(`/users/${id}`,  {
      method: "DELETE",
      body: JSON.stringify({name:'Lince'}),
    })
      .then(response => {

        if(response.ok){
         return response.json(); 
        }})
      .then(() => {
        refetch();
      
   })      
  }


const inserUser = async () => { 
  const teste: User = {
    id: Math.random().toFixed(4),
    name: 'Polar',
    email: 'polar@hotmail.com'
  }

  await fetch('/users', {
    method: "POST",
    body: JSON.stringify(teste),
  })
    .then(response => {

      if(response.ok){
       return response.json();
      }})
    .then((res) => {
      console.log(res, 'res')
      refetch();
 })
    
}

const createEditButton = (user: User) => {
  const { id } = user;
  // setUser(user);
  return <button onClick={ () => updateUsers(id)}>Edit</button>
}

const createDeleteButton = (id: number) => {
  return <button onClick={ () => deleteUser(id) }>Delete</button>
}
  return (

    <div>
       {isLoading ? (
        <span>Loading...</span>
      ) : data ? (
        <>
        <FormModal ref={formDialogRef} initialData={initialData}/>
        <button  onClick={openFormDialog}>Inserir polar</button>

        <Users data={data} edit={createEditButton} remove={createDeleteButton}/>
        </>
      ) : (
        <span>{JSON.stringify(error)}</span>
      )}

        
      
    </div>
  );
};

export default UsersContainer;
