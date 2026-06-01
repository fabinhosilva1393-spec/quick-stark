import { useEffect, useState } from "react";
import { detectOS, type DetectedOS } from "@/lib/detectOS";

export function useDetectedOS(): DetectedOS {
  const [detectedOS, setDetectedOS] = useState<DetectedOS>("unknown");

  useEffect(() => {
    setDetectedOS(detectOS());
  }, []);

  return detectedOS;
}
