"use client";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarDataPoint {
  dimension: string;
  score: number;
  fullMark: number;
}

interface Props {
  data: RadarDataPoint[];
  color?: string;
}

export default function RadarChart({ data, color = "#1e40af" }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fontSize: 11, fill: "#4b5563" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          tickCount={6}
        />
        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(1)}%`, "Puntaje"]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        />
        <Radar
          name="Puntaje"
          dataKey="score"
          stroke={color}
          fill={color}
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
