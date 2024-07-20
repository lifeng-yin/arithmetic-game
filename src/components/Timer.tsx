import { useEffect, useState } from "react";

function Timer({ time, onEnd }: { time: number; onEnd: Function }) {
  const [timeLeft, setTimeLeft] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        return;
      }
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [timeLeft, onEnd]);

  return <>{timeLeft}</>;
}

export default Timer;
