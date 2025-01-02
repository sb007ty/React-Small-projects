import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./memoryCounter/Counter";
import Otp from "./otpChecker/Otp";
import Histogram from "./histogram/Histogram";
import CircleGame from "./circleGame/CircleGame";

function App() {
  const [count, setCount] = useState([]);

  return (
    <>
      {/* <Counter /> */}
      {/* <Otp /> */}
      {/* <Histogram /> */}
      <CircleGame />
    </>
  );
}

export default App;
