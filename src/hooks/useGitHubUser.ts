"use client";

import { useState } from "react";
import { fetchGet } from "@/services/api";
import { toast } from "react-toastify";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface UseGitHubUserReturn {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
  searchUser: (username: string) => Promise<void>;
  clearUser: () => void;
}

export function useGitHubUser(): UseGitHubUserReturn {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (username: string) => {
    if (!username.trim()) {
      const errorMessage = "Nome de usuário não pode estar vazio";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const apiUrl = `https://api.github.com/users/${username.trim()}`;
      const userData = await fetchGet(apiUrl);
      setUser(userData);
      toast.success(
        `Usuário ${userData.name || userData.login} encontrado com sucesso!`
      );
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) {
        if (err.message.includes("404")) {
          errorMessage = "Usuário não encontrado";
        } else {
          errorMessage = "Erro ao buscar usuário: " + err.message;
        }
      } else {
        errorMessage = "Erro desconhecido ao buscar usuário";
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
    setError(null);
  };

  return {
    user,
    loading,
    error,
    searchUser,
    clearUser,
  };
}
