// components/PageLayout.tsx
import React from "react";

export default function PageLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      {description && (
        <p className="text-gray-700 mb-6 text-base leading-relaxed font-medium">{description}</p>
      )}
      <div className="bg-white p-6 rounded-lg shadow">{children}</div>
    </div>
  );
}

