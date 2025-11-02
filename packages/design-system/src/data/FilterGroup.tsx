import React from "react";

interface FilterGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={className}>
      {title ? <div className="mb-2 text-sm font-medium">{title}</div> : null}
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4">{children}</div>
    </div>
  );
};

export default FilterGroup;
