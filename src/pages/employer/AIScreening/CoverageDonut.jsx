import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const CoverageDonut = ({ screened, total, size = 120, stroke = 12 }) => {
  const pct = total === 0 ? 0 : Math.round((screened / total) * 100);
  const color = pct >= 75 ? "#16a34a" : pct >= 40 ? "#d97706" : "#dc2626";
  const r = (size - stroke) / 2;

  const data = [
    { name: "screened", value: pct, fill: color },
    { name: "unscreened", value: 100 - pct, fill: "#e5e7eb" },
  ];

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx={size / 2}
          cy={size / 2}
          innerRadius={r - stroke / 2}
          outerRadius={r}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((d) => (
            <Cell key={d.key} fill={d.fill} />
          ))}
        </Pie>
      </PieChart>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold leading-none">{pct}%</span>
        <span className="text-[10px] text-slate-400 mt-0.5"> screened</span>
      </div>
    </div>
  );
};

export default CoverageDonut;
