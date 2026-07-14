import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

const StateCard = ({ label, value, sub, icon: Icon, iconClass }) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1 leading-none">{value}</p>
            {sub && <p  className="text-xs text-slate-400 mt-1.5">{sub}</p>}
          </div>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
          >
            <Icon className={"h-5 w-5"} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StateCard;
