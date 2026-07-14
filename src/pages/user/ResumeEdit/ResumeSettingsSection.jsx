import React from 'react'
import FRow from './shared/FRow'
import { Input } from '../../../components/ui/input'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useDispatch } from 'react-redux'

const ResumeSettingsSection = () => {
  const [title,setTitle]=useState("")
  const dispatch=useDispatch()

  const handleSave=()=>{
    dispatch(updateRes)
    console.log("save settings ",title)
  }
  return (
    <div className='space-y-5'>
      <FRow label="Resume Title">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={150}
          placeholder="e.g. Backend Engineer Resume"
        />
        <p className="text-xs text-slate-400 mt-1">{title.length}/150</p>
      </FRow>

      <Button  onClick={handleSave}>
        Save Settings
      </Button>
    </div>
  )
}

export default ResumeSettingsSection