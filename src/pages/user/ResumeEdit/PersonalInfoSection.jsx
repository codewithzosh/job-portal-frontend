import React from "react";
import CopyFromMenu from "./shared/CopyFromMenu";
import { resumes } from "../Resumes/resumeData";
import { User } from "lucide-react";
import { useState } from "react";
import { Camera } from "lucide-react";
import { Loader } from "lucide-react";
import { useRef } from "react";
import FRow from "./shared/FRow";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { Globe } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updatePersonalInfo } from "../../../reduxt-store/resume/resumeThunk";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";

const PersonalInfoSection = ({resumeId,resume}) => {
  const pi=resume?.personalInfo??{}
  const dispatch=useDispatch()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    websiteUrl: "",
    profileImage:
      "https://res.cloudinary.com/dcpesbd8q/image/upload/v1782652019/job-portal/rugeudpc6hygdcvtc1ux.png",
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]

    if(!file){
      console.log("file not selected!")
      return
    }
    try {
      setIsUploadingImage(true)
      const url=await uploadToCloudinary(file)
      setForm((prev)=>({...prev,profileImage:url}))
      
      
    } catch (error) {
      console.log("image uploading error",error)
    }finally{
      setIsUploadingImage(false)
    }
    console.log(event.target.value);
  };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });


  const handleSave=()=>{
    dispatch(updatePersonalInfo({resumeId, data:form}))
    console.log("form ",form)
  }

  useEffect(()=>{

    if(pi){
      setForm({
        firstName:pi.firstName??"",
         lastName: pi.lastName ?? "",
        headline: pi.headline ?? "",
        email: pi.email ?? "",
        phone: pi.phone ?? "",
        city: pi.city ?? "",
        country: pi.country ?? "",
        linkedinUrl: pi.linkedinUrl ?? "",
        githubUrl: pi.githubUrl ?? "",
        portfolioUrl: pi.portfolioUrl ?? "",
        websiteUrl: pi.websiteUrl ?? "",
        profileImage: pi.profileImage ?? "",
      })
    }

  },[resume])

  console.log("current resume ------- ", resume)

  



  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CopyFromMenu resumes={resumes} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-2 border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
            {form.profileImage ? (
              <img src={form.profileImage} className="h-full w-full" />
            ) : (
              <User className="h-8 w-8 text-slate-400" />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shadow hover:bg-primary/90 disabled:opacity-60"
          >
            {isUploadingImage ? <Loader /> : <Camera className="h-3 w-3" />}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <p className="text-xs text-slate-400">
          Click camera to upload profile photo
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FRow label={"First Name"}>
          <Input
            value={form.firstName}
            onChange={f("firstName")}
            placeholder="zosh"
          />
        </FRow>

        <FRow label={"Last Name"}>
          <Input
            value={form.lastName}
            onChange={f("lastName")}
            placeholder="zosh"
          />
        </FRow>
      </div>

      <FRow label="Professional Headline">
        <Input
          value={form.headline}
          onChange={f("headline")}
          placeholder="Senior Software Engineer"
        />
      </FRow>

       <div className="grid grid-cols-2 gap-3">
        <FRow label="Email">
          <Input type="email" value={form.email} onChange={f("email")} />
        </FRow>
        <FRow label="Phone">
          <Input
            value={form.phone}
            onChange={f("phone")}
            placeholder="+1 555-0100"
          />
        </FRow>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FRow label="City">
          <Input value={form.city} onChange={f("city")} />
        </FRow>
        <FRow label="Country">
          <Input value={form.country} onChange={f("country")} />
        </FRow>
      </div>

      <Separator />

      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Online Presence
      </p>

      <FRow label="LinkedIn URL">
    
          <Input
            value={form.linkedinUrl}
            onChange={f("linkedinUrl")}
      
            placeholder="https://linkedin.com/in/…"
          />
        
      </FRow>

      <FRow label="GitHub URL">
    
          <Input
            value={form.githubUrl}
            onChange={f("githubUrl")}
      
            placeholder="https://github.com/…"
          />
        
      </FRow>

      <FRow label="Portfolio URL">
        <div className="relative">
          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={form.portfolioUrl}
            onChange={f("portfolioUrl")}
            className="pl-9"
            placeholder="https://mysite.com"
          />
        </div>
      </FRow>

       <FRow label="Website URL">
        <div className="relative">
          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={form.websiteUrl}
            onChange={f("websiteUrl")}
            className="pl-9"
          />
        </div>
      </FRow>
      <Button onClick={handleSave} className={"w-full"}><Check/> Save Personal Info</Button>
    </div>
  );
};

export default PersonalInfoSection;
