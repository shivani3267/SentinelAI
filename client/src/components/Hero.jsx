import React from "react";
import {
  ArrowRight,
  ShieldAlert,
  TriangleAlert,
  MessageSquareWarning,
} from "lucide-react";

const Hero = () => {
  return (
    <>
      {/* Background Glow Effects */}
      <div className="absolute top-32 left-10 w-80 h-80 bg-blue-500/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 min-h-[80vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Side */}
          <div>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
              AI Powered Scam Detection
            </span>

            <h1 className="mt-6 text-4xl md:text-7xl font-bold leading-tight">
              Detect
              <span className="text-blue-500"> Scams </span>
              Before They
              <br />
              Become Threats
            </h1>

            <p className="mt-8 text-slate-400 text-lg leading-relaxed max-w-xl">
              SentinelAI intelligently analyzes suspicious messages,
              emails, chats, and online conversations to identify
              scams, phishing attempts, fraud indicators, and
              harmful communication patterns before they cause harm.
            </p>

           
          </div>

          {/* Right Side Glass Card */}
          <div className="flex justify-center">
            <div
              className="
                w-full
                max-w-md
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-[0_8px_32px_rgba(0,0,0,0.35)]
              "
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold">
                  SentinelAI Analysis
                </h3>

                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                  High Risk
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-red-500/20">
                    <ShieldAlert className="text-red-400" />
                  </div>

                  <div>
                    <h4 className="font-medium">
                      Fraud Detected
                    </h4>

                    <p className="text-sm text-slate-400">
                      Urgent payment request identified
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-yellow-500/20">
                    <TriangleAlert className="text-yellow-400" />
                  </div>

                  <div>
                    <h4 className="font-medium">
                      Manipulation Signals
                    </h4>

                    <p className="text-sm text-slate-400">
                      Emotional pressure tactics detected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <MessageSquareWarning className="text-blue-400" />
                  </div>

                  <div>
                    <h4 className="font-medium">
                      Suspicious Messages
                    </h4>

                    <p className="text-sm text-slate-400">
                      Potential phishing indicators found
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-slate-400 text-sm">
                  Threat Confidence Score
                </p>

                <h2 className="mt-2 text-4xl font-bold text-red-400">
                  92%
                </h2>
              </div>

              <button
                className="
                  w-full
                  mt-8
                  py-4
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  font-semibold
                "
              >
                ScamAnalyser
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;