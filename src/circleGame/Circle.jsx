import { COLORS } from "./circle-constants";

function Circle({ xVal, yVal, id, circleCol }) {
  const styleObj = {
    backgroundColor: COLORS[circleCol],
    top: yVal + "px",
    left: xVal + "px",
    transform: "translate(-50%,-50%)",
  };
  return <div className="circle" style={styleObj}></div>;
}

export default Circle;
