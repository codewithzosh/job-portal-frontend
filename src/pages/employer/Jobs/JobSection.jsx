import React from 'react'

const JobSection = ({icon:Icon, title, children}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50">
            <Icon className="h-4 w-4 text-slate-500"/>
            <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        </div>
        <div  className="p-5 space-y-4">
            {children}
        </div>
    </div>
  )
}

export default JobSection