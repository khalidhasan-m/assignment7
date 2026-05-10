import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#1F5B4B] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">

        {/* 404 Number */}
        <h1 className="text-[100px] sm:text-[140px] md:text-[220px] font-bold text-white/15 leading-none">
          404
        </h1>

        {/* Glass Card */}
        <div className="-mt-10 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Lost in KeenKeeper?
          </h2>

          <p className="mt-4 text-gray-200 text-base sm:text-lg leading-relaxed">
            Looks like this page wandered off the shelf.
            The connection you're looking for doesn't exist
            or may have been moved.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="rounded-full bg-white px-8 py-3 font-semibold text-[#1F5B4B] transition hover:scale-105"
            >
              Back Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-sm text-white/60">
          © 2026 KeenKeeper. Keep your connections close.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;