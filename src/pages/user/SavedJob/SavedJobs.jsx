import { BookMarked } from "lucide-react";
import React from "react";
import { Briefcase } from "lucide-react";

import SavedJobCard from "./SavedJobCard";
import { Button } from "../../../components/ui/button";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMySavedJobs } from "../../../reduxt-store/saveJobs/saveJobThunk";
import { useSelector } from "react-redux";

const SavedJobs = () => {
  const dispatch=useDispatch()
  const {savedJobs}=useSelector(store=>store.savedJob)

  useEffect(()=>{
dispatch(fetchMySavedJobs())
  },[])


  return (
    <div className="max-w-5xl min-w-5xl max-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-primary" />
            Saved Jobs
          </h1>
         {savedJobs.length>0 && <p className="text-slate-500 text-sm mt-1">{savedJobs.length} Job Saved</p>}
        </div>
        <div>
          <Button variant="outline" className={"py-5"}>
            <Briefcase />
            Browse Jobs
          </Button>
        </div>
      </div>

      {/* job list */}

      <div className="space-y-4">
        {savedJobs.map((job)=><SavedJobCard key={job.id} savedJob={job}/>)}
      </div>
    </div>
  );
};

export default SavedJobs;
