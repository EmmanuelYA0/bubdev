import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySelectProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

const categories = [
  { label: 'Vins', value: 1 },
  { label: 'Champagnes', value: 2 },
  { label: 'Spiritueux', value: 3 },
];

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {

  const handleChange = (newValue: string) => {
    onChange(newValue ? parseInt(newValue) : undefined);
  };

  return (
    <Select value={value?.toString()} onValueChange={handleChange}>
      <SelectTrigger  className='bg-white border-gray-200'>
        <SelectValue placeholder="Sélectionnez une catégorie" />
      </SelectTrigger>
      <SelectContent>
        {categories.map(({ label, value }) => (
          <SelectItem key={value} value={value.toString()}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;