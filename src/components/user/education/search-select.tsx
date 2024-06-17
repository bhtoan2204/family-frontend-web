"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchSelectProps {
  setSearchOption: (value: string) => void;
}

const SearchSelect = ({ setSearchOption }: SearchSelectProps) => {
  return (
    <Select onValueChange={(value) => setSearchOption(value)}>
      <SelectTrigger className="w-75">
        <SelectValue placeholder="Search Option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="progress">Progress</SelectItem>
        <SelectItem value="school">School</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SearchSelect;
