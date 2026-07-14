import { FileText } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { Star } from "lucide-react";

import ResumeCard from "./ResumeCard";
import { useState } from "react";
import CreateResumeDialog from "./CreateResumeDialog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyResumes, setDefaultResume } from "../../../reduxt-store/resume/resumeThunk";

const Resumes = () => {
  const [showCreate, setShowCreate] = useState(false);
  const { resumes } = useSelector((store) => store.resume);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyResumes());
  }, []);

  const defaultResume=resumes.find((r)=>r.isDefault)
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              {" "}
              <FileText className="w-6 h-6 text-primary" /> My Resumes
            </h1>
            <p>
              Create and manage multiple resume versions using our built-in
              templates
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            New Resume
          </Button>
        </div>

       {defaultResume && <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Star className="h-5 w-5 text-yellow-500 fill-current shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">
              Default Resume
            </p>
            <p className="text-xs text-yellow-700">
              <span>
                <span className="font-medium">{defaultResume.title + " "}</span>
                will be used when you apply without choosing a version.
              </span>
            </p>
          </div>
        </div>}

        {/* list of resume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumes.map((item) => (
            <ResumeCard resume={item} />
          ))}

          <button
            onClick={() => setShowCreate(true)}
            className="p-5 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="h-10 w-10 rounded-xl border-2 border-current flex items-center justify-center">
              <Plus />
            </div>
            <div>
              <p>New Resume</p>
              <p className="text-xs"> Pick a template to get started </p>
            </div>
          </button>
        </div>
      </div>

      <CreateResumeDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </div>
  );
};

export default Resumes;
