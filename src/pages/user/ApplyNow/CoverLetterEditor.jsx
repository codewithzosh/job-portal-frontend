import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SparkleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchResumeById } from "../../../reduxt-store/resume/resumeThunk";
import { generateCoerLetter } from "../../../reduxt-store/ai/aiThunk";

const tips = [
  "Highlight your most relevant skills and how they align with the role",
  "Mention specific achievements with measurable results",
  "Show enthusiasm for the company and why you want to join",
  "Keep it concise — 3 to 4 focused paragraphs",
];
const CoverLetterEditor = ({ coverLetter, setCoverLetter, selectedResume }) => {
  const { currentJob: job } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { currentResume } = useSelector((store) => store.resume);
  const dispatch = useDispatch();

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
  };

  useEffect(() => {
    if (selectedResume) {
      dispatch(fetchResumeById(selectedResume));
    }
  }, [selectedResume]);

  console.log("resume", currentResume);

  const handleGenerateCoverLatterWithAi = async () => {
    const resume = currentResume;

    const candidateSkills =
      resume?.skills?.map((s) => s.skillName).filter(Boolean) ?? [];

    const candidateExperience =
      resume?.workExperiences
        ?.map(
          (e) =>
            `${e.jobTitle} at ${e.companyName}${e.isCurrent ? " (current)" : ""}`,
        )
        .filter(Boolean) ?? [];

    const payload = {
      jobTitle: job?.title || "Software Developer",
      jobDescription: job?.description || "",

      candidateName: user ? user.fullName : "",
      targetCompanyName: job?.companyId ? `Company #${job.companyId}` : "",
      candidateSummary: resume?.summary,
      candidateSkills: candidateSkills,
      candidateExperience: candidateExperience,
    };

    try {
      const result = await dispatch(generateCoerLetter(payload)).unwrap();
      console.log("result --- ",result)
      setCoverLetter(result.content);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Cover Letter</h2>
        <p className="text-slate-600">
          Write a compelling cover letter or let AI help you
        </p>
      </div>

      {/* Ai Generate Card */}

      <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <SparkleIcon className="h-6 w-6 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                AI-Powered Cover Letter
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                {" "}
                Let our AI analyze the job description and your resume — skills,
                experience, and summary — to create a personalized cover letter
                tailored to this position.
              </p>
              <Button
                onClick={handleGenerateCoverLatterWithAi}
                className={"py-5"}
              >
                <Sparkles className="w-4 h-4" /> Generrate with Ai
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ai writing tips */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">AI Writing Tips</h3>
            <Badge variant="secondary" className="gap-1">
              <Sparkles />
              Personalize
            </Badge>
          </div>

          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-brand">
                    {index + 1}
                  </span>
                </div>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Editor */}

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">
                Your Cover Letter
              </h3>
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={() => setCoverLetter("")}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw />
                  Clear
                </Button>
              </div>
            </div>

            <Textarea
              placeholder="Write your cover letter here or click Generate with AI..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className={"min-h-100 font-mono text-sm"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverLetterEditor;
