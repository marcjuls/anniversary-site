"use client";

import { useEffect, useState } from "react";

const start = new Date("2025-04-06T00:00:00+08:00").getTime();

function elapsed(now: number) {
  const seconds = Math.max(0, Math.floor((now - start) / 1_000));
  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor((seconds % 86_400) / 3_600),
    minutes: Math.floor((seconds % 3_600) / 60),
    seconds: seconds % 60,
  };
}

export default function AnniversaryClock() {
  const [time, setTime] = useState(() => elapsed(start));

  useEffect(() => {
    const updateTime = () => setTime(elapsed(Date.now()));
    updateTime();
    const timer = window.setInterval(updateTime, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <dl className="museum-clock" aria-label="Time since April 6, 2025">
      {Object.entries(time).map(([label, value]) => (
        <div key={label}>
          <dd>{String(value).padStart(2, "0")}</dd>
          <dt>{label}</dt>
        </div>
      ))}
    </dl>
  );
}
