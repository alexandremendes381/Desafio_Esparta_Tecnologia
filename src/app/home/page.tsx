"use client";
import SearchInput from "@/components/ui/Input";
import React, { useState } from "react";


export default function Home() {
    const [value, setValue] = useState("");
  const handleSearch = () => {
    console.log(value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  return (
    <div className="flex justify-center items-center py-8">
     <SearchInput
       placeholder="Buscar usuários..."
       value={value}
       handleSearch={handleSearch}
       handleInputChange={handleInputChange}
     />
    </div>
  );
}
