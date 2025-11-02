import React from "react";

interface FilterFieldProps {
  label: string;
  children: React.ReactNode;
  isError?: boolean;
  className?: string;
}

export const FilterField: React.FC<FilterFieldProps> = ({
  label,
  children,
  isError,
  className,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm text-neutral-700 mb-1">{label}</label>
      <div className="">{children}</div>
      {isError ? <div className="mt-1 text-xs text-red-600">!</div> : null}
    </div>
  );
};

export default FilterField;
