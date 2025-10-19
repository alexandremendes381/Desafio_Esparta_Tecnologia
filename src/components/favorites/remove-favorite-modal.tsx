"use client";
import React from "react";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";

interface RemoveFavoriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName?: string;
    loading?: boolean;
}

export default function RemoveFavoriteModal({
    isOpen,
    onClose,
    onConfirm,
    userName = "usuário",
    loading = false
}: RemoveFavoriteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-[#21262D] border border-[#21262D] rounded-lg shadow-lg max-w-md w-full mx-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div
                    className="inline-flex p-6 items-center gap-4 rounded-lg border border-[#21262D] bg-[#21262D]"
                    style={{
                        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.06)'
                    }}
                >
                    <div className="flex flex-col items-center gap-4 w-full">
                        <h2 className="text-xl font-semibold text-white text-center">
                            Remover dos favoritos
                        </h2>

                        <p className="text-gray-300 text-center">
                            Tem certeza que deseja remover este {userName} dos seus favoritos?
                        </p>

                        <div className="flex gap-4 w-full">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Voltar
                            </Button>

                            <Button
                                variant="danger"
                                onClick={onConfirm}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <Skeleton 
                                          variant="circular" 
                                          width={16} 
                                          height={16} 
                                          className="bg-white/20"
                                        />
                                        <span>Removendo...</span>
                                    </div>
                                ) : (
                                    "Confirmar ação"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}