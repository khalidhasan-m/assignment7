import { useNavigate } from "react-router";

const FriendsCard = ({ friend }) => {
  const navigate = useNavigate();

  const statusStyles = {
    "overdue": "bg-red-500",
    "almost due": "bg-yellow-500",
    "on-track": "bg-green-500",
  };

  return (
    <div
      onClick={() => navigate(`/friends/${friend.id}`)}
      className="w-full max-w-72 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      <div className="flex justify-center">
        <img
          src={friend.picture}
          alt={friend.name}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-100"
        />
      </div>
      <h2 className="mt-5 text-2xl font-bold text-gray-800">{friend.name}</h2>
      <p className="mt-2 text-sm text-gray-500">{friend.days_since_contact}d ago</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {friend.tags.map((tag, index) => (
          <span key={index} className="badge badge-success badge-outline font-semibold uppercase">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <span className={`rounded-full capitalize px-5 py-2 text-sm font-medium text-white ${statusStyles[friend.status]}`}>
          {friend.status}
        </span>
      </div>
    </div>
  );
};

export default FriendsCard;