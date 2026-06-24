import React from 'react';

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <span className={`inline-flex items-center gap-2 bg-[#E8F5EE] text-[#1A7A3C] text-sm font-semibold px-4 py-1.5 rounded-full ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#1A7A3C]" />
      {text}
    </span>
  );
}
