import React, { useEffect, useRef, useState } from "react";
import "./circle-game.css";
import Circle from "./Circle";
function CircleGame() {
  const [circles, setCircles] = useState([]);
  const [undoCircle, setUndoCircle] = useState(-1);
  const circleGameRef = useRef();
  useEffect(() => {});
  function clickDiv(e) {
    const { x, y } = circleGameRef.current.getBoundingClientRect();
    console.log("clientboundrec");
    const randomNum = Math.floor(Math.random() * 9);
    const newMousePos = {
      xVal: e.pageX - x,
      yVal: e.pageY - y,
      id: crypto.randomUUID(),
      circleCol: randomNum,
    };
    const newCircles = circles.filter((_, index) => index <= undoCircle);
    newCircles.push(newMousePos);
    setCircles(newCircles);
    setUndoCircle(newCircles.length - 1);
    console.log(newMousePos, "new m");
    // console.log(e.getBoundClientRect());
  }
  console.log(circles, "circles");
  function undoGame() {
    setUndoCircle(undoCircle - 1);
  }
  function redoGame() {
    setUndoCircle(undoCircle + 1);
  }
  function resetGame() {
    setCircles([]);
    setUndoCircle(-1);
  }
  return (
    <div>
      <div className="circle-game" onClick={clickDiv} ref={circleGameRef}>
        {circles
          .filter((_, index) => {
            if (index <= undoCircle) return true;
          })
          .map((item) => {
            return <Circle {...item} key={item.id} />;
          })}
      </div>
      <div className="buttons">
        <button onClick={undoGame} disabled={undoCircle < 0}>
          Undo
        </button>
        <button
          onClick={redoGame}
          disabled={undoCircle >= circles.length - 1 || circles.length === 0}
        >
          Redo
        </button>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}

export default CircleGame;
