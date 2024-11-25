"use client";

import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import { Input } from "@chakra-ui/react";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  { value?: string; onClick?: () => void }
>(({ value, onClick }, ref) => (
  <>
    <Input
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      width="full"
      placeholder="Select date"
      paddingRight="40px"
      background={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'%3E%3C/path%3E%3C/svg%3E") no-repeat right 10px center/20px`}
    />
  </>
));

CustomInput.displayName = "CustomInput";

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  placeholderText = "Select date",
}) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      customInput={<CustomInput />}
      dateFormat="MMMM d, yyyy"
      placeholderText={placeholderText}
    />
  );
};
