"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { usePosts } from "@/hooks/usePosts";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const { generatePost, isGenerating, generateBulk, isGeneratingBulk, posts } = usePosts();
  
  // Just show the most recently generated draft (for mock purpose)
  const drafts = posts.filter(p => p.status === "draft").sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  
  const mostRecentDraft = drafts.length > 0 ? drafts[0] : null;

  const handleGenerateSingle = async () => {
    await generatePost(topic || undefined);
  };

  const handleGenerateBulk = async () => {
    await generateBulk();
  };

  return (
    <div className="max-w-[90rem] mx-auto animate-in fade-in zoom-in duration-300 space-y-6">
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
        <label className="block text-sm font-semibold text-neutral-900 mb-2">
          What do you want to talk about?
        </label>
        <textarea
          rows={4}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-neutral-900 outline-none resize-none mb-4 placeholder:text-neutral-400"
          placeholder="e.g. My thoughts on why remote work is failing for junior developers... (Optional: leave blank for random ideas based on your niche)"
        ></textarea>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleGenerateSingle}
            disabled={isGenerating || isGeneratingBulk}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <Icon icon="solar:spinner-linear" className="animate-spin text-lg" />
            ) : (
              <Icon icon="solar:magic-stick-3-linear" className="text-lg" />
            )}{" "}
            {isGenerating ? "Generating..." : "Generate Single Post"}
          </button>
          <button
            onClick={handleGenerateBulk}
            disabled={isGenerating || isGeneratingBulk}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-white border border-neutral-200 text-neutral-900 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-neutral-50 transition-all disabled:opacity-50"
          >
            {isGeneratingBulk ? (
              <Icon icon="solar:spinner-linear" className="animate-spin text-lg" />
            ) : (
              <Icon icon="solar:calendar-linear" className="text-lg" />
            )}
            {isGeneratingBulk ? "Generating..." : "Generate Week (4 Posts)"}
          </button>
        </div>
      </div>

      {/* Generated Results */}
      {mostRecentDraft && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest pt-4">
            Generated Content
          </h3>
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Latest Draft
              </span>
              <span className="text-xs text-neutral-400 font-space">
                {mostRecentDraft.content.length} chars
              </span>
            </div>
            <div className="p-0">
              <textarea
                rows={8}
                readOnly
                value={mostRecentDraft.content}
                className="w-full p-6 border-0 text-sm focus:ring-0 outline-none resize-y text-neutral-800 leading-relaxed"
              />
            </div>
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end gap-3">
              <button className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                Discard
              </button>
              <button className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
                <Icon icon="solar:calendar-add-linear" /> Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
