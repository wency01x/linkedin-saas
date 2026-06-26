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
      
      <div className="flex-1 bg-[#f3f2ef] rounded-lg p-5 font-space text-sm text-[#03184f] relative overflow-hidden flex items-center justify-center border border-neutral-800/50">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm flex flex-col gap-4 bg-white p-5 rounded-xl shadow-sm border border-neutral-200"
            >
              <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-[#03184f]">Alex Chen</div>
                  <div className="text-xs text-neutral-500">Post to Anyone</div>
                </div>
              </div>
              <div className="font-sans text-sm text-[#03184f] h-20 relative flex items-start leading-relaxed mt-2">
                <span className="after:content-['|'] after:animate-pulse">
                  {typingText || "What do you want to talk about?"}
                </span>
              </div>
              <div className="flex justify-end pt-2">
                <div className="bg-[#0293ce] text-white font-semibold text-xs py-2 px-5 rounded-full flex items-center justify-center gap-2 shadow-sm">
                  <Icon icon="solar:magic-stick-3-linear" className="text-sm" /> Generate with AI
                </div>
              </div>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-full flex flex-col justify-start mt-4 max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
            >
              <div className="mb-6 flex items-center gap-3 text-[#03184f] font-semibold">
                <Icon icon="solar:magic-stick-3-linear" className="animate-spin text-[#0293ce] text-xl" />
                <span>NARRAT.AI is crafting content...</span>
              </div>
              <div className="space-y-4 opacity-80">
                <div className="h-3 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-neutral-200 rounded w-full animate-pulse delay-75"></div>
                <div className="h-3 bg-neutral-200 rounded w-5/6 animate-pulse delay-150"></div>
                <div className="h-3 bg-neutral-200 rounded w-1/2 animate-pulse delay-200"></div>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-white border border-neutral-200 rounded-xl pt-4 pb-2 px-0 shadow-sm max-w-md mx-auto"
            >
              <div className="flex items-start gap-3 mb-3 px-4">
                <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden shrink-0 mt-0.5">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-black text-sm hover:text-[#0a66c2] hover:underline cursor-pointer leading-tight">Alex Chen</div>
                    <div className="text-neutral-500 hover:bg-neutral-100 p-1 rounded-full cursor-pointer transition-colors">
                      <Icon icon="bi:three-dots" className="text-lg" />
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500 leading-tight">Founder & CEO</div>
                  <div className="text-[0.7rem] text-neutral-500 flex items-center gap-1 mt-0.5 leading-tight">Just now • <Icon icon="fa6-solid:earth-americas" className="text-[0.6rem]" /></div>
                </div>
              </div>
              
              <div className="text-black text-sm leading-[1.4] mb-3 px-4">
                Leadership isn&apos;t about having all the answers. It&apos;s about empowering your team with the right tools.<br/><br/>
                AI isn&apos;t replacing leaders, it&apos;s upgrading them. Those who adapt will thrive.<br/><br/>
                <span className="text-[#0a66c2] hover:underline cursor-pointer font-semibold">#Leadership #AI #FutureOfWork</span>
              </div>
              
              <div className="flex items-center gap-1 text-neutral-500 text-xs px-4 mb-2">
                <Icon icon="fluent-emoji-flat:thumbs-up" className="text-[0.8rem]" /> 
                <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">248</span>
                <span className="mx-1">•</span>
                <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">42 comments</span>
              </div>
              
              <div className="flex items-center justify-between text-neutral-500 border-t border-neutral-200 pt-1 px-2">
                <div className="flex items-center justify-center gap-2 text-[0.8rem] font-semibold hover:bg-neutral-100 py-3 px-2 rounded-md transition-colors cursor-pointer flex-1"><Icon icon="ph:thumbs-up-bold" className="text-xl" /> Like</div>
                <div className="flex items-center justify-center gap-2 text-[0.8rem] font-semibold hover:bg-neutral-100 py-3 px-2 rounded-md transition-colors cursor-pointer flex-1"><Icon icon="ph:chat-teardrop-text-bold" className="text-xl" /> Comment</div>
                <div className="flex items-center justify-center gap-2 text-[0.8rem] font-semibold hover:bg-neutral-100 py-3 px-2 rounded-md transition-colors cursor-pointer flex-1"><Icon icon="ph:arrows-left-right-bold" className="text-xl" /> Repost</div>
                <div className="flex items-center justify-center gap-2 text-[0.8rem] font-semibold hover:bg-neutral-100 py-3 px-2 rounded-md transition-colors cursor-pointer flex-1"><Icon icon="ph:paper-plane-tilt-bold" className="text-xl" /> Send</div>
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
              <div className="w-16 h-16 rounded-full bg-[#67bd4a]/10 flex items-center justify-center text-[#67bd4a] mb-2">
                <Icon icon="solar:calendar-bold" className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#03184f]">Post Scheduled!</h3>
              <div className="bg-white border border-neutral-200 shadow-sm px-5 py-2 rounded-full text-sm text-neutral-600 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#67bd4a]"></div> Tomorrow at 9:00 AM
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
