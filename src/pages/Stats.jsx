import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#1F5B4B", "#37a163", "#7f37f5"];

const Stats = () => {
  const [data] = useState(() => {
    const logs = JSON.parse(localStorage.getItem("contactLog")) || [];

    const counts = { Call: 0, Text: 0, Video: 0 };

    logs.forEach((log) => {
      if (counts[log.method] !== undefined) {
        counts[log.method]++;
      }
    });

    return [
      { name: "Call", value: counts.Call },
      { name: "Text", value: counts.Text },
      { name: "Video", value: counts.Video },
    ];
  });

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Friendship Analytics
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Track how you connect with your friends
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 md:p-8">

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-3 md:p-4">
              <p className="text-xl md:text-2xl font-bold text-gray-800">{total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 md:p-4">
              <p className="text-xl md:text-2xl font-bold text-green-900">
                {data.find((d) => d.name === "Call")?.value || 0}
              </p>
              <p className="text-xs text-gray-500">Calls</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 md:p-4">
              <p className="text-xl md:text-2xl font-bold text-violet-600">
                {data.find((d) => d.name === "Video")?.value || 0}
              </p>
              <p className="text-xs text-gray-500">Videos</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="h-64 sm:h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="50%"
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, value }) => value ? `${name}: ${value}` : ""}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Stats;