import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";

const colorMap = {
  blue: {
    bg: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-200",
    glow: "bg-blue-400",
  },
  green: {
    bg: "from-emerald-500 to-green-600",
    shadow: "shadow-emerald-200",
    glow: "bg-emerald-400",
  },
  purple: {
    bg: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-200",
    glow: "bg-violet-400",
  },
  orange: {
    bg: "from-orange-500 to-amber-500",
    shadow: "shadow-orange-200",
    glow: "bg-orange-400",
  },
  red: {
    bg: "from-red-500 to-rose-600",
    shadow: "shadow-red-200",
    glow: "bg-red-400",
  },
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  description,
}) => {
  const colors = colorMap[color];
  return (
    <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <CardContent className={"p-6"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              {value}
            </p>
            {description && (
              <p className="text-xs text-slate-400 truncate">{description}</p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
              colors.bg,
              colors.shadow,
            )}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
      <div className={cn(
          "absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-[0.06]",
          colors.glow
        )}/>
    </Card>
  );
};

export default StatsCard;
