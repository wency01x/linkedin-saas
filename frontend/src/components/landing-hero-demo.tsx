"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export function LandingHeroDemo() {
  const [phase, setPhase] = useState(0);
  const [typingText, setTypingText] = useState("");
  const fullText = "Write a thought leadership post about AI in the workplace";

  useEffect(() => {
    // Timings:
    // Phase 0 -> Phase 1: 3.5s
    // Phase 1 -> Phase 2: 2.5s
    // Phase 2 -> Phase 3: 4s
    // Phase 3 -> Phase 0: 3s
    
    let timeout: NodeJS.Timeout;
    
    if (phase === 0) {
      setTypingText("");
      
      // Simulate typing
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= fullText.length) {
          setTypingText(fullText.substring(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 40);

      timeout = setTimeout(() => {
        clearInterval(typeInterval);
        setPhase(1);
      }, 3500);
      
      return () => {
        clearInterval(typeInterval);
        clearTimeout(timeout);
      };
    } else if (phase === 1) {
      timeout = setTimeout(() => setPhase(2), 2500);
    } else if (phase === 2) {
      timeout = setTimeout(() => setPhase(3), 4000);
    } else if (phase === 3) {
      timeout = setTimeout(() => setPhase(0), 3000);
    }
    
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full w-full bg-neutral-900 border border-neutral-800 flex flex-col p-6">
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
        <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
        <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
      </div>
      
      <div className="flex-1 bg-black rounded-lg p-5 font-space text-sm text-white relative overflow-hidden flex items-center justify-center border border-neutral-800/50">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm flex flex-col gap-4"
            >
              <div className="text-neutral-400 text-[0.65rem] uppercase tracking-widest font-semibold ml-1">New Generation</div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 font-space text-xs text-white h-28 relative flex items-start leading-relaxed">
                <span className="after:content-['|'] after:animate-pulse">
                  {typingText}
                </span>
              </div>
              <div className="bg-white text-black font-semibold uppercase tracking-widest text-[0.65rem] py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg">
                <Icon icon="solar:magic-stick-3-linear" className="text-base" /> Generate
              </div>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-full flex flex-col justify-start mt-4"
            >
              <div className="mb-6 flex items-center gap-3 text-white">
                <Icon icon="solar:magic-stick-3-linear" className="animate-spin text-neutral-400" />
                <span>NARRAT.AI is crafting content...</span>
              </div>
              <div className="space-y-4 opacity-80">
                <div className="h-4 bg-neutral-900 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-neutral-900 rounded w-full animate-pulse delay-75"></div>
                <div className="h-4 bg-neutral-900 rounded w-5/6 animate-pulse delay-150"></div>
                <div className="h-4 bg-neutral-900 rounded w-1/2 animate-pulse delay-200"></div>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-lg max-w-md mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                  <Icon icon="solar:user-linear" className="text-neutral-400 text-xl" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Alex Chen</div>
                  <div className="text-[0.65rem] text-neutral-400">Founder & CEO</div>
                </div>
              </div>
              <div className="text-white/80 text-xs leading-relaxed mb-4 font-sans">
                Leadership isn&apos;t about having all the answers. It&apos;s about empowering your team with the right tools.<br/><br/>
                AI isn&apos;t replacing leaders, it&apos;s upgrading them. Those who adapt will thrive.<br/><br/>
                <span className="text-neutral-400">#Leadership #AI #FutureOfWork</span>
              </div>
              <div className="flex gap-6 text-neutral-500 border-t border-neutral-800 pt-3 mt-4">
                <div className="flex items-center gap-2 text-xs hover:text-white transition-colors cursor-pointer"><Icon icon="solar:like-linear" /> 248</div>
                <div className="flex items-center gap-2 text-xs hover:text-white transition-colors cursor-pointer"><Icon icon="solar:chat-line-linear" /> 42</div>
              </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center text-center gap-4 h-full"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2">
                <Icon icon="solar:calendar-linear" className="text-3xl" />
              </div>
              <h3 className="text-lg font-oswald tracking-wide text-white uppercase">Post Scheduled!</h3>
              <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-xs text-neutral-400">
                Tomorrow at 9:00 AM
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
