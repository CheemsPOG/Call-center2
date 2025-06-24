import { useState, useEffect } from "react";

const useRotatingTip = (tips: string[], delay: number = 10000) => {
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, delay);
    return () => clearInterval(interval);
  }, [tips, delay]);
  return tips[tipIndex];
};

export default useRotatingTip; 