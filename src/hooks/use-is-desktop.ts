import { useEffect, useState } from "react";

export default function useIsDesktop() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setDesktop(mq.matches);
    handler(); // initialize
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}
