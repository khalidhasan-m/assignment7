import { useEffect, useState } from "react";

const StatusCard = () => {
  const [friends, setFriends] = useState([]);
  const [logs] = useState(() => {
    const saved = localStorage.getItem("contactLog");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const needAttention = friends.filter((f) => f.status !== "on-track").length;
  const thisMonth = logs.filter((log) => {
    const date = new Date(log.date);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 border-b-2 border-base-300 pb-10 flex-wrap px-4">

      <div className="p-6 md:p-8 text-center bg-base-100 w-[calc(50%-8px)] sm:w-48 md:w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold">{totalFriends}</h2>
        <p className="text-sm md:text-base">Total Friends</p>
      </div>

      <div className="p-6 md:p-8 text-center bg-base-100 w-[calc(50%-8px)] sm:w-48 md:w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold">{onTrack}</h2>
        <p className="text-sm md:text-base">On Track</p>
      </div>

      <div className="p-6 md:p-8 text-center bg-base-100 w-[calc(50%-8px)] sm:w-48 md:w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold">{needAttention}</h2>
        <p className="text-sm md:text-base">Need Attention</p>
      </div>

      <div className="p-6 md:p-8 text-center bg-base-100 w-[calc(50%-8px)] sm:w-48 md:w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold">{thisMonth}</h2>
        <p className="text-sm md:text-base">Interactions This Month</p>
      </div>

    </div>
  );
};

export default StatusCard;