"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";
import { usePosts } from "@/hooks/usePosts";
import { format, parseISO } from "date-fns";

import { Dashboard } from "@/components/dashboard";
import { DashboardCard } from "@/components/dashboard-card";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const { summary, isLoadingSummary } = useAnalytics();
  const { posts, isLoading, deletePost } = usePosts();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-transparent dark:border-blue-800/50">
            Scheduled
          </span>
        );
      case "published":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-transparent dark:border-green-800/50">
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-transparent dark:border-neutral-700">
            Draft
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-transparent dark:border-red-800/50">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[90rem] mx-auto animate-in fade-in zoom-in duration-300 space-y-8">
      {/* Dashboard-2 Overview */}
      <Dashboard />

      {/* Queue Section */}
      <DashboardCard className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between space-y-0 bg-muted/30">
          <CardTitle className="text-lg font-semibold font-oswald tracking-tight text-foreground">
            Post Queue
          </CardTitle>
          <Link
            href="/dashboard/generate"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            <Icon icon="solar:magic-stick-3-linear" /> Generate Posts
          </Link>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No posts found. Generate some content to get started.
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-5 hover:bg-muted/50 transition-colors flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="shrink-0 w-24">{getStatusBadge(post.status)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1 truncate">
                    {post.topic || "Draft Post"}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {post.content.substring(0, 80)}...
                  </p>
                </div>
                <div className="shrink-0 text-xs text-muted-foreground font-space w-32 md:text-right">
                  {post.scheduled_at
                    ? format(parseISO(post.scheduled_at), "MMM d, h:mm a")
                    : post.published_at
                    ? format(parseISO(post.published_at), "MMM d, yyyy")
                    : "Unscheduled"}
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/dashboard/generate?edit=${post.id}`}
                    className="p-2 flex text-muted-foreground hover:text-foreground bg-background border border-border rounded-lg shadow-sm transition-colors"
                  >
                    <Icon icon="solar:pen-linear" />
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this post?")) {
                        deletePost(post.id);
                      }
                    }}
                    className="p-2 flex text-muted-foreground hover:text-red-600 bg-background border border-border rounded-lg shadow-sm transition-colors"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" />
                  </button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </DashboardCard>
    </div>
  );
}
