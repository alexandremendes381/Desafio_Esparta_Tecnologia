"use client";

import { toastSuccess, toastError } from "@/lib/utils";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser, fetchGitHubUser } from "@/store/slices/github-user-slice";
import type { UseGitHubUserReturn } from "@/types";

export function useGitHubUser(): UseGitHubUserReturn {
  const dispatch = useAppDispatch();

  const { user, loading, error, lastFetched } = useAppSelector((state) => state.githubUser);

  const searchUser = useCallback(
    async (username: string) => {
      try {
        const result = await dispatch(fetchGitHubUser(username)).unwrap();
        toastSuccess(
          `Usuário ${result.name || result.login} encontrado com sucesso!`
        );
      } catch (err) {
        toastError(err as string);
      }
    },
    [dispatch]
  );

  const searchUserIfNeeded = useCallback(
    async (username: string) => {
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
      const now = Date.now();
      
      // Só buscar se não tiver usuário ou se o cache expirou ou se for usuário diferente
      if (
        !user || 
        user.login.toLowerCase() !== username.trim().toLowerCase() ||
        !lastFetched ||
        (now - lastFetched) >= CACHE_DURATION
      ) {
        await searchUser(username);
      }
    },
    [user, lastFetched, searchUser]
  );

  const handleClearUser = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    lastFetched,
    searchUser,
    searchUserIfNeeded,
    clearUser: handleClearUser,
  };
}