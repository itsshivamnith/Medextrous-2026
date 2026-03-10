// components/Counter.tsx
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(value / 40);
    const t = setInterval(() => {
      n += step;
      if (n >= value) { setDisplay(value); clearInterval(t); }
      else setDisplay(n);
    }, 35);
    return () => clearInterval(t);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
};