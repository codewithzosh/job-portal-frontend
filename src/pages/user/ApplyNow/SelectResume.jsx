import { FileText } from "lucide-react";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyResumes } from "../../../reduxt-store/resume/resumeThunk";
import { useDispatch } from "react-redux";

const SelectResume = ({ selectedResume, setSelectedResume }) => {
  const {resumes}=useSelector(store=>store.resume)
  const dispatch=useDispatch()

    useEffect(() => {
      dispatch(fetchMyResumes());
    }, []);
  return (
    <div className='space-y-6'>
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Select Resume
        </h2>
        <p className="text-slate-600">
          Choose a resume from your saved resumes
        </p>
      </div>

      {resumes.length == 0 ? (
        <div className="text-center py-12 text-slate-500">
          <FileText className="h-10 w-10 mx-auto mb-3 text-slate-300" />
          <p className="font-medium">No Resumes Found</p>
          <p className="text-sm mt-1">
            <button>Create a resume</button>
            Before Applying
          </p>
        </div>
      ) : (
        <RadioGroup value={selectedResume} onValueChange={setSelectedResume}>
          <div className="space-y-3">
            {resumes.map((item) => (
              <Card
                onClick={() => setSelectedResume(item.id.toString())}
                className={`cursor-pointer transition-colors ${
                  selectedResume === item.id.toString()
                    ? "border-brand bg-blue-50"
                    : "hover:border-slate-400"
                }`}
              >
                <CardContent className={"p-4"}>
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={item.id.toString()} />
                    <div className="flex items-center justify-between gap-3 flex-1 ">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5 text-slate-500" />
                        </div>
                        <div lassName="flex-1 min-w-0">
                          <Label className="font-medium text-slate-900 cursor-pointer block truncate">
                            {item.title}
                          </Label>
                          <span
                            className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${"bg-slate-600 text-white"}`}
                          >
                            {item.template}
                          </span>
                          {item.isDefault && (
                            <span className="text-xs text-green-600 font-medium ml-2">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      )}
    </div>
  );
};

export default SelectResume;
