import React from 'react'
import { Card, CardContent } from '../../../components/ui/card'

const ApplicationStateCard = ({label,value,icon,color}) => {

    const Ico=icon
  return (
    <Card className="border-0 shadow-sm">

        <CardContent className="p-4 flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                <Ico clssName="h-5 w-5"/>
            </div>
            <div>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
            </div>
        </CardContent>

    </Card>
  )
}

export default ApplicationStateCard