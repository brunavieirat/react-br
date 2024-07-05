import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { User } from "../components/UsersContainer";


export default function useUsers() {
  const [users, setUsers] = useState<User[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchUsers = async() => {
    try {
        setIsLoading(true);
        const resp = await fetch("/users");
        const data: User[] | [] = await resp.json();
        setUsers(data);
        setIsLoading(false);
        return data;
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
  }

  useEffect(() => {
   fetchUsers();
  }, []);

  return useQuery('users', fetchUsers);
}