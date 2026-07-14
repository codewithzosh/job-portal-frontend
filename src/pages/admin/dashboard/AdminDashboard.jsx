import { Briefcase } from "lucide-react";
import { FileText } from "lucide-react";
import { Building2 } from "lucide-react";
import { Users } from "lucide-react";
import React from "react";
import StatsCard from "./StatsCard";
import UserTable from "../users/UserTable";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllUsers } from "../../../reduxt-store/adminUser/adminThunk";
import { useDispatch } from "react-redux";




const AdminDashboard = () => {
  const {users}=useSelector(state=>state.adminUser)
  const dispatch=useDispatch()
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
  {
    title: "Total Users",
    value: users?.length || 0,
    icon: Users,
    color: "blue",
    description: "2,341 active this week",
  },
  {
    title: "Active Jobs",
    value: "8,234",
    icon: Briefcase,
    color: "green",
    description: "523 posted today",
  },
  {
    title: "Companies",
    value: "1,452",
    icon: Building2,
    color: "purple",
    description: "124 pending review",
  },
  {
    title: "Applications",
    value: "45,678",
    icon: FileText,
    color: "orange",
    description: "3,211 submitted today",
  },
];

 useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">{today}</p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((state)=><StatsCard key={state.title} {...state}/>)}
      </div>
      <UserTable users={users}/>
    </div>
  );
};

export default AdminDashboard;
