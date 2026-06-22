import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 ">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="font-semibold text-lg">
            Sentinel<span className="text-blue-500">AI</span>
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            AI-powered scam and fraud detection platform.
          </p>
        </div>

      </div>
    </footer>
  );
}