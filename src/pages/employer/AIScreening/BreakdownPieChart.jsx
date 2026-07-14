import React from "react";
import { STATUS_CFG, STATUS_ORDER } from "./config";
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts";

const BreakdownPieChart = ({ dist, total, size = 180 }) => {
  const data = STATUS_ORDER.map((s) => ({
    key: s,
    value: dist[s],
    fill: STATUS_CFG[s].color,
    label: STATUS_CFG[s].label,
  })).filter((d) => d.value > 0);

  if (total === 0 || data.length === 0)
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No data
      </div>
    );

  return (
    <PieChart width={size} height={size}>
      <Tooltip
        content={({ payload }) => {
          if (!payload?.length) return null;
          const { label, value } = payload[0].payload;

          return (
            <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
              <span className="font-medium">{label}</span>
              <span className="ml-2 font-mono tabular-nums text-muted-foreground">
                {value}
              </span>
            </div>
          );
        }}
      />
      <Pie
        data={data}
        cx={size / 2}
        cy={size / 2}
        innerRadius={size / 2 - 34}
        outerRadius={size / 2 - 6}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
        strokeWidth={2}
        stroke="#fff"
      >
        {data.map((d) => (
          <Cell key={d.key} fill={d.fill} />
        ))}

        <Label
          content={({ viewBox }) => {
            const { cx, cy } = viewBox;

            return (
              <text textAnchor="middle">
                <tspan x={cx} y={cy} fontSize={20} fontWeight={"700"} >
                  {total}
                </tspan>
                <tspan x={cx} y={cy + 10} fontSize={10}  fill="#94a3b8">
                  total
                </tspan>
              </text>
            );
          }}
        />
      </Pie>
    </PieChart>
  );
};

export default BreakdownPieChart;
