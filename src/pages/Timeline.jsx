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
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const [contacts] = useState(() => {
    const saved = localStorage.getItem("contactLog");
    return saved ? JSON.parse(saved) : [];
  });

  //  FILTER (Call/Text/Video + search)
  let filtered = contacts.filter((c) => {
    const matchFilter = filter === "All" || c.method === filter;

    const matchSearch =
      c.friendName.toLowerCase().includes(search.toLowerCase()) ||
      c.method.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  //  SORT
  filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Timeline
        </h2>

        {/* SEARCH FILTER SORT */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          <input
            type="text"
            placeholder="Search friend or method..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

        </div>

        {/* TIMELINE LIST */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">

          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-12">
              No check-ins found.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((log, i) => {
                const config = methodConfig[log.method];

                return (
                  <li key={i} className="flex items-center gap-4 px-5 py-4">

                    {/* Icon */}
                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      {config.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">
                          {config.label}
                        </span>{" "}
                        <span className="text-gray-500">
                          with {log.friendName}
                        </span>
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(log.date)}
                      </p>
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