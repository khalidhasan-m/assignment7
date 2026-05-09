const StatusCard = () => {
  return (
    <div className="flex items-center justify-center gap-6 mt-4 border-b-2 border-base-300 pb-10">
      <div className="p-8 text-center bg-base-100 w-[259.5px] h-34.25 shadow-sm">
        <h2 className="text-3xl">0</h2>
        <p>Total Friends</p>
      </div>
      <div className="p-8 text-center bg-base-100 w-[259.5px] h-34.25 shadow-sm">
        <h2 className="text-3xl">0</h2>
        <p>On Track</p>
      </div>
      <div className="p-8 text-center bg-base-100 w-[259.5px] h-34.25 shadow-sm">
        <h2 className="text-3xl">0</h2>
        <p>Need Attention</p>
      </div>
      <div className="p-8 text-center bg-base-100 w-[259.5px] h-34.25 shadow-sm">
        <h2 className="text-3xl">0</h2>
        <p>Interactions This Month</p>
      </div>
    </div>
  );
};

export default StatusCard;
