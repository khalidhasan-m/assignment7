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

  const onTrack = friends.filter(
    (f) => f.status === "on-track"
  ).length;

  const needAttention = friends.filter(
    (f) => f.status !== "on-track"
  ).length;

  const thisMonth = logs.filter((log) => {
    const date = new Date(log.date);
    const now = new Date();

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="flex items-center justify-center gap-6 mt-4 border-b-2 border-base-300 pb-10 flex-wrap">

      <div className="p-8 text-center bg-base-100 w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-3xl font-bold">{totalFriends}</h2>
        <p>Total Friends</p>
      </div>

      <div className="p-8 text-center bg-base-100 w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-3xl font-bold">{onTrack}</h2>
        <p>On Track</p>
      </div>

      <div className="p-8 text-center bg-base-100 w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-3xl font-bold">{needAttention}</h2>
        <p>Need Attention</p>
      </div>

      <div className="p-8 text-center bg-base-100 w-[259.5px] shadow-sm rounded-xl">
        <h2 className="text-3xl font-bold">{thisMonth}</h2>
        <p>Interactions This Month</p>
      </div>

    </div>
  );
};

export default StatusCard;