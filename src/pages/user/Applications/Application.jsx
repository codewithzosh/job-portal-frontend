import { FileText } from "lucide-react";
import React from "react";
import ApplicationStateCard from "./ApplicationStateCard";
import { Briefcase } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Users } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useState } from "react";

import ApplicationCard from "./ApplicationCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyApplications, withdrawApplication } from "../../../reduxt-store/application/applicationThunk";
import { useSelector } from "react-redux";

const Application = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const dispatch = useDispatch();
  const {myApplications}=useSelector(store=>store.application)
  const stats = {
    total: 5,
    active: 4,
    shortlisted: 3,
    hired: 1,
  };

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, []);


 


  console.log("myApplications ------------------- ",myApplications)
  return (
    <div className="max-w-5xl min-w-5xl max-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          My Applications
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Track and manage your job applications
        </p>
      </div>

      {/* state */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <ApplicationStateCard
          label={"Total Applied"}
          value={stats.total}
          icon={Briefcase}
          color={"text-primary bg-blue-50"}
        />

        <ApplicationStateCard
          label={"Active"}
          value={stats.active}
          icon={TrendingUp}
          color={"text-indigo-600 bg-indigo-50"}
        />

        <ApplicationStateCard
          label={"Shortlisted"}
          value={stats.shortlisted}
          icon={CheckCircle2}
          color={"text-purple-600 bg-purple-50"}
        />

        <ApplicationStateCard
          label="Hired"
          value={stats.hired}
          icon={Users}
          color="text-green-600 bg-green-50"
        />
      </div>

      {/* tabs */}

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className={"space-y-4"}
      >
        <TabsList className={"flex-wrap h-auto"}>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="hired">Hired</TabsTrigger>
          <TabsTrigger value="rejected">Closed</TabsTrigger>
        </TabsList>
        <TabsContent className={"space-y-2"} value={selectedTab}>
          {myApplications.map((item) => (
            <ApplicationCard key={item.id} app={item} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Application;
