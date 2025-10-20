import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = "", 
  hover = true 
}: CardProps) {
  return (
    <div 
      className={`glass-card glossy-surface rounded-3xl p-6 ${
        hover ? 'hover:scale-[1.02] transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Preset card variants for common use cases
export function ProjectCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Card 
      className={`p-0 overflow-hidden ${className}`}
      hover={true}
    >
      {children}
    </Card>
  );
}

export function FeatureCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Card 
      className={`text-center ${className}`}
      hover={true}
    >
      {children}
    </Card>
  );
}

export function ContactCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Card 
      className={`max-w-4xl mx-auto ${className}`}
      hover={false}
    >
      {children}
    </Card>
  );
}
