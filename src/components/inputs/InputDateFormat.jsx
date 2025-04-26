import { useState } from "react";
import { InputWithElement } from "./InputWithElement";
import { Calendar2 } from "iconsax-react";

export function InputDateFormat({
  placeholder = "DD/MM/YYYY",
  value,
  onChange,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(value || "");

  const formatDateInput = (input) => {
    // Hapus semua selain angka
    const cleaned = input.replace(/\D+/g, "");

    let day = cleaned.slice(0, 2);
    let month = cleaned.slice(2, 4);
    let year = cleaned.slice(4, 8);

    if (day.length === 2) {
      const dayNum = parseInt(day, 10);
      if (dayNum > 31) {
        day = "31";
      }
    }

    if (month.length === 2) {
      const monthNum = parseInt(month, 10);
      if (monthNum > 12) {
        month = "12";
      }
    }

    let formatted = "";
    if (cleaned.length <= 2) {
      formatted = day;
    } else if (cleaned.length <= 4) {
      formatted = `${day}/${month}`;
    } else {
      formatted = `${day}/${month}/${year}`;
    }

    return formatted;
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const formatted = formatDateInput(input);
    setInternalValue(formatted);

    if (onChange) {
      onChange(formatted);
    }
  };

  return (
    <InputWithElement
      startElement={<Calendar2 size={20} color="#949494" />}
      value={internalValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
