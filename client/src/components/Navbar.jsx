import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
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
            to="/dashboard"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/text-analysis"
            className="hover:text-blue-400 transition"
          >
            Analyse Text
          </Link>

          <Link
            to="/img-analysis"
            className="hover:text-blue-400 transition"
          >
            Analyse Image
          </Link>
        </div>

        <Link
          to="/text-analysis"
          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
        >
          Analyze
        </Link>
      </div>
    </nav>
  );
}