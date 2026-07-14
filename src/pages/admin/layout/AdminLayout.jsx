import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../sidebar/AdminSidebar'
import { LayoutDashboard } from 'lucide-react'
import { Users } from 'lucide-react'
import { Building2 } from 'lucide-react'
import { Layers } from 'lucide-react'
import { Settings } from 'lucide-react'

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Companies", href: "/admin/companies", icon: Building2 },
      { name: "Job Metadata", href: "/admin/job-meta", icon: Layers },
      
    ],
  },
  {
    title: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
]

const AdminLayout = () => {
  return (
     <div className='flex h-screen overflow-hidden bg-slate-50'>

        <AdminSidebar navigation={navigation}/>

        <div className='flex flex-1 flex-col overflow-hidden'>
            <main className='flex-1 overflow-y-auto p-6 lg:p-8 border'>
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout