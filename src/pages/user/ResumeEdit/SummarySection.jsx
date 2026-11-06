import { Button } from "../../../components/ui/button";
import CopyFromMenu from "./shared/CopyFromMenu";
import { resumes } from "../Resumes/resumeData";
import { Textarea } from "../../../components/ui/textarea";
import { useState } from "react";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateResumeSummary } from "../../../reduxt-store/resume/resumeThunk";

const SummarySection = ({ resumeId, resume }) => {
  const [draft, setDraft] = useState(null);
  const text = draft ?? resume?.summary ?? "";
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateResumeSummary({ resumeId, summary: text }));
    console.log("summary text - ", text);
  };
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        Write a compelling 2–4 sentence overview of your career, key skills, and
        career goals.
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-blue-200 text-primary "
        >
          Generate With Ai
        </Button>
        <CopyFromMenu resumes={resumes} />
      </div>
      <Textarea value={text} onChange={(e) => setDraft(e.target.value)} />
      <p className="text-xs text-slate-400">{text.length} characters</p>

      <Button onClick={handleSave}>
        <Check className="h-4 w-4 mr-1.5" />
        Save Summary
      </Button>
    </div>
  );
};

export default SummarySection;
