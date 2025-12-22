"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightRays from "./light-rays";

export default function LightRaysWrapper() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (resolvedTheme !== "dark") return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <LightRays
        className="w-full h-full"
        raysOrigin="top-center"
        raysColor="#6366f1"
        raysSpeed={0.3}
        lightSpread={1.8}
        rayLength={2.5}
        fadeDistance={1.5}
        saturation={0.6}
        followMouse={true}
        mouseInfluence={0.1}
      />
    </div>
  );
}
