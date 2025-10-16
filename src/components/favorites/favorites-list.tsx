"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
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

  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
console.log(favoriteUsers);

useEffect(() => {
    const savedFavorites = localStorage.getItem("github-users-favorites");
    if (savedFavorites) setFavoriteUsers(JSON.parse(savedFavorites));
  }, []);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmRemove = () => {
    if (selectedUser) {
      console.log(`Removendo usuário ${selectedUser.id} dos favoritos`);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-8">
          Usuários Favoritados
        </h1>
        <div className="space-y-2">
          {favoriteUsers.map((user) => (
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
          ))}
        </div>
      </div>
      <RemoveFavoriteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemove}
        userName={selectedUser?.name}
      />
    </div>
  );
}
