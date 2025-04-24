import { JSX } from "react";

export interface FloatingNavbarProps {
    navItems: Array<{
        name: string,
        link: string,
        icon?: JSX.Element | string,
    }>,
    className?: string,
}

export type PredictionResultProps = {
    prediction_id: string;
    confidence: number;
    final_prediction: string | null;
    fileName?: string;
    fileType?: string;
    timestamp: string;
}

export type UserProps = {
    id: string;
    email: string;
    name?: string
    isOAuth?: boolean;
}