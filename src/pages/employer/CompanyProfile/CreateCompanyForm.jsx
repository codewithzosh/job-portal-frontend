import { Building2 } from "lucide-react";
import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { createCompany } from "../../../reduxt-store/company/companyThunk";

const COMPANY_SIZES = ["MICRO", "SMALL", "MEDIUM", "LARGE", "ENTERPRISE"];
const COMPANY_TYPES = [
  "STARTUP",
  "PRIVATE",
  "PUBLIC_LISTED",
  "GOVERNMENT",
  "NON_PROFIT",
  "EDUCATIONAL",
  "SELF_EMPLOYED",
];
const INDUSTRY_TYPES = [
  "TECHNOLOGY",
  "FINANCE_BANKING",
  "HEALTHCARE",
  "EDUCATION",
  "MANUFACTURING",
  "RETAIL_ECOMMERCE",
  "HOSPITALITY_TOURISM",
  "REAL_ESTATE",
  "MEDIA_ENTERTAINMENT",
  "TRANSPORTATION_LOGISTICS",
  "ENERGY_UTILITIES",
  "AGRICULTURE",
  "CONSULTING",
  "LEGAL",
  "TELECOMMUNICATIONS",
  "AUTOMOTIVE",
  "PHARMACEUTICAL",
  "CONSTRUCTION",
  "HUMAN_RESOURCES",
  "MARKETING_ADVERTISING",
  "OTHER",
];

const CreateCompanyForm = () => {
  const dispatch=useDispatch()
  const [form, setForm] = useState({
    name: "",
    companySize: "",
    companyType: "",
    industryType: "",
  });

  const setFormValue = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const setSelect=(key)=>(value)=>setForm((p)=>({...p, [key]:value}))


  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(createCompany(form))
    console.log("company form data ",form)
  }

  return (
    <div className="flex flex-col items-center text-center mb-8">
     <div className="w-xl border p-10 rounded-md">
       <div className="flex flex-col items-center text-center mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 mb-4">
          <Building2 />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Set up your company
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">
          {" "}
          Create your company profile to start posting jobs and attracting top
          talent.
        </p>
      </div>

      <form  onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-700">
            Company Name <span>*</span>
          </Label>
          <Input
            placeholder="company name"
            value={form.name}
            onChange={setFormValue("name")}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">
              Size <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.companySize}
              onValueChange={setSelect("companySize")}
            >
              <SelectTrigger className="border-slate-200 text-sm w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_SIZES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">
              Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.companyType}
              onValueChange={setSelect("companyType")}
            >
              <SelectTrigger className="border-slate-200 text-sm w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">
              Industry <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.industryType}
              onValueChange={setSelect("industryType")}
            >
              <SelectTrigger className="border-slate-200 text-sm w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {INDUSTRY_TYPES.map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className={"w-full gap-2"}>
          <Plus className="h-4 w-4" />
          Create Company
        </Button>
      </form>
     </div>
    </div>
  );
};

export default CreateCompanyForm;
