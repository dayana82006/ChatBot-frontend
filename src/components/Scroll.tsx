import React from "react";

interface ScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const Scroll: React.FC<ScrollProps> = ({ children, className = "" }) => {
  return (
    <div className={`overflow-y-auto scroll-custom ${className}`}>
      {children}
    </div>
  );
};
