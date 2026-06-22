import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import Tesseract from "tesseract.js";

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setReport(null);
  };

  const handleAnalyze = async () => {
    if (!image) return toast.error("Please upload an image");
    
    try {
      setLoading(true);
      const { data: ocrData } = await Tesseract.recognize(image, "eng");
      
      if (!ocrData?.text?.trim()) return toast.error("No text found in image");

      const { data: resData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/analyze`,
        { message: ocrData.text }
      );

      if (resData.success) {
        setReport(resData.data || resData);
        toast.success("Analysis completed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0F172A] text-white px-4 py-10 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold text-center mb-3">Image Scam Analyzer</h1>
          <p className="text-center text-slate-400 mb-10">Upload screenshot to analyze scam risk indicators.</p>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-sm cursor-pointer" />
            {preview && <img src={preview} alt="Preview" className="mt-5 h-64 w-full object-contain rounded-xl bg-black/20" />}
            <button onClick={handleAnalyze} disabled={loading || !image} className="mt-5 w-full  bg-blue-600  hover:bg-blue-700  disabled:bg-blue-800 py-3 rounded-xl font-semibold transition shadow-lg">
              {loading ? "Analyzing..." : "Get Scam Analysis"}
            </button>
          </div>

          {report && (
            <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 border-b border-white/5 pb-3">Analysis Report</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card title="Risk Score" value={`${report.riskScore}/100`} color={report.riskScore >= 75 ? "text-red-400" : report.riskScore >= 40 ? "text-yellow-400" : "text-emerald-400"} />
                <Card title="Confidence" value={`${report.confidence}%`} color="text-blue-400" />
                <Card title="Category" value={report.category || "General"} color="text-slate-200" />
                <Card title="Threat Level" value={report.threatLevel || "Low"} color={report.riskScore >= 40 ? "text-red-400" : "text-emerald-400"} />
              </div>

              {report.redFlags?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-red-400 text-xl font-bold mb-2">Red Flags</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">{report.redFlags.map((f, i) => <li key={i}>{f}</li>)}</ul>
                </div>
              )}

              {report.explanation && (
                <div className="mt-6">
                  <h3 className="text-blue-400 text-xl font-bold mb-2">Explanation</h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{report.explanation}</p>
                </div>
              )}

              {(report.recommendation || report.recommendations)?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-green-400 text-xl font-bold mb-2">Recommendations</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">{(report.recommendation || report.recommendations).map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const Card = ({ title, value, color }) => (
  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
    <h3 className="text-slate-400 text-xs uppercase font-semibold mb-1">{title}</h3>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

export default ImageAnalyzer;