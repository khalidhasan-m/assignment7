import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FiBell, FiArchive, FiTrash2 } from "react-icons/fi";
import { BsTelephone, BsChatSquareText, BsCameraVideo } from "react-icons/bs";
import { toast } from "react-toastify";

const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contactLog");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === Number(id));
        setFriend(found);
      });
  }, [id]);

  const handleCheckIn = (method) => {
    const log = {
      friendId: friend.id,
      friendName: friend.name,
      picture: friend.picture,
      method,
      date: new Date().toISOString(),
    };
    const updated = [log, ...contacts];
    setContacts(updated);
    localStorage.setItem("contactLog", JSON.stringify(updated));
    toast.success(`${method} check-in logged with ${friend.name}!`);
  };

  if (!friend)
    return (
      <p className="text-center mt-20 text-gray-400">
        Loading...
      </p>
    );

  const statusStyles = {
    overdue: "bg-red-500",
    "almost due": "bg-yellow-500",
    "on-track": "bg-green-500",
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          ← Back
        </button>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-3 lg:w-56 shrink-0">

            {/* Profile card */}
            <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 flex flex-col items-center text-center gap-3">

              <img
                src={friend.picture}
                alt={friend.name}
                className="h-20 w-20 rounded-full object-cover"
              />

              <p className="font-semibold text-gray-800 text-base">
                {friend.name}
              </p>

              {/* STATUS */}
              <span
                className={`rounded-full capitalize px-5 py-2 text-sm font-medium text-white ${
                  statusStyles[friend.status]
                }`}
              >
                {friend.status}
              </span>

              {/* TAGS */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {friend.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="badge badge-success badge-outline font-semibold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400 italic leading-relaxed">
                "{friend.bio?.split(".")[0]}."
              </p>

              <p className="text-xs text-gray-400">
                Preferred: email
              </p>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100">
                <FiBell className="text-gray-500 text-base" /> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100">
                <FiArchive className="text-gray-500 text-base" /> Archive
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition">
                <FiTrash2 className="text-red-400 text-base" /> Delete
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col items-center justify-center text-center">
                <p className="text-3xl font-bold text-gray-800">
                  {friend.days_since_contact}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Days Since Contact
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col items-center justify-center text-center">
                <p className="text-3xl font-bold text-gray-800">
                  {friend.goal}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Goal (Days)
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col items-center justify-center text-center">
                <p className="text-xl font-bold text-gray-800">
                  {formatDate(friend.next_due_date)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Next Due
                </p>
              </div>
            </div>

            {/* Goal */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-base font-semibold text-gray-800">
                  Relationship Goal
                </p>
                <button className="text-xs border border-gray-200 rounded-lg px-4 py-1.5 text-gray-500 hover:bg-gray-50 transition">
                  Edit
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Connect every{" "}
                <span className="font-bold text-gray-800">
                  {friend.goal} days
                </span>
              </p>
            </div>

            {/* Quick Check-In */}
            <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-base font-semibold text-gray-800 mb-4">
                Quick Check-In
              </p>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn("Call")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <BsTelephone className="text-xl text-gray-700" />
                  Call
                </button>

                <button
                  onClick={() => handleCheckIn("Text")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <BsChatSquareText className="text-xl text-gray-700" />
                  Text
                </button>

                <button
                  onClick={() => handleCheckIn("Video")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <BsCameraVideo className="text-xl text-gray-700" />
                  Video
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;