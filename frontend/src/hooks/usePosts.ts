"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "./useAxiosAuth";
import { toast } from "sonner";

export interface Post {
  id: string;
  user_id: string;
  content: string;
  status: "draft" | "scheduled" | "published" | "failed";
  topic?: string;
  scheduled_at?: string;
  published_at?: string;
  linkedin_post_id?: string;
  impressions: number;
  likes: number;
  comments: number;
  reposts: number;
  created_at: string;
}

export const usePosts = () => {
  const api = useAxiosAuth();
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get<Post[]>("/posts/");
      return data;
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (topic?: string) => {
      const { data } = await api.post<Post[]>("/content/generate", { topic });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post generated!");
    },
    onError: () => {
      toast.error("Failed to generate post");
    },
  });

  const generateBulkMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post<Post[]>("/content/generate/bulk");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Posts generated!");
    },
    onError: () => {
      toast.error("Failed to generate posts");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Post> & { id: string }) => {
      const response = await api.patch<Post>(`/posts/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated");
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted");
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  return {
    posts: postsQuery.data || [],
    isLoading: postsQuery.isLoading,
    generatePost: generateMutation.mutateAsync,
    isGenerating: generateMutation.isPending,
    generateBulk: generateBulkMutation.mutateAsync,
    isGeneratingBulk: generateBulkMutation.isPending,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  };
};
