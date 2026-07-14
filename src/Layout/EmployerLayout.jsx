import React from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from './Sidebar'
import { LayoutDashboard } from 'lucide-react'
import { Briefcase } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import { FileText } from 'lucide-react'
import { Users } from 'lucide-react'
import { BrainCircuit } from 'lucide-react'
import { MessageSquare } from 'lucide-react'
import { Building2 } from 'lucide-react'
import { CreditCard } from 'lucide-react'
import { Settings } from 'lucide-react'


const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Hiring",
    items: [
      { name: "All Jobs", href: "/employer/jobs", icon: Briefcase },
      { name: "Create Job", href: "/employer/jobs/create", icon: PlusCircle },
      { name: "Applications", href: "/employer/applications", icon: FileText },
     
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "AI Screening", href: "/employer/ai-screening", icon: BrainCircuit },
      
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Company Profile", href: "/employer/company", icon: Building2 },
     
    ],
  },
]

const EmployerLayout = () => {
  return (
    <div className='flex h-screen overflow-hidden bg-slate-50'>

        <Sidebar navigation={navigation}/>

        <div className='flex flex-1 flex-col overflow-hidden'>
            <main className='flex-1 overflow-y-auto p-6 lg:p-8 border'>
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default EmployerLayout