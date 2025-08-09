'use client';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: InputProps) {
  return <input className={`border rounded p-2 w-full ${className}`} {...props} />;
}
