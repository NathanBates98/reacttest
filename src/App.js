import React, { useState, useEffect , useRef} from "react";
import "./App.css";
function Stopwatch(){
  let seconds=0;
  const intervalRef = useRef(null);

  function handleStart() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      seconds=1;
    }, 1000);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  return (
    <div className="App">
      <div>{seconds}</div>
      <button onClick = {handleStop}>Reset</button>
      <button onClick = {handleStart}>Start</button>
    </div>
  );
}


export default Stopwatch;

