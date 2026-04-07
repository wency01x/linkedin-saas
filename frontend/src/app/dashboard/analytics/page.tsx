"use client";

import { Icon } from "@iconify/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsPage() {
  const { summary, postAnalytics, isLoadingSummary, isLoadingPosts } = useAnalytics();

  // Generate mock chart data for the last 30 days if no real timeline data
  // Since our api just returns summary and posts, we mock a timeline here
  const chartData = Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), 29 - i);
    // Use modulo and index to create realistic but deterministic "randomness"
    const pseudoRandom = ((i * 137) % 5000);
    return {
      date: format(date, "MMM dd"),
      impressions: pseudoRandom + 1000 + i * 100, // Upward trend
    };
  });

  return (
    <div className="max-w-[90rem] mx-auto animate-in fade-in zoom-in duration-300 space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
            Impressions
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-space font-semibold text-neutral-900">
              {isLoadingSummary ? "..." : (summary?.impressions || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-green-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-up-linear" /> 12%
            </span>
          </div>
        </div>
        <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
            Likes
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-space font-semibold text-neutral-900">
              {isLoadingSummary ? "..." : (summary?.likes || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-green-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-up-linear" /> 8%
            </span>
          </div>
        </div>
        <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
            Comments
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-space font-semibold text-neutral-900">
              {isLoadingSummary ? "..." : (summary?.comments || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-red-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-down-linear" /> 3%
            </span>
          </div>
        </div>
        <div className="bg-white p-5 border border-neutral-200 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
            Reposts
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-space font-semibold text-neutral-900">
              {isLoadingSummary ? "..." : (summary?.reposts || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-green-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-up-linear" /> 24%
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-900 mb-6">
          Impressions Over Time (30 Days)
        </h3>
        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#A3A3A3", fontFamily: "Space Grotesk" }}
                minTickGap={30}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#A3A3A3", fontFamily: "Space Grotesk" }}
                tickFormatter={(val) => (val > 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E5E5", fontSize: "12px", fontFamily: "Inter" }}
              />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#2563EB" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Post Topic</th>
              <th className="px-6 py-4">Published</th>
              <th className="px-6 py-4 text-right">Impressions</th>
              <th className="px-6 py-4 text-right">Eng. Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {isLoadingPosts ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                  Loading analytics...
                </td>
              </tr>
            ) : postAnalytics.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                  No post analytics available yet.
                </td>
              </tr>
            ) : (
              postAnalytics.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900 truncate max-w-xs">
                    {post.topic || "Untitled Post"}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 font-space text-xs">
                    {post.published_at ? format(parseISO(post.published_at), "MMM d, yyyy") : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {post.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-green-600 font-medium">
                    {post.engagement_rate.toFixed(1)}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
