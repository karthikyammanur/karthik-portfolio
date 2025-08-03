import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = "", 
  animate = true, 
  hover = true 
}: CardProps) {
  const cardContent = (
    <div className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-md shadow-red-500/5 ${hover ? 'hover:bg-white/10 hover:border-red-400/30 hover:shadow-red-500/20 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className={hover ? 'hover:scale-[1.02] transition-transform duration-300' : ''}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
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
