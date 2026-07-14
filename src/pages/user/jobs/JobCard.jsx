import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Clock } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveJob } from "../../../reduxt-store/saveJobs/saveJobThunk";

const hasApplied = false;

const JobCard = ({ job }) => {
  const navigate=useNavigate()

  const location = [job.city, job.state, job.country]
    .filter(Boolean)
    .join(", ");


    const dispatch=useDispatch()
    const handleSavedJob=()=>{
      dispatch(saveJob({jobId:job.id}))
    }
  return (
  
    <Card >
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
              <Button onClick={handleSavedJob} variant="ghost">
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

            <>
              <Separator className={"mt-4 mb-3"} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {5}
                  </span>
                  <span>{job.openings} openings</span>
                </div>

                {hasApplied ? (
                  <Button size="sm" variant="outline">
                    Applied
                  </Button>
                ) : (
                  <Button onClick={()=>navigate(`/jobs/${job.id}`)} size="sm">Quick Apply</Button>
                )}
              </div>
            </>
          </div>
        </div>
      </CardContent>
    </Card>
    
  );
};

export default JobCard;
