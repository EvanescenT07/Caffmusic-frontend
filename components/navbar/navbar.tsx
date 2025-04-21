"use client";

import { FloatingNavbarProps } from "@/types/type";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/toggle-button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FloatingNavbar = ({
    navItems,
    className,
}: FloatingNavbarProps) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <div className={cn("fixed top-4 inset-x-0 mx-auto max-w-fit z-[40] px-4 py-2 space-x-4",
            "items-center justify-between sm:justify-center",
            "rounded-full border border-black/10 dark:border-white/10",
            "bg-white/70 dark:bg-background/70 backdrop-blur-md shadow-md"
        )}
        >
            <div className="flex items-center space-x-4">
                <ThemeToggle />

                {/* Mobile Responsie */}
                <div className="hidden sm:flex items-center space-x-4">
                    {navItems.map((content, idx: number) => (
                        <Link key={`link=${idx}`} href={content.link} className="capitalize text-sm sm:text-base font-medium text-foreground hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838] rounded-full px-4 py-2 flex items-center gap-2">
                            <span className="block sm:hidden">
                                {content.icon}
                            </span>
                            <span className="text-sm">{content.name}</span>
                        </Link>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default FloatingNavbar;