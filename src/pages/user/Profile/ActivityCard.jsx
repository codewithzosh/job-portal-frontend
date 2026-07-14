import React from 'react'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import { Clock } from 'lucide-react'
import { CalendarDays } from 'lucide-react'

const ActivityCard = ({ user }) => {
  return (
     <Card className="border-slate-200 shadow-sm">
      <CardHeader className={"pb-3"}>
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-brand" /> Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className={"space-y-5"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    

         <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CalendarDays className="h-5 w-5 text-primary"/>
            </div>
            <div>
                <p className="text-xs text-slate-500 font-medium">Member Since</p>
                <p className="text-sm font-semibold text-slate-800">{user?.createdAt.split('T')[0]}</p>
            </div>
         </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CalendarDays className="h-5 w-5 text-primary"/>
            </div>
            <div>
                <p className="text-xs text-slate-500 font-medium">Last Login</p>
                <p className="text-sm font-semibold text-slate-800">{user?.lastLogin.split('T')[0]}</p>
            </div>
         </div>
        </div>

       
      </CardContent>
    </Card>
  )
}

export default ActivityCard