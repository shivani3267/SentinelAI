import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";


const TextAnalyzer = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleAnalyze = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/analyze`,
        { message }
      );

      setReport(data);
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message ||"Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0F172A] text-white px-4 py-10 relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
            Text Scam Analyzer
          </h1>

          <p className="text-center text-slate-400 mb-10 max-w-2xl mx-auto">
            Paste SMS, WhatsApp messages, emails, or suspicious
            conversations and let SentinelAI generate a detailed
            fraud risk report.
          </p>

          {/* Input Card */}
          <div
            className="
              bg-white/10
              backdrop-blur-xl
              border border-white/10
              rounded-3xl
              p-6
              shadow-[0_8px_32px_rgba(0,0,0,0.35)]
            "
          >
            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste suspicious message here..."
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-xl
                p-4
                text-white
                placeholder-slate-500
                outline-none
                focus:border-blue-500
                resize-none
              "
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="
                mt-5
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-800
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              {loading
                ? "Analyzing..."
                : "Get Scam Analysis"}
            </button>
          </div>

          {/* Report Section */}
          {report?.success && (
            <div
              className="
                mt-10
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
                shadow-[0_8px_32px_rgba(0,0,0,0.35)]
              "
            >
              <h2 className="text-3xl font-bold mb-6">
                Analysis Report
              </h2>

              {/* Stats */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <h3 className="text-slate-400 mb-2">
                    Risk Score
                  </h3>

                  <p
                    className={`text-3xl font-bold ${
                      report.riskScore >= 75
                        ? "text-red-400"
                        : report.riskScore >= 40
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {report.riskScore}/100
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <h3 className="text-slate-400 mb-2">
                    Confidence
                  </h3>

                  <p className="text-3xl font-bold text-blue-400">
                    {report.confidence}%
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <h3 className="text-slate-400 mb-2">
                    Category
                  </h3>

                  <p className="font-semibold text-slate-200">
                    {report.category}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <h3 className="text-slate-400 mb-2">
                    Threat Level
                  </h3>

                  <p className="font-semibold text-slate-200">
                    {report.threatLevel}
                  </p>
                </div>

              </div>

              {/* Red Flags */}
              <div className="mb-8">
                <h3 className="font-bold text-xl mb-3 text-red-400">
                  Red Flags
                </h3>

                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                  {report.redFlags?.map((flag, index) => (
                    <li key={index}>{flag}</li>
                  ))}
                </ul>
              </div>

              {/* Explanation */}
              <div className="mb-8">
                <h3 className="font-bold text-xl mb-3 text-blue-400">
                  Explanation
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  {report.explanation}
                </p>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-bold text-xl mb-3 text-green-400">
                  Recommendations
                </h3>

                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                  {report.recommendation?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default TextAnalyzer;