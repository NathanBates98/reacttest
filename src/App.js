import "./App.css";
import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [lapList, setlapList] = useState([]);
  const intervalRef = useRef(null);

  
  //detects what key has been pressed
  const detectKeyDown = (keyPressed) => {
    console.log(keyPressed.key)
    if(keyPressed.key === "ArrowDown"){
      handleStop()
    }
    if(keyPressed.key === "ArrowUp"){
      handleStart()
    }
    
    if(keyPressed.key === "ArrowLeft"){
      handleLap()
    }
    
    if(keyPressed.key === "ArrowRight"){
      handleReset()
    }
    keyPressed = null
  }

  //starts timer
  const handleStart = () => {
    setIsStarted(true);
  };

  

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
    clearInterval(intervalRef.current);
    if (isStarted) {
      //increment by hours
      if(minutes === 60){
        setMinutes(0)
        setHours(hours+1)
      }
      //increment by minutes
      if(seconds === 60){
        setSeconds(0)
        setMinutes(minutes+1)
      }
      //increment by seconds
      intervalRef.current = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStarted, seconds, minutes,hours]);

  //pauses the timer
  const handleStop = () => {
    setIsStarted(false);
  };

  //resets timer and lapList
  const handleReset = () => {
    setSeconds(0)
    setMinutes(0)
    setHours(0)
    setlapList([])
  }

  //adds to lap list
  const handleLap = () => {
    setlapList(lapList => [...lapList, hours + ":" + minutes+ ":" + seconds])
    
  }

  return (
    <>
      <h1>{hours}:{minutes}:{seconds}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap}>Lap</button>
      <p>Laps:</p>
      <ul>
        {lapList.map((lap) => (
          <li>{lap}</li>
        )
        )}
      </ul>
    </>
  );
};

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef(null);

  let secondsArray = Array.from({length: 60}, (value,index) => index)
  let minutesArray = Array.from({length: 60}, (value,index) => index)
  let hoursArray = Array.from({length: 60}, (value,index) => index)

  
  
  //detects what key has been pressed
  const detectKeyDown = (keyPressed) => {
    console.log(keyPressed.key)
    if(keyPressed.key === "ArrowDown"){
      handleStop()
    }
    if(keyPressed.key === "ArrowUp"){
      handleStart()
    }
    if(keyPressed.key === "ArrowRight"){
      handleReset()
    }
    keyPressed = null
  }

  //starts timer
  const handleStart = () => {
    setSeconds()
    setIsStarted(true);
  };

  

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
    clearInterval(intervalRef.current);
    if (isStarted) {
      //increment by hours
      if(minutes === 60){
        setMinutes(0)
        setHours(hours-1)
      }
      //increment by minutes
      if(seconds === 60){
        setSeconds(0)
        setMinutes(minutes-1)
      }
      //increment by seconds
      intervalRef.current = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStarted, seconds, minutes,hours]);

  //pauses the timer
  const handleStop = () => {
    setIsStarted(false);
  };

  //resets timer and lapList
  const handleReset = () => {
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  
  }

  
  return (
    <>
      <h1>{hours}:{minutes}:{seconds}</h1>
      <div>
      <select>
          <option > -- Hours -- </option>
          {hoursArray.map(hoursArray => (
            <option key = {hoursArray} value={hoursArray}>
              {hoursArray}
            </option>
            ))}
        </select>
        <select>
          <option > -- Minutes -- </option>
          {minutesArray.map(minutesArray => (
            <option key = {minutesArray} value={minutesArray}>
              {minutesArray}
            </option>
            ))}
        </select>
        <select>
          <option > -- Seconds -- </option>
          {secondsArray.map(secondsArray => (
            <option key = {secondsArray} value={secondsArray}>
              {secondsArray}
            </option>
            ))}
        </select>
      </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Timer;

