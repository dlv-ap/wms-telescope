import { Outlet } from 'react-router-dom'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'

export default function DashboardLayout() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#f7f7f7]">
      <SideNav />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-5 bg-white rounded-tl-[12px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}