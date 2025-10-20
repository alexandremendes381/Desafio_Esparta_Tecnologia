import React from "react";
import { toast } from "react-toastify";

export const toastSuccess = (message: string) => {
  toast(
    <div className="bg-[#C1D7F0] text-[#353535] border border-[#4988D1] rounded-lg text-sm font-sans px-4 py-2 shadow-none m-0 text-center w-full">
      {message}
    </div>,
    {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      closeButton: false,
      icon: false,
      className: '!bg-transparent !shadow-none !p-0 !m-0 !flex !justify-center !items-center',
      toastId: crypto.randomUUID(),
    }
  );
};

export const toastError = (message: string) => {
  toast(
    <div className="bg-[#0D1117] text-white border border-[#F85149] rounded-lg text-sm font-sans px-4 py-2 shadow-none m-0 text-center w-full">
      {message}
    </div>,
    {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      closeButton: false,
      icon: false,
      className: '!bg-transparent !shadow-none !p-0 !m-0 !flex !justify-center !items-center',
      toastId: crypto.randomUUID(),
    }
  );
};
