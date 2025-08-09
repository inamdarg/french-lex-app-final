'use client';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-500 text-white ${className}`}
      {...props}
    />
  );
}
