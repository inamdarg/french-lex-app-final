
'use client';
import React from "react";
export const Card = ({ children }) => (
  <div className="border rounded shadow bg-white">{children}</div>
);
export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
