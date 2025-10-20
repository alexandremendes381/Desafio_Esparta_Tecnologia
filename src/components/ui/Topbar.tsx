"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function Topbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="w-full flex items-center justify-center gap-4 bg-[#161B22]">
                <div className="relative left-4">
                    <Image src="/Frame.svg" alt="Logo" width={32} height={32} />
                </div>
                <header className="w-full h-16 flex items-center justify-center gap-4 bg-[#161B22]">
                    <div className="hidden sm:flex items-center gap-4">
                        <Button
                            variant="link"
                            href="/home"
                            onClick={() => router.push('/')}
                        >Home</Button>
                        <Button
                            variant="link"
                            href="/favorites"
                            onClick={() => router.push('/favorites')}
                        >Favoritos</Button>
                    </div>
                </header>
                <button
                    className="absolute right-4 block sm:hidden"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir menu"
                >
                    <Image src="/menu.svg" alt="Menu" width={28} height={28} />
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
                    <div className="flex-1" onClick={() => setIsOpen(false)}></div>
                    <div className="w-64 h-full bg-[#161B22] p-6 flex flex-col gap-4 shadow-lg">
                        <div className="flex justify-end items-center mb-4">
                            <button onClick={() => setIsOpen(false)} aria-label="Fechar menu">
                                <Image src="/close.svg" alt="Fechar" width={20} height={20} />
                            </button>
                        </div>

                        <Button
                            variant="link"
                            href="/home"
                            onClick={() => {
                                router.push("/");
                                setIsOpen(false);
                            }}
                            className="text-left justify-start w-full"
                        >
                            Home
                        </Button>

                        <Button
                            variant="link"
                            href="/favorites"
                            onClick={() => {
                                router.push("/favorites");
                                setIsOpen(false);
                            }}
                            className="text-left justify-start w-full"
                        >
                            Favoritos
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}