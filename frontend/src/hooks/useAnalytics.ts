"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "./useAxiosAuth";
import { toast } from "sonner";

export interface AnalyticsSummary {
  total_posts: number;
  published_posts: number;
  scheduled_posts: number;
  draft_posts: number;
  impressions: number;
  likes: number;
  comments: number;
  reposts: number;
}

export interface PostAnalytics {
  id: string;
  topic: string;
  published_at: string;
  impressions: number;
  engagement_rate: number;
}

export const useAnalytics = () => {
  const api = useAxiosAuth();

  const summaryQuery = useQuery({
    queryKey: ["analytics", "summary"],
    queryFn: async () => {
      const { data } = await api.get<AnalyticsSummary>("/analytics/summary");
      return data;
    },
  });

  const postsQuery = useQuery({
    queryKey: ["analytics", "posts"],
    queryFn: async () => {
      const { data } = await api.get<PostAnalytics[]>("/analytics/posts");
      return data;
    },
  });

  return {
    summary: summaryQuery.data,
    isLoadingSummary: summaryQuery.isLoading,
    postAnalytics: postsQuery.data || [],
    isLoadingPosts: postsQuery.isLoading,
  };
};

export const useLinkedIn = () => {
  const api = useAxiosAuth();
  const queryClient = useQueryClient();

  const statusQuery = useQuery({
    queryKey: ["linkedin", "status"],
    queryFn: async () => {
      const { data } = await api.get("/linkedin/status");
      return data;
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: async () => {
      await api.delete("/linkedin/disconnect");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin", "status"] });
      toast.success("LinkedIn disconnected");
    },
    onError: () => {
      toast.error("Failed to disconnect LinkedIn");
    },
  });

  return {
    status: statusQuery.data,
    isLoading: statusQuery.isLoading,
    disconnect: disconnectMutation.mutate,
    isDisconnecting: disconnectMutation.isPending,
  };
};
