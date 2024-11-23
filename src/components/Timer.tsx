import { useEffect, useState } from "react";
import { Strong } from "@radix-ui/themes";

function Timer({ roundTime, onEnd }: { roundTime: number; onEnd: () => void }) {
  const [timeLeft, setTimeLeft] = useState(roundTime);
  useEffect(() => {
    if (timeLeft === 0) {
      onEnd()
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [timeLeft, onEnd]);

  return <Strong>{timeLeft}</Strong>;
}

export default Timer;
