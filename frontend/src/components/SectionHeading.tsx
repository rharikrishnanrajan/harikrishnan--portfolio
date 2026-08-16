import React from 'react';

interface SectionHeadingProps {
  index?: string;
  label: string;
  title: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ label, title }) => {
  return (
    <header className="mb-4">
      <div className="flex items-center gap-3">
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="section-heading mt-4">{title}</h2>
    </header>
  );
};

export default SectionHeading;
