import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'

const UserFilter = ({ onRoleFilter , onStatusFilter}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">

        <Select onValueChange={(value)=>onRoleFilter?.(value)}>
            <SelectTrigger className="h-9 w-full sm:w-40 bg-white border-slate-200 text-sm rounded-lg">
                <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ROLE_JOB_SEEKER">Job Seekers</SelectItem>
                <SelectItem value="ROLE_EMPLOYER">Employers</SelectItem>
                <SelectItem value="ROLE_ADMIN">Admin</SelectItem>
            </SelectContent>
        </Select>

        <Select onValueChange={(value)=>onStatusFilter?.(value)}>
            <SelectTrigger className="h-9 w-full sm:w-40 bg-white border-slate-200 text-sm rounded-lg">
                <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
    
            </SelectContent>
        </Select>
    </div>
  )
}

export default UserFilter