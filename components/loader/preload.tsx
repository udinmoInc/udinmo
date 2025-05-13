"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress"
import "nprogress/nprogress.css";

const ProgressBar = () => {
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleDone = () => {
      NProgress.done();
    };

    const startProgress = () => {
      handleStart();
      setTimeout(handleDone, 1000);
    };

    const updateProgressColor = () => {
      const progress = NProgress.status !== null ? NProgress.status * 100 : 0;
      let color = "#ff0000";

      if (progress >= 30 && progress < 50) {
        color = "#0000ff";
      } else if (progress >= 50 && progress < 70) {
        color = "#00008b";
      } else if (progress >= 70) {
        color = "#008000";
      }

      document.querySelector("#nprogress .bar")?.setAttribute("style", `background: ${color} !important`);
    };

    startProgress();

    const interval = setInterval(updateProgressColor, 100);

    return () => {
      clearInterval(interval);
      NProgress.done();
    };
  }, [pathname]);

  return null;
};

export default ProgressBar;
