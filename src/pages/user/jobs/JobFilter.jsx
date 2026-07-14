import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { X } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { Separator } from "../../../components/ui/separator";
import { Slider } from "../../../components/ui/slider";


const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "REMOTE", label: "Remote" },
];

const WORK_MODES = [
  { value: "REMOTE", label: "Remote" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ON_SITE", label: "On-site" },
];

const EXP_LEVELS = [
  { value: "ENTRY_LEVEL", label: "Entry Level", sub: "0–1 yr" },
  { value: "JUNIOR", label: "Junior", sub: "1–3 yrs" },
  { value: "MID_LEVEL", label: "Mid Level", sub: "3–5 yrs" },
  { value: "SENIOR_LEVEL", label: "Senior", sub: "5–8 yrs" },
  { value: "LEAD", label: "Lead", sub: "8+ yrs" },
  { value: "EXECUTIVE", label: "Executive", sub: "C-level" },
];

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v != val) : [...arr, val];
}

const JobFilter = ({ filters, setFilters, onReset }) => {
  const { jobTypes, workModes, expLevels, minSalary, maxSalary } = filters;

  const onChange = (key, val) =>
    setFilters((prev) => ({ ...prev, [key]: val }));

  console.log("job types ---------- ",jobTypes)
  return (
    <Card className="sticky top-20 border-slate-200">
      <CardHeader className={"pb-3"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <CardTitle className="text-base">Filters</CardTitle>
            <Badge className="bg-brand text-white text-xs px-1.5 py-0.5 h-5">
              4
            </Badge>
          </div>

          <div>
            <Button
            onClick={onReset}
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-slate-500 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={"space-y-5"}>
        {/* job type */}

        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
            Job Type
          </h4>
          <div className="space-y-2">
            {JOB_TYPES.map(({ value, label }) => (
              <div
                className="flex items-center gap-2.5 cursor-pointer group"
                key={value}
              >
                <Checkbox
                checked={jobTypes.includes(value)}
                  onCheckedChange={() =>
                    onChange("jobTypes", toggle(jobTypes, value))
                  
                  }
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />
        {/* work mode */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
            Work Mode
          </h4>
          <div className="space-y-2">
            {WORK_MODES.map(({ value, label }) => (
              <div
                className="flex items-center gap-2.5 cursor-pointer group"
                key={value}
              >
                <Checkbox  checked={workModes.includes(value)}  onCheckedChange={() =>
                    onChange("workModes", toggle(workModes, value))
                  }/>
                <span>{label}</span>
               
              </div>
            ))}
          </div>
        </div>
        <Separator />
        {/* Experience Level */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
            Experience Level
          </h4>
          <div className="space-y-2">
            {EXP_LEVELS.map(({ value, label,sub }) => (
              <div
                className="flex items-center gap-2.5 cursor-pointer group"
                key={value}
              >
                <Checkbox  checked={expLevels.includes(value)} onCheckedChange={() =>
                    onChange("expLevels", toggle(expLevels, value))
                  }/>
                <span>{label}</span> (<span className="text-xs text-gray-500">{sub}</span>)
              </div>
            ))}
          </div>
        </div>

        <Separator />
        {/* Salary Range */}
        <div>
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
              Salary Range
            </h4>
            <span>
              ${minSalary.toLocaleString()} - ${maxSalary.toLocaleString()}
            </span>
          </div>
          <Slider
            min={0}
            max={500000}
            step={10000}
            value={[minSalary, maxSalary]}
            onValueChange={
              ([min,max])=>setFilters((prev)=>({...prev,minSalary:min, maxSalary:max}))
            }
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1.5">
            <span>$0</span>
            <span>$500K+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilter;
