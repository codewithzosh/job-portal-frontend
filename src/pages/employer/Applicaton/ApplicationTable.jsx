import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Star } from "lucide-react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import AiScoreCircle from "./AiScoreCircle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Eye } from "lucide-react";
import { FileText } from "lucide-react";
import { Sparkles } from "lucide-react";
import { ScrollText } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleStar } from "../../../reduxt-store/application/applicationThunk";



const ApplicationTable = ({ applications, isFullMode, onUpdateStatus }) => {
  const dispatch=useDispatch()

   const handleStar=(id)=>{
    dispatch(toggleStar(id))
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className={"bg-slate-50 hover:bg-slate-50"}>
          {isFullMode && <TableHead className={"w-8"} />}
          <TableHead className="font-semibold text-slate-700">
            Candidate
          </TableHead>
          <TableHead className="font-semibold text-slate-700">
            Job Position
          </TableHead>
          <TableHead className="font-semibold text-slate-700">Status</TableHead>
          <TableHead className="font-semibold text-slate-700">
            AI Scrore
          </TableHead>
          <TableHead className="font-semibold text-slate-700">
            Applied
          </TableHead>
          <TableHead className="font-semibold text-slate-700 text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => {
          const job = app.job;
          const jobTitle = job?.title;
          const location = [job.city, job.state, job.country]
            .filter(Boolean)
            .join(", ");
          return (
            <TableRow>
              {isFullMode && (
                <TableCell>
                  <Button onClick={()=>handleStar(app.id)} variant="ghost" size="icon">
                    <Star className={`${app.isStarred?"fill-primary":""}`} />
                  </Button>
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar>
                    <AvatarImage src="" alt="zosh" className="grayscale" />
                    <AvatarFallback className={"bg-primary text-white"}>
                      {app.candidate?.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {app.candidate?.fullName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {app.candidate?.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <p className="text-sm text-slate-700 font-medium truncate max-w-[200px]">
                  {jobTitle}
                </p>
                <p className="text-xs text-slate-400">{location}</p>
              </TableCell>

              <TableCell>
                <Badge className={"text-xs"} variant="outline">
                  {app.status}
                </Badge>
              </TableCell>

              {/* ai score */}
              <TableCell>
                <AiScoreCircle score={app.screening?.overallScore} />
              </TableCell>

              <TableCell className="text-xs text-slate-400">
                {app.appliedAt.split("T")[0]}
              </TableCell>

              <TableCell className={"text-right"}>
                {isFullMode ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>onUpdateStatus(app)}>
                        <FileText className="mr-2 h-4 w-4" /> Update Status
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Sparkles className="mr-2 h-4 w-4" /> View AI Screening
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ScrollText className="mr-2 h-4 w-4" /> Summarize Notes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>handleStar(app.id)}>
                        <Star className="mr-2 h-4 w-4" /> Star Candidate
                      </DropdownMenuItem>

                      
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost">
                    Review <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ApplicationTable;
