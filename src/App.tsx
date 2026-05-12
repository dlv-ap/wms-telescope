import { HashRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App