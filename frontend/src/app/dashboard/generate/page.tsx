"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@clerk/nextjs";
import { ScheduleDialog } from "@/components/schedule-dialog";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const { generatePost, isGenerating, generateBulk, isGeneratingBulk, posts, updatePost, deletePost } = usePosts();
  const { user } = useUser();
  
  // Just show the most recently generated draft (for mock purpose)
  const drafts = posts.filter(p => p.status === "draft").sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  


  const handleGenerateSingle = async () => {
    await generatePost(topic || undefined);
  };

  const handleGenerateBulk = async () => {
    await generateBulk();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f3f2ef] dark:bg-[#000000] p-4 md:p-8 -m-4 md:-m-6 font-sans">
      <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300 space-y-6">
        
        {/* LinkedIn-style Post Creator */}
        <div className="bg-[#ffffff] dark:bg-[#1d2226] border border-[#dce0e1] dark:border-[#38434f] rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 flex gap-4">
            <div className="flex-shrink-0">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="w-14 h-14 rounded-full object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                  <Icon icon="solar:user-bold" className="text-neutral-500 text-2xl" />
                </div>
              )}
            </div>
            
            <div className="w-full pt-1">
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border-none bg-transparent text-[#191919] dark:text-[#ffffff] text-[17px] !font-sans focus:ring-0 outline-none resize-none placeholder:text-[#666666] dark:placeholder:text-[#b0b8c1]"
                placeholder="What do you want to talk about? (Leave blank for a random niche idea...)"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between px-6 py-3 border-t border-[#dce0e1] dark:border-[#38434f]">
            <div className="flex items-center gap-2">
               <button
                onClick={handleGenerateBulk}
                disabled={isGenerating || isGeneratingBulk}
                className="flex items-center gap-2 bg-transparent text-[#666666] dark:text-[#b0b8c1] hover:bg-[#ebebeb] dark:hover:bg-[#38434f] px-4 py-2 rounded-md text-[15px] font-semibold transition-all disabled:opacity-50"
              >
                {isGeneratingBulk ? (
                  <Icon icon="solar:spinner-linear" className="animate-spin text-xl" />
                ) : (
                  <Icon icon="solar:calendar-linear" className="text-xl text-[#0a66c2] dark:text-[#70b5f9]" />
                )}
                {isGeneratingBulk ? "Generating..." : "Generate Week"}
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateSingle}
                disabled={isGenerating || isGeneratingBulk}
                className="flex items-center gap-2 bg-[#0a66c2] dark:bg-[#70b5f9] text-white dark:text-[#1d2226] px-6 py-2 rounded-full text-[15px] font-semibold hover:bg-[#004182] dark:hover:bg-[#a6d5fa] transition-all disabled:opacity-50 disabled:bg-[#ebebeb] dark:disabled:bg-[#38434f] disabled:text-[#0000004d] dark:disabled:text-[#ffffff4d]"
              >
                {isGenerating ? (
                  <Icon icon="solar:spinner-linear" className="animate-spin text-lg" />
                ) : (
                  <Icon icon="solar:magic-stick-3-linear" className="text-lg" />
                )}{" "}
                {isGenerating ? "Generating..." : "Post"}
              </button>
            </div>
          </div>
        </div>

        {/* Generated Results (LinkedIn-style Feed Cards) */}
        <div className="space-y-6 pb-12">
          {drafts.map((draft, index) => (
            <div 
              key={draft.id} 
              className="bg-[#ffffff] dark:bg-[#1d2226] border border-[#dce0e1] dark:border-[#38434f] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="px-6 py-4 border-b border-[#dce0e1] dark:border-[#38434f] flex justify-between items-center">
                <div className="flex items-center gap-2 text-[15px] text-[#191919] dark:text-[#ffffff] font-semibold">
                  <Icon icon="solar:document-text-linear" className="text-2xl text-[#0a66c2] dark:text-[#70b5f9]" />
                  {draft.topic ? (
                    <span className="capitalize">{draft.topic.replace(/biggest challenge in |lessons learned in |future of |advice for /g, '')} - {draft.topic.split(' ')[0]}</span>
                  ) : (
                    <span>Draft {drafts.length > 1 ? `#${index + 1}` : ""}</span>
                  )}
                </div>
                <span className="text-sm text-[#666666] dark:text-[#b0b8c1]">
                  {draft.content.length} characters
                </span>
              </div>
              <div className="p-0">
                <textarea
                  rows={12}
                  defaultValue={draft.content}
                  onBlur={(e) => {
                    if (e.target.value !== draft.content) {
                      updatePost({ id: draft.id, content: e.target.value });
                    }
                  }}
                  className="w-full p-6 border-0 text-[16px] leading-relaxed focus:ring-0 outline-none resize-y bg-transparent text-[#191919] dark:text-[#ffffff] !font-sans"
                />
              </div>
              <div className="px-6 py-4 border-t border-[#dce0e1] dark:border-[#38434f] flex justify-end gap-4">
                <button 
                  onClick={() => {
                    if (confirm("Are you sure you want to discard this draft?")) {
                      deletePost(draft.id);
                    }
                  }}
                  className="px-5 py-2 text-[15px] font-semibold text-[#666666] dark:text-[#b0b8c1] hover:bg-[#ebebeb] dark:hover:bg-[#38434f] rounded-full transition-colors"
                >
                  Discard
                </button>
                <ScheduleDialog 
                  postId={draft.id}
                  trigger={
                    <button className="px-5 py-2 text-[15px] font-semibold text-white dark:text-[#1d2226] bg-[#0a66c2] dark:bg-[#70b5f9] rounded-full hover:bg-[#004182] dark:hover:bg-[#a6d5fa] flex items-center gap-2 transition-colors">
                      <Icon icon="solar:calendar-add-linear" className="text-lg" /> Schedule
                    </button>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
