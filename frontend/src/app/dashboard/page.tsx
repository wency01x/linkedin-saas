"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";
import { usePosts } from "@/hooks/usePosts";
import { format, parseISO } from "date-fns";

import { Dashboard } from "@/components/dashboard";

export default function DashboardPage() {
  const { summary, isLoadingSummary } = useAnalytics();
  const { posts, isLoading, deletePost } = usePosts();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-blue-100 text-blue-700">
            Scheduled
          </span>
        );
      case "published":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-green-100 text-green-700">
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-neutral-100 text-neutral-600">
            Draft
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-widest bg-red-100 text-red-700">
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
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-white">
          <h2 className="text-lg font-semibold font-oswald tracking-tight">
            Post Queue
          </h2>
          <Link
            href="/dashboard/generate"
            className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            <Icon icon="solar:magic-stick-3-linear" /> Generate Posts
          </Link>
        </div>
        <div className="divide-y divide-neutral-100">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-neutral-500">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-sm text-neutral-500">
              No posts found. Generate some content to get started.
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-5 hover:bg-neutral-50 transition-colors flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="shrink-0 w-24">{getStatusBadge(post.status)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-1 truncate">
                    {post.topic || "Draft Post"}
                  </h4>
                  <p className="text-xs text-neutral-500 truncate">
                    {post.content.substring(0, 80)}...
                  </p>
                </div>
                <div className="shrink-0 text-xs text-neutral-400 font-space w-32 md:text-right">
                  {post.scheduled_at
                    ? format(parseISO(post.scheduled_at), "MMM d, h:mm a")
                    : post.published_at
                    ? format(parseISO(post.published_at), "MMM d, yyyy")
                    : "Unscheduled"}
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/dashboard/generate?edit=${post.id}`}
                    className="p-2 flex text-neutral-400 hover:text-neutral-900 bg-white border border-neutral-200 rounded-lg shadow-sm transition-colors"
                  >
                    <Icon icon="solar:pen-linear" />
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this post?")) {
                        deletePost(post.id);
                      }
                    }}
                    className="p-2 flex text-neutral-400 hover:text-red-600 bg-white border border-neutral-200 rounded-lg shadow-sm transition-colors"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
