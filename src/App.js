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

  //useeffect to add keydown listener only once
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)
    
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    }
    
  }, [detectKeyDown])

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
    console.log(lapList)
    setlapList(lapList => [...lapList, hours + ":" + minutes+ ":" + seconds])
  }

  return (
    <>
      <h1 class="center">{hours}:{minutes}:{seconds}</h1>
      <div class="center">
      <button class = "button" onClick={handleStart}>Start</button>
      <button class = "button" onClick={handleStop}>Stop</button>
      <button class = "button" onClick={handleReset}>Reset</button>
      <button class = "button" onClick={handleLap}>Lap</button>
      </div>
      <div class = "center">
      <p>Laps:</p>
      <ul>
        {lapList.map((lap) => (
          <li>{lap}</li>
        )
        )}
      </ul>
      </div>
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
  const [totalTime, setTotalTime] = useState(-1)
  var tempTime
  
  
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
    tempTime = parseInt(seconds)+(parseInt(minutes)*60)+(parseInt(hours*360))
    setTotalTime(tempTime)
    console.log(totalTime)
    setIsStarted(true);
  };
  
  //useeffect for the timer
  useEffect(() => {
    
    clearInterval(intervalRef.current);
    if (isStarted) {
      //checking timer is finished
      if(totalTime===0){
        alert("timer done")
        handleStop()
      }
      //increment by hours
      if(minutes === 0 && hours !==0){
        setMinutes(60)
        setHours(hours-1)
      }
      //increment by minutes
      if(seconds === 0){
        setSeconds(60)
        setMinutes(minutes-1)
      }
      //increment by seconds
      intervalRef.current = setInterval(() => {
        setSeconds(seconds - 1);
        setTotalTime(totalTime-1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStarted, seconds, minutes,hours]);

  //use effect in for detecting key is pressed down
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
  })
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
      <h1 class="center">{hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</h1>
      <div
        class="center"
      >
      <select
        class="dropDown"
        onChange={(e=> setHours(e.target.value))} 
        id = "hours"
      >
          <option > -- Hours -- </option>
          {hoursArray.map(hoursArray => (
            <option key = {hoursArray} value={hoursArray}>
              {hoursArray}
            </option>
            ))}
        </select>
        <select
          class="dropDown"
          onChange={(e=> setMinutes(e.target.value))} 
          id = "minutes"
        >
          <option > -- Minutes -- </option>
          {minutesArray.map(minutesArray => (
            <option key = {minutesArray} value={minutesArray}>
              {minutesArray}
            </option>
            ))}
        </select>
        <select
          class="dropDown"
          onChange={(e=> setSeconds(e.target.value))} 
          id = "seconds"
        >
          <option > -- Seconds -- </option>
          {secondsArray.map(secondsArray => (
            <option key = {secondsArray} value={secondsArray}>
              {secondsArray}
            </option>
            ))}
        </select>
      </div>
      <div
        class="center"
      >
      <button onClick={handleStart} class="button">Start</button>
      <button onClick={handleStop} class="button">Stop</button>
      <button onClick={handleReset} class="button">Reset</button>
      </div>
    </>
  );
};

export default Stopwatch;

