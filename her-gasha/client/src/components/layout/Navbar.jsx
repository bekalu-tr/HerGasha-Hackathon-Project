
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Heart,
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  HandHeart,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  ShieldCheck
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Temporary authentication check.
  // Replace with AuthContext when authentication is integrated.
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = Boolean(token && user);

  const navLinks = [
    { name: "Home", path: "/", icon: Heart },
    { name: "Report", path: "/report", icon: ShieldCheck },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Opportunities", path: "/opportunities", icon: BriefcaseBusiness },
    { name: "Support", path: "/support", icon: HandHeart }
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-[#D90083]"
        : "text-gray-600 hover:text-[#D90083]"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <img
            src="/images/her-gasha-logo.png"
            alt="Her Gasha logo"
            className="h-11 w-11 rounded-full object-contain"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div>
            <h1 className="text-xl font-extrabold leading-tight text-[#4B1248]">
              Her Gasha
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-gray-500">
              SAFETY • OPPORTUNITY • SUPPORT
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={linkClass}
              >
                <Icon size={16} />
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B1248] text-sm font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <span className="max-w-28 truncate text-sm font-semibold text-[#4B1248]">
                  {user?.name || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-pink-200 px-4 py-2 text-sm font-semibold text-[#4B1248] transition hover:bg-pink-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#4B1248] transition hover:bg-pink-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#D90083] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B80070]"
              >
                Join Her Gasha
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-[#4B1248] transition hover:bg-pink-50 lg:hidden"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-pink-100 bg-white px-4 py-5 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setIsOpen(false)}
                  className={linkClass}
                >
                  <Icon size={18} />
                  {link.name}
                </NavLink>
              );
            })}

            <div className="my-1 border-t border-gray-100" />

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#4B1248]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  {user?.name || "User"}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left text-sm font-semibold text-red-600"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#4B1248]"
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#D90083] px-4 py-3 text-sm font-semibold text-white"
                >
                  <UserPlus size={17} />
                  Join Her Gasha
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
