"use client";
import React from "react";
import Button from "../ui/Button";
import { toastSuccess } from "@/lib/utils";

interface RemoveFavoriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    userName?: string;
    loading?: boolean;
}

export default function RemoveFavoriteModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false
}: RemoveFavoriteModalProps) {
    if (!isOpen) return null;

    const handleConfirm = async () => {
        const result = onConfirm();
        if (result instanceof Promise) {
            await result;
        }
        toastSuccess("Usuário removido dos favoritos.");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-[#2D3139] border border-gray-600 shadow-2xl block sm:hidden w-[282px] h-[322px] rounded-lg border-1 p-6 opacity-100">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="pt-4 h-full">
                    <div className="flex flex-col items-center h-full gap-4">
                        <h2 className="text-lg font-medium text-white text-center">
                            Remover dos favoritos
                        </h2>

                        <p className="text-gray-300 text-center font-normal text-base leading-6 tracking-normal">
                            Tem certeza que deseja remover este usuário dos seus favoritos?
                        </p>

                        <div className="flex flex-col w-full mt-auto gap-4">
                            <Button
                                variant="danger"
                                onClick={handleConfirm}
                                disabled={loading}
                                className="w-full py-3 bg-[#4A90E2] hover:bg-[#357ABD] text-white font-medium rounded-md transition-colors"
                            >
                                {loading ? "Removendo..." : "Confirmar ação"}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={loading}
                                className="w-full py-3 border border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white font-medium rounded-md transition-colors"
                            >
                                Voltar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-[#2D3139] border border-gray-600 shadow-2xl hidden sm:block w-[580px] h-[234px] rounded-lg border-1 p-6 opacity-100">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="pt-4 h-full">
                    <div className="flex flex-col items-center justify-between h-full gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <h2 className="text-lg font-medium text-white text-center">
                                Remover dos favoritos
                            </h2>

                            <p className="text-gray-300 text-center font-normal text-base leading-6 tracking-normal">
                                Tem certeza que deseja remover este usuário dos seus favoritos?
                            </p>
                        </div>

                        <div className="flex flex-row w-full justify-center gap-4">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={loading}
                                className="px-8 py-3 border border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white font-medium rounded-md transition-colors"
                            >
                                Voltar
                            </Button>

                            <Button
                                variant="danger"
                                onClick={handleConfirm}
                                disabled={loading}
                                className="px-8 py-3 bg-[#4A90E2] hover:bg-[#357ABD] text-white font-medium rounded-md transition-colors"
                            >
                                {loading ? "Removendo..." : "Confirmar ação"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}