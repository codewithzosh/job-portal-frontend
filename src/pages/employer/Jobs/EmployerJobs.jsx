import { Plus } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { useMemo } from "react";

import SatateCard from "../Applicaton/SatateCard";
import { Briefcase } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Clock } from "lucide-react";
import { Users } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
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
import { Star } from "lucide-react";
import { MapPin } from "lucide-react";
import { User } from "lucide-react";
import { Edit2 } from "lucide-react";
import { Delete } from "lucide-react";
import { XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  closeJob,
  fetchJobs,
  fetchMyJobs,
  publishJob,
} from "../../../reduxt-store/job/jobThunk";
import { useNavigate } from "react-router-dom";
import { fetchMyCompany } from "../../../reduxt-store/company/companyThunk";
import { useState } from "react";

function fmtDate(dt) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_FILTERS = ["ALL", "OPEN", "DRAFT", "CLOSED", "EXPIRED", "FILLED"];
const EmployerJobs = () => {
  const navigate = useNavigate();
  const { myJobs: jobs } = useSelector((state) => state.job);
  const { myCompany } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [search, setSearch] = useState("");

  const stats = useMemo(
    () => ({
      total: jobs.length,
      open: jobs.filter((job) => job.status === "OPEN").length,
      draft: jobs.filter((job) => job.status === "DRAFT").length,
      closed: jobs.filter((job) => job.status === "CLOSED").length,
      appTotal: jobs.reduce((acc, job) => acc + job.applicationCount, 0),
    }),
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search?.toLowerCase()) ||
        job.categoryName?.toLowerCase().includes(search?.toLowerCase());
      const matchesStatus =
        statusFilter == "ALL" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, statusFilter, search]);

  console.log("status filter", statusFilter);

  const handlePublishJob = (id) => {
    dispatch(publishJob(id));
  };
  const handleCloseJob = (id) => {
    dispatch(closeJob(id));
  };

  useEffect(() => {
    if (myCompany) {
      dispatch(fetchMyJobs(myCompany?.id));
    }
  }, [myCompany]);

  useEffect(() => {
    dispatch(fetchMyCompany());
  }, []);
  return (
    <div className="space-y-6">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jobs Posting</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage all your job listings in one place
          </p>
        </div>
        <Button
          onClick={() => navigate("/employer/jobs/create")}
          className="gap-2 bg-primary hover:bg-primary/90 shrink-0"
        >
          <Plus />
          Post a Job
        </Button>
      </section>

      {/* state */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SatateCard
          label="Total Jobs"
          value={stats.total}
          icon={Briefcase}
          color="bg-blue-50 text-primary"
        />
        <SatateCard
          label="Active (Open)"
          value={stats.open}
          icon={TrendingUp}
          color="bg-yellow-50 text-warning"
        />
        <SatateCard
          label="Draft"
          value={stats.draft}
          icon={Clock}
          color="bg-green-50 text-success"
        />
        <SatateCard
          label="Total Applications"
          value={stats.appTotal}
          icon={Users}
          color="bg-purple-50 text-info"
        />
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 border-slate-200"
              placeholder="Search by candidate name or job title..."
            />
          </div>
          <div className="flex gap-1.5 flex-wrap ">
            {STATUS_FILTERS.map((status) => (
              <button
                onClick={() => setStatusFilter(status)}
                key={status}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === status
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className={"bg-slate-50 hover:bg-slate-50"}>
              <TableHead className="font-semibold text-slate-700">
                Job Title
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Type / Mode
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Location
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Applicants
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Posted
              </TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => {
              const location = [job.city, job.state, job.country].join(", ");
              return (
                <TableRow>
                  <TableCell>
                    <p className="font-medium text-slate-900 text-sm">
                      {job.title}
                    </p>
                  </TableCell>

                  <TableCell>
                    <Badge>{job.status}</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge className={"text-xs"} variant="outline">
                      {job.jobType}
                    </Badge>
                    <Badge>{job.workMode}</Badge>
                  </TableCell>

                  {/* ai score */}
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin />
                      {location}
                    </div>
                  </TableCell>

                  <TableCell className="text-left ">
                    <div className="flex items-center justify-end gap-1">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.applicationCount ?? 0}</span>
                      <span>/{job.openings ?? 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>{fmtDate(job.createdAt)}</TableCell>

                  <TableCell className={"text-right"}>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/employer/jobs/${job.id}/edit`)
                          }
                        >
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handlePublishJob(job.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Published
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCloseJob(job.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Close
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <Delete className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default EmployerJobs;
