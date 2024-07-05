import React from 'react';

import useUsers from '../../hooks/useUsers';
import Users from './Users';

export interface User {
  id?: string |number;
  name?: string;
}

const UsersContainer: React.FC = () => {
  const { data, refetch, isLoading, error } = useUsers();

  const updateUsers = async (id: number|undefined) => { 
    console.log(id,   'id')

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
    id: Math.random(),
    name: 'Polar'
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

const createEditButton = (id: number) => {
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
        <button onClick={() => inserUser()}>Inserir polar</button>

        <Users data={data} edit={createEditButton} remove={createDeleteButton}/>
        </>
      ) : (
        <span>{JSON.stringify(error)}</span>
      )}

        
      
    </div>
  );
};

export default UsersContainer;
