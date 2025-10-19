"use client";
import { useState } from 'react';
import { toast } from 'react-toastify';

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

interface UseFavoritesReturn {
  favorites: GitHubUser[];
  addFavorite: (user: GitHubUser) => void;
  removeFavorite: (userId: number) => void;
  isFavorite: (userId: number) => boolean;
  toggleFavorite: (user: GitHubUser) => void;
}

const FAVORITES_STORAGE_KEY = 'github-users-favorites';

const loadFavoritesFromStorage = (): GitHubUser[] => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      return JSON.parse(storedFavorites);
    }
  } catch {
    toast.error('Erro ao carregar favoritos salvos');
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  }
  return [];
};

const saveFavoritesToStorage = (favorites: GitHubUser[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    toast.error('Erro ao salvar favorito');
  }
};

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<GitHubUser[]>(() => {
    if (typeof window !== 'undefined') {
      return loadFavoritesFromStorage();
    }
    return [];
  });

  const addFavorite = (user: GitHubUser) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === user.id)) {
        toast.info('Usuário já está nos favoritos');
        return prev;
      }
      const newFavorites = [...prev, user];
      saveFavoritesToStorage(newFavorites);
      toast.success(`${user.name || user.login} foi adicionado aos favoritos!`);
      return newFavorites;
    });
  };

  const removeFavorite = (userId: number) => {
    setFavorites(prev => {
      const userToRemove = prev.find(fav => fav.id === userId);
      const newFavorites = prev.filter(fav => fav.id !== userId);
      saveFavoritesToStorage(newFavorites);
      
      if (userToRemove) {
        toast.success(`${userToRemove.name || userToRemove.login} foi removido dos favoritos`);
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (userId: number): boolean => {
    return favorites.some(fav => fav.id === userId);
  };

  const toggleFavorite = (user: GitHubUser) => {
    if (isFavorite(user.id)) {
      removeFavorite(user.id);
    } else {
      addFavorite(user);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
}