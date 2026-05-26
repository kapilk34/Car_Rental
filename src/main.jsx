import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { BookingSocketProvider } from './context/BookingSocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <BookingSocketProvider>
        <App />
      </BookingSocketProvider>
    </AppProvider>
  </BrowserRouter>,
)
