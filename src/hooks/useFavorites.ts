"use client";
import { useEffect } from "react";
import { toastSuccess } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite, loadFavorites } from "@/store/slices/favorites-slice";
import type { GitHubUser, UseFavoritesReturn } from "@/types";

export function useFavorites(): UseFavoritesReturn {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleAddFavorite = (user: GitHubUser) => {
    if (favorites.some((fav) => fav.id === user.id)) {
      return;
    }

    dispatch(addFavorite(user));
    toastSuccess(`${user.name || user.login} foi adicionado aos favoritos!`);
  };

  const handleRemoveFavorite = (userId: number) => {
    dispatch(removeFavorite(userId));
  };

  const isFavorite = (userId: number): boolean => {
    return favorites.some((fav) => fav.id === userId);
  };

  const toggleFavorite = (user: GitHubUser) => {
    if (isFavorite(user.id)) {
      const userToRemove = favorites.find((fav) => fav.id === user.id);
      handleRemoveFavorite(user.id);
      if (userToRemove) {
        toastSuccess(`${userToRemove.name || userToRemove.login} foi removido dos favoritos`);
      }
    } else {
      handleAddFavorite(user);
    }
  };

  return { 
    favorites, 
    addFavorite: handleAddFavorite, 
    removeFavorite: handleRemoveFavorite, 
    isFavorite, 
    toggleFavorite 
  };
}
