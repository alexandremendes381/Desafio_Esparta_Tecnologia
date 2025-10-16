"use client";
import { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "link" | "danger" | "outline";
    href?: string; 
}

const Button: FC<ButtonProps> = ({ variant = "primary", className, children, href, onClick, ...props }) => {
    const router = useRouter();
    const pathname = usePathname();
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors duration-200";

    const isActive = href ? pathname === href : false;

    const variants = {
        primary: "transparent text-white",
        secondary: "bg-[#21262D] text-white hover:bg-gray-300",
        danger: "flex-1 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium",
        outline:"flex-1 px-6 py-3 rounded-lg border border-[#30363D] bg-transparent text-white hover:bg-[#30363D] transition-colors font-medium",
        link: clsx(
            "text-white bg-transparent hover:text-blue-600",
            isActive ? "underline underline-offset-5 decoration-2" : "no-underline"
        ),
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (href) {
            router.push(href);
        }
        // Chama o onClick passado como prop, se existir
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button className={clsx(baseStyle, variants[variant], className)} onClick={handleClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
