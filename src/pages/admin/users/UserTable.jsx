import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";

const roleConfig = {
  ROLE_JOB_SEEKER: { label: "Job Seeker", className: "bg-blue-50 text-blue-700 border-blue-200" },
  ROLE_EMPLOYER: { label: "Employer", className: "bg-purple-50 text-purple-700 border-purple-200" },
  ROLE_ADMIN: { label: "Admin", className: "bg-red-50 text-red-700 border-red-200" },
}

const statusConfig = {
  ACTIVE: { label: "Active", dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  INACTIVE: { label: "Inactive", dot: "bg-slate-400", text: "text-slate-500", bg: "bg-slate-100" },
  SUSPENDED: { label: "Suspended", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  DELETED: { label: "Deleted", dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
}

const UserTable = ({ users }) => {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider w-10 pl-6">
              #
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              User
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Role
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Provider
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Joined
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => {
            const role=roleConfig[user.role]
            const status=statusConfig[user.status]
            const joinedAt=user.createdAt?new Date(user.createdAt).toLocaleDateString("en-US",{
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
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-tight">{user.fullName}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-xs font-semibold px-2 py-0.5 border", role.className)}>
                    {role.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      status.bg
                    )}>

                      <div className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dot)}/>
                      <span  className={status.text}>{status.label}</span>

                  </div>
                </TableCell>
                <TableCell>
                  {user.authProvider}
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
  );
};

export default UserTable;
