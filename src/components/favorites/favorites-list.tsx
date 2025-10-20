"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import FavoritesListSkeleton from "../ui/FavoritesListSkeleton";
import RemoveFavoriteModal from "./remove-favorite-modal";
import type { User } from "@/types";

export default function FavoritesList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [removingFavorite, setRemovingFavorite] = useState(false);
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      const savedFavorites = localStorage.getItem("github-users-favorites");
      if (savedFavorites) setFavoriteUsers(JSON.parse(savedFavorites));
      setLoading(false);
    };

    loadFavorites();
  }, []);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmRemove = async () => {
    if (selectedUser) {
      setRemovingFavorite(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedFavorites = favoriteUsers.filter(user => user.id !== selectedUser.id);
      setFavoriteUsers(updatedFavorites);
      localStorage.setItem("github-users-favorites", JSON.stringify(updatedFavorites));

      setRemovingFavorite(false);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8">
          Usuários Favoritados
        </h1>

        {loading ? (
          <FavoritesListSkeleton count={3} />
        ) : (
          <div className="space-y-2">
            {favoriteUsers.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                Nenhum usuário favoritado ainda
              </div>
            ) : (
              favoriteUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-full flex flex-col items-start gap-2 p-3 sm:p-4 rounded-lg border border-[#21262D] bg-[#161B22] hover:bg-[#1C2128] transition-colors"
                >
                  <div className="flex items-center justify-between w-full flex-wrap gap-3 sm:flex-nowrap">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <Image
                        src={user.avatar_url}
                        alt={`Avatar de ${user.login}`}
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[#58A6FF] font-medium text-sm sm:text-base truncate">
                          {user.name}
                          <span className="text-gray-400 font-normal">@{user.login}</span>
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm truncate">{user.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => handleOpenModal(user)}
                      className="flex-shrink-0 text-xs sm:text-sm"
                    >
                      <Image
                        src="./star.svg"
                        alt={`Ícone de favorito`}
                        width={16}
                        height={16}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                      <span className="hidden sm:inline">Remover favorito</span>
                      <span className="sm:hidden">Remover</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <RemoveFavoriteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemove}
        userName={selectedUser?.name || selectedUser?.login}
        loading={removingFavorite}
      />
    </div>
  );
}
