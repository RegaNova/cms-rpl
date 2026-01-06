import { useState } from "react";

export default function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(!value);
  const close = () => setValue(false);

  return { value, toggle, close };
}