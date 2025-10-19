"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import FavoritesListSkeleton from "../ui/FavoritesListSkeleton";
import RemoveFavoriteModal from "./remove-favorite-modal";


interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  avatar_url: string;
  login: string;
  type: string;
}

export default function UserList() {
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
    <div className="min-h-screen bg-[#0D1117] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-8">
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
              className="flex flex-col items-start gap-2 p-4 rounded-lg border border-[#21262D] bg-[#161B22] hover:bg-[#1C2128] transition-colors"
              style={{ width: '976.656px' }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <Image
                    src={user.avatar_url}
                    alt={`Avatar de ${user.login}`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium">
                      {user.name} <span className="text-gray-400 font-normal">{user.login}</span>
                    </h3>
                    <p className="text-gray-400 text-sm">{user.type}</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(user)}
                >
                  <Image
                    src="./star.svg"
                    alt={`Ícone de favorito`}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>Remover favorito</span>
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
        userName={selectedUser?.name}
        loading={removingFavorite}
      />
    </div>
  );
}
