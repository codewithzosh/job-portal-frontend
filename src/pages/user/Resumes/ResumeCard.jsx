import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { User } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Button } from "../../../components/ui/button";
import { Eye } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Star } from "lucide-react";
import { StarOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDefaultResume } from "../../../reduxt-store/resume/resumeThunk";



function computeCompletionScore(resume){
  let score=0;

  const pi=resume.personalInfo??{};
  if(pi.firstName || pi.lastName) score +=10
if (pi.email) score += 5;
if (pi.headline) score += 5;
if (resume.summary) score += 15;
if (resume.workExperiences?.length > 0) score += 20;
 if (resume.educations?.length > 0) score += 15;
 if ((resume.skills?.length ?? 0) >= 2) score += 15;
 if (resume.projects?.length > 0) score += 10;
 if(resume.languages?.length>0)score+=5
  return score;
}

const ResumeCard = ({ resume }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const handleSetDefaultResume=()=>{
    dispatch(setDefaultResume(resume.id))
  }

  const completionScore = computeCompletionScore(resume);
  return (
    <Card>
      <CardContent>
        <div className="flex items-start gap-3 mb-2">
          <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
            {resume?.personalInfo?.profileImage ? (
              <img
                src={resume?.personalInfo?.profileImage}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div className="flex-1 flex items-start justify-between gap-2 min-w-0">
            <h3>{resume.title}</h3>
            <Badge>{resume.template}</Badge>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Completion</span>
            <span>{completionScore}%</span>
          </div>
          <Progress value={completionScore} className={"h-1.5"} />
        </div>

        {/* actions */}
        <div className="flex items-center gap-1.5 mb-2">
          <Button className={"flex-1"} variant="outline" size="sm">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>

          <Button onClick={()=>navigate(`/resumes/${resume.id}/edit`)} className={"flex-1"} variant="outline" size="sm">
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>

          <Button variant="" size="icon">
            <Trash2 className="h-3 w-3 " />
          </Button>
        </div>

        <Button
          className="w-full text-xs text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700 mb-2"
          variant="outline"
          size="sm"
        >
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          AI Career Feedback
        </Button>

        {!resume.isDefault ? (
          <Button
            className="w-full text-xs text-slate-500 hover:text-yellow-700 hover:bg-yellow-50"
            variant="ghost"
            size="sm"
            onClick={handleSetDefaultResume}
          >
             <StarOff className="h-3.5 w-3.5 mr-1" />
            Set As Default
          </Button>
        ) : (
          <div className="w-full flex items-center justify-center gap-1 text-xs text-yellow-600 font-medium py-1">
            <Star className="h-3.5 w-3.5 fill-current" />
            Default Resume
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
