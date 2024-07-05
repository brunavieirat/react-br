import { useEffect } from "react";
import { useQuery } from 'react-query';
import { User } from "../components/Users/UsersContainer";


export default function useUsers() {

  const fetchUsers = async() => {
    try {
        const resp = await fetch("/users");
        const data: User[] | [] = await resp.json();
        return data;
      } catch (err) {
        console.log(err)
      }
  }

  useEffect(() => {
   fetchUsers();
  }, []);

  return useQuery('users', fetchUsers);
}