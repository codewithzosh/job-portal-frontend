import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className={"p-6"}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
