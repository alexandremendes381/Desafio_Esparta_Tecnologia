"use client";
import Button from "@/components/ui/Button";
import SearchInput from "@/components/ui/Input";
import { useGitHubUser } from "@/hooks/useGitHubUser";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const { user, loading, error, searchUser, clearUser } = useGitHubUser();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleSearch = async () => {
    if (value.trim()) {
      await searchUser(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!e.target.value.trim()) {
      clearUser();
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <SearchInput
            placeholder="Buscar usuários..."
            value={value}
            handleSearch={handleSearch}
            handleInputChange={handleInputChange}
          />
        </div>

        {loading && (
          <div className="flex justify-center">
            <div className="text-gray-400">Buscando usuário...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {user && !loading && (
          <div className="flex justify-center">
            <div 
              className="flex flex-col items-start gap-2 p-4 rounded-lg border border-[#21262D] bg-[#0D1117]"
              style={{ width: '976.656px' }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <Image
                    src={user?.avatar_url}
                    alt={`Avatar de ${user.login}`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium">
                      {user.name || user.login} <span className="text-gray-400 font-normal">@{user.login}</span>
                    </h3>
                    <p className="text-gray-400 text-sm">Frontend developer</p>
                  </div>
                </div>
                  <Button
                  variant="secondary"
                  onClick={() => user && toggleFavorite(user)}
                >
                  <Image
                    src={user && isFavorite(user.id) ? "./star.svg" : "./star-black.svg"}
                    alt={`Ícone de favorito`}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>{user && isFavorite(user.id) ? "Favoritado" : "Favoritar"}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
