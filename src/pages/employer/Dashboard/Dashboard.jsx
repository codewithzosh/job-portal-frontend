import React from "react";
import { jobs } from "../../user/jobs/dummyJobs";
import { Briefcase } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { FileText } from "lucide-react";
import { UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import StatsCard from "./StatsCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Users } from "lucide-react";
import RecentApplicationTable from "./RecentApplicationTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyCompany } from "../../../reduxt-store/company/companyThunk";
import { fetchMyJobs } from "../../../reduxt-store/job/jobThunk";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch=useDispatch()
   const { myJobs: jobs } = useSelector((state) => state.job);
  const { myCompany } = useSelector((state) => state.company);
const { applications } = useSelector((store) => store.application);
  const activeJobs=[...jobs].filter((job)=>job.status=="OPEN")
  const shortListed=[...applications].filter((app)=>app.status=="SHORTLISTED")
 
  const stats = [
    {
      title: "Total Jobs Posted",
      value: jobs.length,
      icon: Briefcase,
    },
    {
      title: "Active Jobs",
      value: activeJobs.length,
      icon: TrendingUp,
    },
    {
      title: "Applications Received",
      value: applications.length,
      icon: FileText,
    },
    {
      title: "Shortlisted / Interview",
      value: shortListed.length,
      icon: UserCheck,
    },
  ];

    useEffect(() => {
      dispatch(fetchMyCompany());
    }, []);

      useEffect(() => {
      if (myCompany) {
        dispatch(fetchMyJobs(myCompany?.id));
      }
    }, [myCompany]);
    
  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's an overview of your hiring activity.
          </p>
        </div>
        <Link to="/employer/jobs/create">
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" /> Create Job
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard {...stat} />
        ))}
      </div>

      {/* Ai insiights Card */}
      <Card className="bg-linear-to-br from-primary/5 to-brand/10 border-brand/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Users className="h-4 w-4" />
            </div>
            AI Screening Inshights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-slate-900">
                  {" "}
                  15 candidates auto-shortlisted today
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Based on AI analysis, these candidates match 90%+ of your job
                  requirements for Senior React Developer position.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-600 mt-2" />
              <div>
                <p className="font-medium text-slate-900">
                  3 high-potential candidates need review
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  These candidates have exceptional skills but limited
                  experience. Worth considering for junior roles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-2 w-2 rounded-full bg-amber-600 mt-2" />
              <div>
                <p className="font-medium text-slate-900">
                  Suggestion: Update job description
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Your DevOps Engineer posting has low application rate.
                  Consider adjusting salary range or requirements.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-primary/20">
            <Link to={"/employer/ai-screening"}>
              <Button className="border-primary/30 hover:bg-primary/10">View AI Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Application */}
      <RecentApplicationTable/>
    </div>
  );
};

export default Dashboard;
