import { useEffect, useState } from "react";

function Countdown({ minutes = 5 }) {

  const [time, setTime] = useState(minutes * 60);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <p>
      Time left: {Math.floor(time / 60)}:
      {(time % 60).toString().padStart(2, "0")}
    </p>
  );
}


export default Countdown