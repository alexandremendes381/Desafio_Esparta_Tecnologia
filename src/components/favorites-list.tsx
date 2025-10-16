"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import RemoveFavoriteModal from "./favorites/remove-favorite-modal";

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  avatar: string;
}

const favoriteUsers: User[] = [
  {
    id: 1,
    name: "Maria Eduarda",
    username: "meduarda",
    role: "Frontend developer",
    avatar: "./versel.svg"
  },
  {
    id: 2,
    name: "Carlos Serpa",
    username: "carlosserpa",
    role: "Frontend developer",
    avatar: "./versel.svg"
  },
  {
    id: 3,
    name: "Ana Marla",
    username: "anamarla",
    role: "Frontend developer",
    avatar: "./versel.svg"
  },
  {
    id: 4,
    name: "João Sampaio Silva",
    username: "jsampaio",
    role: "Frontend developer",
    avatar: "./versel.svg"
  },
  {
    id: 5,
    name: "Maria Valentina",
    username: "mvalentina",
    role: "Frontend developer",
    avatar: "./versel.svg"
  },
];

export default function UserList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
                    src={user.avatar}
                    alt={`Avatar de ${user.name}`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium">
                      {user.name} <span className="text-gray-400 font-normal">{user.username}</span>
                    </h3>
                    <p className="text-gray-400 text-sm">{user.role}</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(user)}
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
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
