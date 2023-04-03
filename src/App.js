import "./App.css";
import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const intervalRef = useRef(null);

  const handleStart = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (isStarted) {
      //increment by hours
      if(minutes == 60){
        setMinutes(0)
        setHours(hours+1)
      }
      //increment by minutes
      if(seconds == 60){
        setSeconds(0)
        setMinutes(minutes+1)
      }
      //increment by seconds
      intervalRef.current = setInterval(() => {
        setSeconds(seconds + 1);
      }, 10);
      
      
      
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStarted, seconds, minutes]);

  const handleStop = () => {
    setIsStarted(false);
  };

  const handleReset = () => {
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  return (
    <>
      <h1>{hours}:{minutes}:{seconds}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Stopwatch;

