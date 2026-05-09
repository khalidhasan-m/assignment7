import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1F5B4B] text-white">
      <div className="mx-auto flex min-h-75 max-w-7xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* Logo / Title */}
        <h1 className="text-5xl font-bold tracking-tight">KeenKeeper</h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl text-sm text-gray-200">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Social */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Social Links</h3>

          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
            >
              <FaXTwitter size={16} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-4 border-white/10 pt-6 text-sm text-gray-300 md:flex-row">
          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms of Service
            </a>

            <a href="#" className="hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
