import React from "react";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { CheckCircle2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Clock } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Share } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { Users } from "lucide-react";
import { Eye } from "lucide-react";
import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchJobById } from "../../../reduxt-store/job/jobThunk";
import { useSelector } from "react-redux";

const JobDetails = () => {
  
  const {currentJob:job}=useSelector(state=>state.job)
  
  const navigate=useNavigate()
  const {id}=useParams()
  const dispatch=useDispatch()


  useEffect(()=>{

    if(id){
      dispatch(fetchJobById(id))
    }

  },[id])
  
if(job==null){
  return <div className="flex items-center justify-between min h-screen">
    <h1 className="font-bold text-4xl">Job Not Found With Given Job Id - {id}</h1>
  </div>
}
  
const location = [job?.city, job?.state, job?.country];

  return (
    <div className="p-8 min-w-7xl max-w-7xl max-auto space-y-3">
      <Button onClick={()=>navigate(-1)} variant="ghost">
        <ArrowLeft />
        Back To Jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className={"p-5"}>
              <div className="flex items-start gap-4">
                {/* company logo */}
                <div className="h-16 w-16 rounded-xl">
                  <img
                    className="h-full w-full object-fill rounded-xl"
                    src={job.company?.logoUrl}
                    alt=""
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title Row + Bookmmar */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-1">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                        <span className="text-slate-700 font-medium text-sm">
                          {job.company?.name}
                        </span>
                        <CheckCircle2 className="h-4 w-4 fill-primary text-white shrink-0" />

                        <span className="text-slate-400 text-sm">
                          ·{job.company?.industryType}
                        </span>
                        <span className="text-slate-400 text-sm">
                          {" "}
                          · {job.company.companySize}
                        </span>
                      </div>

                      <p className="text-slate-400 text-xs mt-0.5 italic">
                        {job.company.tagline}
                      </p>
                    </div>
                    <Button variant="ghost">
                      <Bookmark />
                    </Button>
                  </div>

                  {/* job details */}

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {location}
                    </div>

                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 shrink-0" />
                      {job.jobType}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 shrink-0" />
                      {job.minSalary} - {job.maxSalary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 shrink-0" />
                      Posted {job.createdAt?.split("T")[0]}
                    </div>
                  </div>

                  {/* Badges - job details */}

                  <div className="flex flex-wrap gap-2">
                    <Badge className={"bg-primary"}>{job.state}</Badge>

                    <Badge variant="outline">{job.experienceLevel}</Badge>
                    <Badge variant="secondary">{job.category?.name}</Badge>

                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill.slug}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* description */}
          <Card>
            <CardHeader>
              <CardTitle>About the role</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {job.responsibilities}
              </p>
            </CardContent>
          </Card>

          {/* requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {job.requirements}
              </p>
            </CardContent>
          </Card>

          {/* benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {job.benefits}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Apply Card */}
        <div className="">
          <Card>
            <CardContent className={"space-y-6"}>
              <Button onClick={() => navigate(`/apply/${job.id}`)} className={"w-full py-5"}>
                Apply Now
              </Button>
              <div className="flex gap-2 justify-between">
                <Button variant="outline" className={"w-[80%] "}>
                  Save
                </Button>
                <Button variant="outline" className="w-[10%] ">
                  <Share />
                </Button>
              </div>

              <Separator />

              <div className="text-sm text-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Job Type</span>
                  <p className="text-slate-900 font-medium">{job.jobType}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Work Mode</span>
                  <p className="text-slate-900 font-medium">{job.workMode}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Experience</span>
                  <p className="text-slate-900 font-medium">
                    {job.experienceLevel}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Salary</span>
                  <p className="text-slate-900 font-medium">
                    {" "}
                    ₹{job.minSalary} - ₹{job.maxSalary}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Openings</span>
                  <p className="text-slate-900 font-medium">{job.openings}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Deadline</span>
                  <p className="text-slate-900 font-medium">
                    {job.applicationDeadline}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5"/> 20 applicants
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5"/> 150 views
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
