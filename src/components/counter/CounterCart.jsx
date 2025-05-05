import { IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function CounterCartTailwind({
  value = 1,
  min = 1,
  max = 99,
  onChange,
}) {
  const [count, setCount] = useState(value);

  // Sync jika value dari parent berubah
  useEffect(() => {
    setCount(value);
  }, [value]);

  const decrement = () => {
    const next = Math.max(count - 1, min);
    setCount(next);
    onChange?.(next);
  };

  const increment = () => {
    const next = Math.min(count + 1, max);
    setCount(next);
    onChange?.(next);
  };

  return (
    <div className="inline-flex items-center border border-orange-100 rounded-lg overflow-hidden">
      <IconButton
        onClick={decrement}
        variant="subtle"
        size={"xs"}
        bg={"orange.100"}
      >
        <LuMinus color="orange" />
      </IconButton>
      <span className="px-4 text-center w-10 text-black">{count}</span>
      <IconButton
        onClick={increment}
        variant="subtle"
        size={"xs"}
        bg={"orange.100"}
      >
        <LuPlus color="orange"/>
      </IconButton>
    </div>
  );
}
