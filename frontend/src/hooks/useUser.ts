"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "./useAxiosAuth";
import { toast } from "sonner";
import { useAppStore, User } from "@/store/useAppStore";
import { useEffect } from "react";

export const useUser = () => {
  const api = useAxiosAuth();
  const queryClient = useQueryClient();
  const { setUser } = useAppStore();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get<User>("/auth/me");
      return data;
    },
    retry: false,
  });

  // Sync user query with zustand
  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
    }
  }, [userQuery.data, setUser]);

  const updateMutation = useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const { data } = await api.patch<User>("/users/", userData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      setUser(data);
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete("/users/");
    },
    onSuccess: () => {
      queryClient.clear();
      setUser(null);
      toast.success("Account deleted");
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
