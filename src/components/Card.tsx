// src/components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * A reusable Card component for displaying sections with a consistent style.
 * Uses Tailwind CSS for styling.
 */
const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    <div>{children}</div>
  </div>
);

export default Card;
