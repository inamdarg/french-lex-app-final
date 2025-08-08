
'use client';
import React from "react";
export const Button = ({ children, ...props }) => (
  <button className="px-4 py-2 rounded bg-blue-500 text-white" {...props}>{children}</button>
);
