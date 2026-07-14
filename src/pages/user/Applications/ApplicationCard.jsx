import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { CheckCircle2 } from "lucide-react";

import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Clock } from "lucide-react";

import { Separator } from "../../../components/ui/separator";
import { Users } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { ExternalLink } from "lucide-react";
import { withdrawApplication } from "../../../reduxt-store/application/applicationThunk";
import { useDispatch } from "react-redux";

export const PIPELINE = [
  "PENDING",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "HIRED",
];

const ApplicationCard = ({ app }) => {
  const myPiplineIndex = PIPELINE.indexOf(app.status);
  const dispatch = useDispatch();

  console.log("my pipe line index ", myPiplineIndex);

  const job = app.job;
  const location = [job.city, job.state, job.country]
    .filter(Boolean)
    .join(", ");

  const handleWithdrawalApplication = (id) => {
    dispatch(withdrawApplication({ id, reason: "im not intrested anymore" }));
  };
  return (
    <Card>
      <CardContent className={"p-5"}>
        <div className="flex items-start gap-4">
          {/* company logo */}
          <div className="h-16 w-16 rounded-xl">
            <img
              className="h-full w-full object-fill rounded-xl"
              src={app.company?.logoUrl}
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
                    {app.company?.name}
                  </span>
                  <CheckCircle2 className="h-4 w-4 fill-primary text-white shrink-0" />

                  <span className="text-slate-400 text-sm">
                    ·{app.company?.industryType}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {" "}
                    · {app.company.companySize}
                  </span>
                </div>

                <p className="text-slate-400 text-xs mt-0.5 italic">
                  {app.company.tagline}
                </p>
              </div>
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

            <div className="flex flex-wrap gap-2">
              {PIPELINE.map((item, i) => (
                <div
                  className={`h-1.5 rounded-full flex-1 transition-colors ${
                    myPiplineIndex >= i ? "bg-primary" : "bg-slate-200"
                  }`}
                ></div>
              ))}
            </div>

            <>
              <Separator className={"mt-4 mb-3"} />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  
                  </div>

                  <div>
                    <Button variant="ghost">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Job
                    </Button>
                    <Button
                      onClick={() => handleWithdrawalApplication(app.id)}
                      className={"text-red-400"}
                      variant="ghost"
                      disabled={app?.status=="WITHDRAWN"}
                    >
                      {app?.status=="WITHDRAWN"?"WITHDRAWN":"Withdraw"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
