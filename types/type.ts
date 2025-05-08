import { JSX } from "react";

export interface FloatingNavbarProps {
  navItems: Array<{
    name: string;
    link: string;
    icon?: JSX.Element | string;
  }>;
  className?: string;
}

export type PredictionResultProps = {
  id: string;
  predictionId: string;
  confidence: number;
  finalPrediction: string | null;
  fileName?: string;
  fileType?: string;
  timestamp: string;
};

export type UserProps = {
  id: string;
  email: string;
  name?: string;
  isOAuth?: boolean;
};

export interface WrapperProps {
  children: React.ReactNode;
}

export type CardComponentProps = {
  icon: React.ReactNode | string;
  title: string;
  description: string;
};
export type CardComponentList = CardComponentProps[];

export type WorkflowComponentProps = {
  step: number;
  icon: React.ReactNode | string;
  title: string;
  description: string;
};

export type WorkflowComponentList = WorkflowComponentProps[];
