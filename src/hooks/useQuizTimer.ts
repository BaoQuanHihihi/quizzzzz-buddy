import { useEffect, useRef, useState } from "react";

/**
 * Counts down to `deadlineAt` (epoch ms). If null, returns null remaining (no timer).
 */
export function useQuizTimer(
  deadlineAt: number | null,
  onExpire: () => void
): number | null {
  const [remainingSec, setRemainingSec] = useState<number | null>(() =>
    deadlineAt == null ? null : Math.max(0, (deadlineAt - Date.now()) / 1000)
  );
  const fired = useRef(false);

  useEffect(() => {
    fired.current = false;
  }, [deadlineAt]);

  useEffect(() => {
    if (deadlineAt == null) {
      setRemainingSec(null);
      return;
    }

    const tick = () => {
      const sec = Math.max(0, (deadlineAt - Date.now()) / 1000);
      setRemainingSec(sec);
      if (sec <= 0 && !fired.current) {
        fired.current = true;
        onExpire();
      }
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [deadlineAt, onExpire]);

  return remainingSec;
}
