import { HashRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import InventoryPage from './pages/InventoryPage'
import OutboundPage from './pages/OutboundPage'
import ReportsPage from './pages/ReportsPage'
import AIDashboardPage from './pages/AIDashboardPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/outbound" element={<OutboundPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai-dashboard" element={<AIDashboardPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App