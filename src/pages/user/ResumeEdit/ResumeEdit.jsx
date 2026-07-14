import { FileText } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Code2 } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { Languages } from "lucide-react";
import { Settings } from "lucide-react";
import { Award } from "lucide-react";
import { FolderGit2 } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { User } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import PersonalInfoSection from "./PersonalInfoSection";
import { resumes } from "../ApplyNow/dumyResume";
import SummarySection from "./SummarySection";
import WorkExperienceSection from "./WorkExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import { CertificationsSection } from "./CertificationsSection";
import AwardsSection from "./AwardsSection";
import { LanguagesIcon } from "lucide-react";
import ResumeSettingsSection from "./ResumeSettingsSection";
import LanguagesSection from "./LanguagesSection";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchResumeById } from "../../../reduxt-store/resume/resumeThunk";

const SECTIONS = [
  { key: "personal", label: "Personal Info", icon: User, field: null },
  { key: "summary", label: "Summary", icon: FileText, field: "summary" },
  {
    key: "experience",
    label: "Work Experience",
    icon: Briefcase,
    field: "workExperiences",
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
    field: "educations",
  },
  { key: "skills", label: "Skills", icon: Code2, field: "skills" },
  { key: "projects", label: "Projects", icon: FolderGit2, field: "projects" },

  { key: "languages", label: "Languages", icon: Languages, field: "languages" },
  { key: "settings", label: "Settings", icon: Settings, field: null },
];

const ResumeEdit = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const { id } = useParams();
  const { currentResume:resume } = useSelector((store) => store.resume);

  const dispatch = useDispatch();

  useEffect(() => {
    if(id){
      dispatch(fetchResumeById(id));
    }
    
  }, [id]);

  console.log("resume id", id);
  return (
    <div className="flex flex-col h-[95vh] w-full">
      <div className="flex flex-1 overflow-hidden">
        {/* SideBar */}
        <aside className="w-64 shrink-0 bg-white border-r border-slate-200 overflow-y-auto flex flex-col">
          <div className="p-3 space-y-0.5 flex-1">
            {SECTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  onClick={() => setActiveSection(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                    activeSection.key === item.key
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <activeSection.icon className="text-primary" />
                {activeSection?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeSection.key === "personal" && (
                <PersonalInfoSection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}

              {activeSection.key === "summary" && (
                <SummarySection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}

              {activeSection.key === "experience" && (
                <WorkExperienceSection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}

              {activeSection.key === "education" && (
                <EducationSection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}

              {activeSection.key === "skills" && (
                <SkillsSection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}

              {activeSection.key === "projects" && (
                <ProjectSection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}

            

              {activeSection.key === "languages" && (
                <LanguagesSection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}
              

              {activeSection.key === "settings" && (
                <ResumeSettingsSection
                  resumeId={id}
                  resume={resume}
                  otherResumes={resumes}
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ResumeEdit;
