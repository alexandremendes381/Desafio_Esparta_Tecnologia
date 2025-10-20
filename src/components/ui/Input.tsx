"use client";

import { FC } from "react";
import Image from "next/image";
import Button from "./Button";
import type { SearchInputProps } from "@/types";

const SearchInput: FC<SearchInputProps> = ({ placeholder, value, handleSearch, handleInputChange, ...props }) => {
  return (
    <div className="flex justify-center items-center py-4 w-full">
      <div className="flex items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] bg-[#0D1117] border border-[#30363D] rounded-md px-4 py-1 transition-all duration-300">
        <input
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 pr-3"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          {...props}
        />
        <Button className="p-2" variant="primary" onClick={handleSearch}>
          <Image src="/search.svg" alt="Search" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
