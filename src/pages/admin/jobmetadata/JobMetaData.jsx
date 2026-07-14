import { Zap } from "lucide-react";
import { Tag } from "lucide-react";
import { FolderTree } from "lucide-react";
import React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import CategoryTab from "./CategoryTab";
import SkillTab from "./SkillTab";
import TagTab from "./TagTab";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchSkills, fetchTags } from "../../../reduxt-store/jobMeta/jobMetaThunk";

const JobMetaData = () => {
  const { categories,skills,tags } = useSelector((state) => state.jobMeta);
  const dispatch = useDispatch();
  const jobMetaData = [
    {
      icon: FolderTree,
      label: "Categories",
      count: categories.length,
      color: "text-brand bg-blue-50 border-blue-200",
    },
    {
      icon: Zap,
      label: "Skills",
      count: skills.length,
      color: "text-violet-600 bg-violet-50 border-violet-200",
    },
    {
      icon: Tag,
      label: "Tags",
      count: tags.length,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSkills())
    dispatch(fetchTags())
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">
          Job Metadata Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage job categories, skills, and tags used across the platform
        </p>
      </section>

      <section className="flex flex-wrap gap-3">
        {jobMetaData.map((item, index) => {
          const Icon = item.icon;
          const color = item.color;
          return (
            <div
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold ${color}`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.count}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </section>

      <Tabs defaultValue="categories" className={"space-y-4"}>
        <TabsList>
          <TabsTrigger value="categories">
            <FolderTree />
            Categories
            <span className="ml-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 leading-none">
              {categories.length}
            </span>
          </TabsTrigger>

          <TabsTrigger value="skills">
            <FolderTree />
            Skills
            <span className="ml-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 leading-none">
              {skills.length}
            </span>
          </TabsTrigger>

          <TabsTrigger value="tags">
            <FolderTree />
            Tags
            <span className="ml-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 leading-none">
              {tags.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <CategoryTab categories={categories} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillTab skills={skills} />
        </TabsContent>
        <TabsContent value="tags">
          <TagTab tags={tags} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobMetaData;
