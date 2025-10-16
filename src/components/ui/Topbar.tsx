"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function Topbar() {
    const router = useRouter();
    return (
        <div className="w-full  flex items-center justify-center gap-4 bg-[#161B22]">
            <div className="relative left-4">
                <Image src="/Frame.svg" alt="Logo" width={32} height={32} />
            </div>
            <header className="w-full h-16 flex items-center justify-center gap-4 bg-[#161B22]">
                <Button
                    variant="link"
                    href="/"
                    onClick={() => router.push('/')}
                >Home</Button>
                <Button
                    variant="link"
                    href="/favorites"
                    onClick={() => router.push('/favorites')}
                >Favoritos</Button>
            </header>
        </div>
    )
}