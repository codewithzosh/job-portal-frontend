import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { cn } from '../../../lib/utils'
import { CheckCircle } from 'lucide-react'

const CompanyTable = ({companies}) => {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider w-10 pl-6">
              #
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Company
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Industry/Type
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Size
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Verified
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Registered
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, index) => {
            
           const joinedAt=company.createdAt?new Date(company.createdAt).toLocaleDateString("en-US",{
              month:"short",
              day:"numeric",
              year:"numeric"
            }):"-"
            return (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={company.logoUrl} />
                      <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-tight">{company.name}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[200px]">{company.tagline}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {company.industryType}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{company.companyType}</p>
                </div>
                </TableCell>
                <TableCell>
                 {company.companySize}
                </TableCell>
                <TableCell>
                  <Badge>
                    {company.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  
                  <Badge className={`${company.verified?"bg-green-100 text-green-700":""}`}>
                    {company.verified && <CheckCircle className="h-3 w-3" />}
                   {company.verified? "Verified":"Unverified"}
                  </Badge>
                </TableCell>
               
                <TableCell>
                  {joinedAt}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompanyTable