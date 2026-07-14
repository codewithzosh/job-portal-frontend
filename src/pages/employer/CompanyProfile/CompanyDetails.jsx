import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Save } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCompany } from "../../../reduxt-store/company/companyThunk";

const CompanyDetails = () => {
  const { myCompany } = useSelector((state) => state.company);
  const dispatch=useDispatch()
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    logoUrl: "",
    coverImageUrl: "",
    website: "",
    email: "",
    phone: "",
    foundedYear: "",
    companySize: "",
    companyType: "",
    industryType: "",
    registrationNumber: "",
  });

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  useEffect(()=>{

    if(myCompany){
      setForm({
        ...myCompany
      })
    }

  },[myCompany])

  const handleSubmit=(e) => {
    e.preventDefault();

    dispatch(updateCompany({id:myCompany.id,...form}))

    console.log("Form submitted:", form);


}

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Indentity */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={form.name}
                onChange={set("name")}
                placeholder="Enter company name"
                required
                className="border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">
                Tagline
              </Label>
              <Input
                value={form.tagline}
                onChange={set("tagline")}
                placeholder="Enter company tagline"
                className="border-slate-200"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={form.description}
              onChange={set("description")}
              placeholder="Enter company description"
              required
              className="border-slate-200"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">
                Logo URL
              </Label>
              <Input
                value={form.logoUrl}
                onChange={set("logoUrl")}
                placeholder="Enter logo URL"
                className="border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">
                Cover Image URL
              </Label>
              <Input
                value={form.coverImageUrl}
                onChange={set("coverImageUrl")}
                placeholder="Enter cover image URL"
                className="border-slate-200"
              />
            </div>
          </div>
        </section>

        {/* Contact & Web */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Contact & Web
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">
                Company Website 
              </Label>
              <Input
                value={form.website}
                onChange={set("website")}
                placeholder="Enter company website"
          
                className="border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">
                Company Email
              </Label>
              <Input
                value={form.email}
                onChange={set("email")}
                placeholder="Enter company email"
                className="border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600">
                Phone
              </Label>
              <Input
                value={form.phone}
                onChange={set("phone")}
                placeholder="Enter company phone"
                className="border-slate-200"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-2">

            <Button  className="gap-2 bg-primary hover:bg-primary/90" type="submit">
                <Save className="h-4 w-4" /> Save Changes
            </Button>

        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;
