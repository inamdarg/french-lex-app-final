'use client';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const base =
    'px-5 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants: Record<Required<ButtonProps>['variant'], string> = {
    primary:
      'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-green-500 hover:to-blue-500 transform hover:scale-105 focus:ring-blue-400',
    secondary:
      'bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-teal-500 hover:to-green-400 transform hover:scale-105 focus:ring-green-400',
    ghost:
      'bg-transparent text-blue-600 border border-blue-500 hover:bg-blue-50 transform hover:scale-105 focus:ring-blue-300',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
