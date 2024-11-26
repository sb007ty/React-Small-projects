import { useEffect, useRef, useState } from "react";

function InputOtp({ inpId, currentNum, setCurrentNum, otpVal, setOtpVal }) {
  const inpRef = useRef();
  useEffect(() => {
    if (inpId === currentNum) inpRef.current.focus();
  }, [currentNum]);
  return (
    <input
      type="text"
      name="otp-num"
      id=""
      value={otpVal[inpId]}
      onChange={(e) => {
        // console.log("onchange event,", inpId, currentNum);
        // console.dir(e);
        const val = e.target.value;
        const lastChar = val.length > 0 ? val[val.length - 1] : "";
        if (isNaN(e.target.value)) return;
        if (currentNum !== 5 && val !== "") setCurrentNum((num) => num + 1);
        const newOtpVal = [...otpVal];
        newOtpVal[inpId] = lastChar;
        setOtpVal(newOtpVal);
      }}
      onKeyDown={(e) => {
        const val = e.target.value;
        console.log(val, "keydown", inpId);
        // setCurrentNum((num) => num - 1);
        if (e.key === "Backspace" && val === "") {
          e.preventDefault();
          setCurrentNum((num) => num - 1);
        }
      }}
      onKeyUp={(e) => {
        const val = e.target.value;
        console.log(val, "keyup", inpId);
      }}
      onClick={(e) => {
        setCurrentNum(inpId);
      }}
      onPaste={(e) => {
        e.preventDefault();
        console.log(e.clipboardData.getData("text"));
        const newVal = e.clipboardData.getData("text").trim();
        if (isNaN(newVal)) return;
        const newOtpVal = newVal.slice(0, 6).split("");
        const oldLen = newOtpVal.length > 5 ? 5 : newOtpVal.length;
        for (let i = newOtpVal.length; i < 6; i++) newOtpVal[i] = "";
        console.log(newOtpVal, "otp");
        setOtpVal(newOtpVal);
        setCurrentNum(oldLen);
      }}
      ref={inpRef}
    />
  );
}

export default InputOtp;
