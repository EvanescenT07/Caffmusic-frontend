import { JSX } from "react";

export interface FloatingNavbarProps {
    navItems: Array<{
        name: string,
        link: string,
        icon?: JSX.Element | string,
    }>,
    className?: string,
}