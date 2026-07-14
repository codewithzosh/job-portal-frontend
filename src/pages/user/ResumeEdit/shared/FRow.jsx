import React from 'react'
import { Label } from '../../../../components/ui/label'

const FRow = ({label, children}) => {
  return (
    <div className='space-y-1'>
        <Label className={"text-xs text-slate-500"}>
            {label}
        </Label>
        {children}
    </div>
  )
}

export default FRow