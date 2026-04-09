"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import api from "@/lib/api";

export const useAxiosAuth = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          const token = await getToken();
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
    };
  }, [getToken]);

  return api;
};
