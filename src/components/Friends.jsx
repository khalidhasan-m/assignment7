import { useEffect, useState } from "react";
import FriendsCard from "./FriendsCard";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch(() => {
        setFriends([]);
        setLoading(false);
      });
  }, []);

  // LOADING UI - skeleton cards
  if (loading) {
    return (
      <div className="pb-20 px-4">
        <h2 className="pb-8 pt-10 text-3xl font-bold text-center">
          Your Friends
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-72 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm animate-pulse"
            >
              {/* Image */}
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-gray-200"></div>
              </div>

              {/* Name */}
              <div className="mt-5 h-5 w-2/3 bg-gray-200 rounded mx-auto"></div>

              {/* Text */}
              <div className="mt-3 h-3 w-1/3 bg-gray-200 rounded mx-auto"></div>

              {/* Tags */}
              <div className="mt-5 flex justify-center gap-2">
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
              </div>

              {/* Status */}
              <div className="mt-5 flex justify-center">
                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="pb-20 px-4">
      <h2 className="pb-8 pt-10 text-3xl font-bold text-center">
        Your Friends
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {friends.map((friend) => (
          <FriendsCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;