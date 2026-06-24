"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { usePosts } from "@/hooks/usePosts";
import { DashboardCard } from "@/components/dashboard-card";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      <DashboardCard className="bg-background border border-border shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-widest text-foreground">
            What do you want to talk about?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            rows={4}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-4 rounded-xl border border-input bg-muted/50 text-foreground text-sm focus:ring-2 focus:ring-ring outline-none resize-none mb-4 placeholder:text-muted-foreground"
            placeholder="e.g. My thoughts on why remote work is failing for junior developers... (Optional: leave blank for random ideas based on your niche)"
          ></textarea>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGenerateSingle}
              disabled={isGenerating || isGeneratingBulk}
              className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50"
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
              className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-background border border-input text-foreground px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-muted/50 transition-all disabled:opacity-50"
            >
              {isGeneratingBulk ? (
                <Icon icon="solar:spinner-linear" className="animate-spin text-lg" />
              ) : (
                <Icon icon="solar:calendar-linear" className="text-lg" />
              )}
              {isGeneratingBulk ? "Generating..." : "Generate Week (4 Posts)"}
            </button>
          </div>
        </CardContent>
      </DashboardCard>

      {/* Generated Results */}
      {mostRecentDraft && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <DashboardCard className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
            <CardHeader className="p-4 border-b border-border bg-muted/50 flex flex-row justify-between items-center space-y-0">
              <CardTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Latest Draft
              </CardTitle>
              <span className="text-xs text-muted-foreground font-space">
                {mostRecentDraft.content.length} chars
              </span>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                rows={8}
                readOnly
                value={mostRecentDraft.content}
                className="w-full p-6 border-0 text-sm focus:ring-0 outline-none resize-y bg-background text-foreground leading-relaxed"
              />
            </CardContent>
            <div className="p-4 border-t border-border bg-muted/50 flex justify-end gap-3">
              <button className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-background border border-border rounded-lg hover:bg-muted/80 transition-colors">
                Discard
              </button>
              <button className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors">
                <Icon icon="solar:calendar-add-linear" /> Schedule
              </button>
            </div>
          </DashboardCard>
        </div>
      )}
    </div>
  );
}
