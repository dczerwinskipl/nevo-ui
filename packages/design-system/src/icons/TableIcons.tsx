import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export interface IconProps {
  size?: number;
  className?: string;
}

export const ViewIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <Eye size={size} className={className} />
);

export const EditIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <Edit size={size} className={className} />
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <Trash2 size={size} className={className} />
);
