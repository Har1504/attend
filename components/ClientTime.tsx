"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export const ClientTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <p className="text-6xl font-bold">{format(time, "HH:mm:ss")}</p>
      <p className="text-lg text-muted-foreground">{format(time, "PPPP")}</p>
    </div>
  );
};
