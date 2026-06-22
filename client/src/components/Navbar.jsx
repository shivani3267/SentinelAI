import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <Shield className="text-blue-500" />
          <span>
            Sentinel<span className="text-blue-500">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-slate-300">
          <Link
            to="/features"
            className="hover:text-blue-400 transition"
          >
            Features
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/reports"
            className="hover:text-blue-400 transition"
          >
            Reports
          </Link>
        </div>

        <Link
          to="/analyze"
          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
        >
          Analyze
        </Link>
      </div>
    </nav>
  );
}