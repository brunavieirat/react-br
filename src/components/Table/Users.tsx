import React, { useEffect, useState } from 'react';

export interface Post {
  id?: number;
  title?: string;
  body?: string;
  name?: string;
}

const Users: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  const getPosts = async () => { 
    await fetch('/posts')
      .then(response => {

        if(response.ok){
         return response.json(); 
        }})
      .then((res) => {
        setData(res)
   })      
  }

  const updatePosts = async (id: number|undefined) => { 
    console.log(id,   'id')
    await fetch(`/posts/${id}`,  {
      method: "PATCH",
      body: JSON.stringify({name:'Lince'}),
    })
      .then(response => {

        if(response.ok){
         return response.json(); 
        }})
      .then((res) => {
        getPosts();
      
   })      
  }

  const deletePost = async (id: number|undefined) => { 
    console.log(id,   'id')
    await fetch(`/posts/${id}`,  {
      method: "DELETE",
      body: JSON.stringify({name:'Lince'}),
    })
      .then(response => {

        if(response.ok){
         return response.json(); 
        }})
      .then((res) => {
        // console.log(res, 'res')
        getPosts();
      
   })      
  }

  useEffect(() => {

  getPosts();
}, []);

const inserPost = async () => { 
  const teste: Post = {
    id: 12121,
    name: 'Polar'
  }

  await fetch('/posts', {
    method: "POST",
    body: JSON.stringify(teste),
  })
    .then(response => {

      if(response.ok){
       return response.json(); //then consume it again, the error happens
      }})
    .then((res) => {
      console.log(res, 'res')
      getPosts();
      // setData(res)
 })
    
}

  return (
    <div>
      {data?.map(({id, name}) =>(
        <div key={id}> <p> {name}</p>
        <button onClick={ () => updatePosts(id)}>edit</button>
        <button onClick={ () => deletePost(id) }>delete</button>
         </div>

         ))}
         <button onClick={() => inserPost()}>Inserir polar</button>
      
    </div>
  );
};

export default Users;
