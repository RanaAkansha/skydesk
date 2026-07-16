import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ExpenseProvider } from './hooks/useExpenses.jsx'
import { AdvancesProvider } from './hooks/useAdvances.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExpenseProvider>
      <AdvancesProvider>
        <App />
      </AdvancesProvider>
    </ExpenseProvider>
  </StrictMode>,
)
