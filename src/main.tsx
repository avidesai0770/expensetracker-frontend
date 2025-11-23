
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppContextProvider } from './context/AppContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <AppContextProvider>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <App />
      </LocalizationProvider>
    </QueryClientProvider>

  </AppContextProvider>

)
