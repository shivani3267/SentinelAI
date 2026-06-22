import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js elements
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setDashboard(data);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-blue-400 text-xl font-medium tracking-wide">
        Loading Dashboard...
      </div>
    );
  }

  const {
    overview,
    categoryDistribution,
    threatDistribution,
    languageDistribution,
    dailyTrend,
  } = dashboard;

  // Chart options for linear scaling axes (Bar & Line charts)
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8", // slate-400
          font: { family: "sans-serif", size: 11 },
        },
      },
    },
    scales: {
      x: { 
        grid: { color: "rgba(255, 255, 255, 0.05)" }, 
        ticks: { color: "#94a3b8", font: { size: 10 } } 
      },
      y: { 
        grid: { color: "rgba(255, 255, 255, 0.05)" }, 
        ticks: { color: "#94a3b8", font: { size: 10 } } 
      },
    },
  };

  // Chart options for circular dimensions (Pie & Doughnut charts)
  const circularChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { 
          color: "#94a3b8", 
          font: { size: 10 } 
        },
      },
    },
  };

  // Dataset Mappings
  const categoryChartData = {
    labels: categoryDistribution.map((item) => item._id),
    datasets: [
      {
        data: categoryDistribution.map((item) => item.count),
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)", 
          "rgba(6, 182, 212, 0.6)", 
          "rgba(239, 68, 68, 0.6)", 
          "rgba(245, 158, 11, 0.6)"
        ],
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const threatChartData = {
    labels: threatDistribution.map((item) => item._id),
    datasets: [
      {
        data: threatDistribution.map((item) => item.count),
        backgroundColor: [
          "rgba(239, 68, 68, 0.6)", 
          "rgba(245, 158, 11, 0.6)", 
          "rgba(34, 197, 94, 0.6)"
        ],
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const languageChartData = {
    labels: languageDistribution.map((item) => item._id),
    datasets: [
      {
        label: "Languages",
        data: languageDistribution.map((item) => item.count),
        backgroundColor: "rgba(6, 182, 212, 0.5)",
        borderColor: "rgb(6, 182, 212)",
        borderWidth: 1,
      },
    ],
  };

  const trendChartData = {
    labels: dailyTrend.map((item) => item._id),
    datasets: [
      {
        label: "Total Reports",
        data: dailyTrend.map((item) => item.total),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Scams",
        data: dailyTrend.map((item) => item.scams),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Decorative Glow Effects */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            System Metrics Intelligence
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 tracking-tight">
            SentinelAI <span className="text-blue-500">Dashboard</span>
          </h1>
        </header>

        {/*  KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <Card title="Total Analyses" value={overview.totalAnalyses} />
          <Card title="Total Scams" value={overview.totalScams} accent color="text-red-400" />
          <Card title="Scam Percentage" value={`${overview.scamPercentage}%`} accent color="text-red-400" />
          <Card title="Average Risk" value={overview.avgRiskScore} />
          <Card title="Average Confidence" value={overview.avgConfidence} />
          <Card title="Top Scam" value={overview.mostCommonScam} color="text-cyan-400" />
          <Card title="Top Language" value={overview.topLanguage} color="text-blue-400" />
          <Card title="Safe Messages" value={overview.totalSafeMessages} color="text-emerald-400" />
        </div>

        {/*  Charts Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Card 1: Scam Categories */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h2 className="text-base font-semibold mb-3 text-slate-200 border-b border-white/5 pb-2">
              Scam Categories
            </h2>
            <div className="h-60 relative w-full flex justify-center">
              <Pie data={categoryChartData} options={circularChartOptions} />
            </div>
          </div>

          {/* Card 2: Threat Levels */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h2 className="text-base font-semibold mb-3 text-slate-200 border-b border-white/5 pb-2">
              Threat Levels
            </h2>
            <div className="h-60 relative w-full flex justify-center">
              <Doughnut data={threatChartData} options={circularChartOptions} />
            </div>
          </div>

          {/* Card 3: Language Distribution */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h2 className="text-base font-semibold mb-3 text-slate-200 border-b border-white/5 pb-2">
              Language Distribution
            </h2>
            <div className="h-60 relative w-full">
              <Bar data={languageChartData} options={chartOptions} />
            </div>
          </div>

          {/* Card 4: Last 2 Days Trend */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h2 className="text-base font-semibold mb-3 text-slate-200 border-b border-white/5 pb-2">
              Last 2 Days Trend
            </h2>
            <div className="h-60 relative w-full">
              <Line data={trendChartData} options={chartOptions} />
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

// Extracted Sub-Component for Metric Tiles
function Card({ title, value, accent, color = "text-white" }) {
  return (
    <div 
      className={`bg-white/5 backdrop-blur-xl border transition-all duration-300 hover:border-white/20 p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] ${
        accent ? "border-red-500/20" : "border-white/10"
      }`}
    >
      <h3 className="text-slate-400 text-sm font-medium tracking-wide">
        {title}
      </h3>
      <p className={`text-2xl md:text-3xl font-bold mt-3 truncate ${color}`}>
        {value}
      </p>
    </div>
  );
}

export default Dashboard;