"use client";

import { toast } from "react-toastify";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser, fetchGitHubUser } from "@/store/slices/github-user-slice";

export function useGitHubUser() {
  const dispatch = useAppDispatch();

  const { user, loading, error } = useAppSelector((state) => state.githubUser);

  const searchUser = useCallback(
    async (username: string) => {
      try {
        const result = await dispatch(fetchGitHubUser(username)).unwrap();
        toast.success(
          `Usuário ${result.name || result.login} encontrado com sucesso!`
        );
      } catch (err) {
        toast.error(err as string);
      }
    },
    [dispatch]
  );

  const handleClearUser = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    searchUser,
    clearUser: handleClearUser,
  };
}