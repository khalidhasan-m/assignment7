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

    localStorage.setItem(
      "contactLog",
      JSON.stringify(updated)
    );

    toast.success(
      `${method} check-in logged with ${friend.name}!`
    );
  };

  if (!friend)
    return (
      <p className="mt-20 text-center text-gray-400">
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
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:py-10">
      
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-800"
        >
          ← Back
        </button>

        {/* Main Layout */}
        <div className="flex flex-col gap-6 lg:flex-row">

          {/* ───────── LEFT SIDE ───────── */}
          <div className="flex w-full flex-col gap-4 lg:w-72 shrink-0">

            {/* Profile Card */}
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">

              <img
                src={friend.picture}
                alt={friend.name}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-100"
              />

              <h2 className="text-xl font-bold text-gray-800">
                {friend.name}
              </h2>

              {/* Status */}
              <span
                className={`rounded-full px-5 py-2 text-sm font-medium capitalize text-white ${
                  statusStyles[friend.status]
                }`}
              >
                {friend.status}
              </span>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {friend.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="badge badge-success badge-outline font-semibold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="wrap-break-word text-xs italic leading-relaxed text-gray-400">
                "{friend.bio?.split(".")[0]}."
              </p>

              {/* Email */}
              <p className="break-all text-xs text-gray-400">
                {friend.email}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <button className="flex w-full items-center gap-3 border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50">
                <FiBell className="text-base text-gray-500" />
                Snooze 2 Weeks
              </button>

              <button className="flex w-full items-center gap-3 border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50">
                <FiArchive className="text-base text-gray-500" />
                Archive
              </button>

              <button className="flex w-full items-center gap-3 px-5 py-4 text-sm text-red-500 transition hover:bg-red-50">
                <FiTrash2 className="text-base text-red-400" />
                Delete
              </button>

            </div>
          </div>

          {/* ───────── RIGHT SIDE ───────── */}
          <div className="flex flex-1 flex-col gap-5">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-800">
                  {friend.days_since_contact}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Days Since Contact
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-800">
                  {friend.goal}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Goal (Days)
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <p className="text-xl font-bold text-gray-800">
                  {formatDate(friend.next_due_date)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Next Due
                </p>
              </div>

            </div>

            {/* Relationship Goal */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-base font-semibold text-gray-800">
                  Relationship Goal
                </p>

                <button className="rounded-lg border border-gray-200 px-4 py-2 text-xs text-gray-500 transition hover:bg-gray-50">
                  Edit
                </button>

              </div>

              <p className="text-sm leading-relaxed text-gray-500">
                Connect every{" "}
                <span className="font-bold text-gray-800">
                  {friend.goal} days
                </span>
              </p>

            </div>

            {/* Quick Check-In */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <p className="mb-4 text-base font-semibold text-gray-800">
                Quick Check-In
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <button
                  onClick={() => handleCheckIn("Call")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 py-5 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <BsTelephone className="text-2xl text-gray-700" />
                  Call
                </button>

                <button
                  onClick={() => handleCheckIn("Text")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 py-5 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <BsChatSquareText className="text-2xl text-gray-700" />
                  Text
                </button>

                <button
                  onClick={() => handleCheckIn("Video")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 py-5 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <BsCameraVideo className="text-2xl text-gray-700" />
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