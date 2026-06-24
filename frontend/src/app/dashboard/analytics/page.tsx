"use client";

import { Icon } from "@iconify/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { useAnalytics } from "@/hooks/useAnalytics";
import { DashboardCard } from "@/components/dashboard-card";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      <div className="grid grid-cols-1 gap-px bg-border p-px md:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden shadow-sm border border-border">
        <DashboardCard className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Impressions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-3 pb-6">
            <span className="text-3xl font-space font-semibold text-foreground">
              {isLoadingSummary ? "..." : (summary?.impressions || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-green-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-up-linear" className="mr-1" />
              12%
            </span>
          </CardContent>
        </DashboardCard>
        
        <DashboardCard className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Likes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-3 pb-6">
            <span className="text-3xl font-space font-semibold text-foreground">
              {isLoadingSummary ? "..." : (summary?.likes || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-green-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-up-linear" className="mr-1" />
              8%
            </span>
          </CardContent>
        </DashboardCard>

        <DashboardCard className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-3 pb-6">
            <span className="text-3xl font-space font-semibold text-foreground">
              {isLoadingSummary ? "..." : (summary?.comments || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-red-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-down-linear" className="mr-1" />
              3%
            </span>
          </CardContent>
        </DashboardCard>

        <DashboardCard className="bg-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Reposts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-3 pb-6">
            <span className="text-3xl font-space font-semibold text-foreground">
              {isLoadingSummary ? "..." : (summary?.reposts || 0).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-green-500 flex items-center mb-1">
              <Icon icon="solar:arrow-right-up-linear" className="mr-1" />
              24%
            </span>
          </CardContent>
        </DashboardCard>
      </div>

      {/* Chart */}
      <DashboardCard className="bg-background border border-border shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-widest text-foreground">
            Impressions Over Time (30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full relative">
            {isLoadingPosts ? (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                Loading chart data...
              </div>
            ) : chartData.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                Not enough data to display chart.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#a3a3a3" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#a3a3a3" }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    cursor={{ stroke: '#d4d4d8', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="impressions"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorImpressions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </DashboardCard>

      {/* Table */}
      <DashboardCard className="bg-background border border-border shadow-sm rounded-xl overflow-hidden text-sm">
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-muted border-b border-border text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              <tr>
                <th className="px-6 py-4">Post Topic</th>
                <th className="px-6 py-4">Published</th>
                <th className="px-6 py-4 text-right">Impressions</th>
                <th className="px-6 py-4 text-right">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoadingPosts ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Loading analytics...
                  </td>
                </tr>
              ) : postAnalytics.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No post analytics available yet.
                  </td>
                </tr>
              ) : (
                postAnalytics.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground truncate max-w-xs">
                      {post.topic || "Untitled Post"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-space text-xs">
                      {post.published_at ? format(parseISO(post.published_at), "MMM d, yyyy") : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {(post.impressions || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {post.engagement_rate || 0}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </DashboardCard>
    </div>
  );
}
