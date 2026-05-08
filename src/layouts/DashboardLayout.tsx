import { Outlet } from 'react-router-dom'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'

export default function DashboardLayout() {
  return (
    <div className="flex w-[1440px] h-[1024px] overflow-hidden bg-surface-bg">
      <SideNav />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}