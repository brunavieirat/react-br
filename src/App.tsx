
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css'

import UsersContainer from './components/Users/UsersContainer';

  
  const queryClient = new QueryClient();

  

function App() {

  return (
    <>
     <QueryClientProvider client={queryClient}>
      <div>
        <UsersContainer/>
       </div>
       </QueryClientProvider>
    </>
  )
}

export default App
