import React from "react";
import SatateCard from "./SatateCard";
import { Users } from "lucide-react";
import { useMemo } from "react";

import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Filter } from "lucide-react";

import { Sparkles } from "lucide-react";
import { Star } from "lucide-react";
import { Eye } from "lucide-react";
import { cn } from "../../../lib/utils";
import ApplicationTable from "./ApplicationTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchCompanyApplications,
  toggleStar,
} from "../../../reduxt-store/application/applicationThunk";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchMyJobs } from "../../../reduxt-store/job/jobThunk";
import { fetchMyCompany } from "../../../reduxt-store/company/companyThunk";
import UpdateStatusDialog from "./UpdateStatusDialog";

const AI_SHORTLIST_FILTERS = [
  { value: "ALL", label: "All" },
  { value: "AUTO_SHORTLISTED", label: "Auto Shortlisted" },
  { value: "REVIEW_RECOMMENDED", label: "Review Recommended" },
  { value: "PENDING_REVIEW", label: "Pending Review" },
  { value: "LOW_MATCH", label: "Low Match" },
  { value: "NOT_SCREENED", label: "Not Screened" },
];

const STATUS_FILTERS = [
  "ALL",
  "PENDING",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "HIRED",
  "REJECTED",
  "WITHDRAWN",
];

const EmployerApplications = () => {
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [starredOnly, setStarredOnly] = React.useState(false);
  const [unreadOnly, setUnreadOnly] = React.useState(false);
  const [aiFilter, setAiFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("DEFAULT");
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.application);
  const { myJobs: jobs } = useSelector((state) => state.job);
  const { myCompany } = useSelector((state) => state.company);
  const [statusDialog, setStatusDialog] = useState(null);
  const stats = useMemo(
    () => ({
      total: applications.length,
      pending: applications.filter((app) => app.status === "PENDING").length,
      shortlisted: applications.filter((app) => app.status === "SHORTLISTED")
        .length,
      unread: applications.filter((app) => !app.isRead).length,
      autoShortlisted: applications.filter(
        (app) => app.status === "AUTO_SHORTLISTED",
      ).length,
    }),
    [applications],
  );

  useEffect(() => {
    if (myCompany) {
      dispatch(fetchMyJobs(myCompany?.id));
    }
  }, [myCompany]);

  useEffect(() => {
    dispatch(fetchMyCompany());
  }, []);
  useEffect(() => {
    const filters = {};
    if (jobFilter) filters.jobId = jobFilter;
    if (statusFilter != "ALL") filters.status = statusFilter;
    if (starredOnly) filters.isStarred = true;
    if (unreadOnly) filters.isRead = false;
    if (aiFilter !== "ALL") filters.aiShortlistStatus = aiFilter;
    if (sortBy !== "DEFAULT") filters.sortBy = sortBy;

    console.log("filters ----- ", filters);

    dispatch(fetchCompanyApplications(filters));
  }, [jobFilter, statusFilter, starredOnly, unreadOnly, aiFilter, setSortBy]);

  console.log("status filter", statusFilter);

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and manage all candidate applications
        </p>
      </section>

      {/* state */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <SatateCard
          label="Total"
          value={stats.total}
          icon={Users}
          color="bg-blue-50 text-primary"
        />
        <SatateCard
          label="Pending"
          value={stats.pending}
          icon={Users}
          color="bg-yellow-50 text-warning"
        />
        <SatateCard
          label="Shortlisted"
          value={stats.shortlisted}
          icon={Users}
          color="bg-green-50 text-success"
        />
        <SatateCard
          label="Unread"
          value={stats.unread}
          icon={Users}
          color="bg-purple-50 text-info"
        />
        <SatateCard
          label="Auto-Shortlisted"
          value={stats.autoShortlisted}
          icon={Users}
          color="bg-indigo-50 text-primary"
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        {/* Row 1: search + job select + AI shortlist + sort — all in one line */}
        <div className="flex flex-col md:flex-row gap-3">
          <Select value={String(jobFilter)} onValueChange={setJobFilter}>
            <SelectTrigger className="border-slate-200 text-sm w-full sm:w-48">
              <Filter />
              <SelectValue placeholder="All Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>

              {jobs.map((job) => (
                <SelectItem key={job.id} value={String(job.id)}>
                  {" "}
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* ai shortlist */}
          <Select onValueChange={setAiFilter}>
            <SelectTrigger className="border-slate-200 text-sm w-full sm:w-48">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-brand" />
              <SelectValue placeholder="AI Shortlist" />
            </SelectTrigger>
            <SelectContent>
              {AI_SHORTLIST_FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={String(filter.value)}>
                  {" "}
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="border-slate-200 text-sm w-full sm:w-48">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-brand" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DEFAULT">Newest First</SelectItem>
              <SelectItem value="AI_SCORE_DESC">
                AI Score: High to Low
              </SelectItem>
              <SelectItem value="AI_SCORE_ASC">
                AI Score: Low to High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Row 2: status tabs + toggles */}
        <di className="flex gap-3 items-center flex-wrap">
          <div className="flex gap-1.5 flex-wrap flex-1">
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
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setStarredOnly(!starredOnly)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors",
                starredOnly
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200",
              )}
            >
              <Star className="h-3.5 w-3.5" /> Starred
            </button>
          </div>
        </di>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <ApplicationTable
          onUpdateStatus={(app) =>
            setStatusDialog({ id: app.id, currentStatus: app.status })
          }
          applications={applications}
          isFullMode={true}
        />
      </section>

     {statusDialog && <UpdateStatusDialog
        open={statusDialog}
        onClose={() => setStatusDialog(null)}
        applicationId={statusDialog?.id}
        currentStatus={statusDialog?.currentStatus}
      />}
    </main>
  );
};

export default EmployerApplications;
