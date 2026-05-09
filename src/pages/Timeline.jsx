import { useState } from "react";
import { BsTelephone, BsChatSquareText, BsCameraVideo } from "react-icons/bs";

const methodConfig = {
  Call: {
    icon: <BsTelephone className="text-gray-600 text-lg" />,
    label: "Call",
  },
  Text: {
    icon: <BsChatSquareText className="text-gray-600 text-lg" />,
    label: "Text",
  },
  Video: {
    icon: <BsCameraVideo className="text-gray-600 text-lg" />,
    label: "Video",
  },
};

const Timeline = () => {
  const [filter, setFilter] = useState("All");

  const [contacts] = useState(() => {
    const saved = localStorage.getItem("contactLog");
    return saved ? JSON.parse(saved) : [];
  });

  const filtered =
    filter === "All" ? contacts : contacts.filter((c) => c.method === filter);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Timeline</h2>

        {/* Filter dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-6 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 bg-white focus:outline-none cursor-pointer"
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>

        {/* Timeline list */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-12">
              No check-ins yet. Go connect with someone!
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((log, i) => {
                const config = methodConfig[log.method];
                return (
                  <li key={i} className="flex items-center gap-4 px-5 py-4">
                    {/* Icon circle */}
                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      {config.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{config.label}</span>{" "}
                        <span className="text-gray-500">with {log.friendName}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(log.date)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Timeline;