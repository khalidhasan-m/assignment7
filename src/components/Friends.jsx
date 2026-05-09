import { useEffect, useState } from "react";
import FriendsCard from "./FriendsCard";

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, []);

  return (
    <div className="pb-20 px-4">
      <h2 className="pb-8 pt-10 text-3xl font-bold">
        Your Friends
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {friends.map((friend) => (
          <FriendsCard
            key={friend.id}
            friend={friend}
          />
        ))}
      </div>
    </div>
  );
};

export default Friends;