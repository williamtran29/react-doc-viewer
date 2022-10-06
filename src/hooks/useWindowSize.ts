import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
};
