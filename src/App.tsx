
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css'
import DataTable from './components/Table/Table'

// import  { worker } from './mocks/browser'
import Users  from './components/Table/Users';

  
  const queryClient = new QueryClient();

function App() {

  return (
    <>
     <QueryClientProvider client={queryClient}>
      <div>
        <DataTable/>
        <Users/>
       </div>
       </QueryClientProvider>
    </>
  )
}

export default App
