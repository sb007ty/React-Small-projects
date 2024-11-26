import { useState } from "react";
import InputOtp from "./InputOtp";

function Otp() {
  const [currentNum, setCurrentNum] = useState(0);
  const [otpVal, setOtpVal] = useState(Array(6).fill(""));
  console.log(otpVal, "currn");
  return (
    <div>
      <div>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <InputOtp
              key={index}
              currentNum={currentNum}
              setCurrentNum={setCurrentNum}
              inpId={index}
              otpVal={otpVal}
              setOtpVal={setOtpVal}
            />
          ))}
      </div>
      <button
        onClick={(e) => {
          setOtpVal(Array(6).fill(""));
        }}
      >
        Reset
      </button>
      <button
        onClick={(e) => {
          // fetch("https://example.org/post", {
          //   method: "POST",
          //   body: JSON.stringify({ username: "example" }),
          //   // headers: myHeaders,
          // });
          const val = otpVal.join("");
          console.log(val, "api");
          fetch("https://www.greatfrontend.com/api/questions/auth-code-input", {
            method: "POST",
            body: JSON.stringify({
              otp: val,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              // if (!res.ok) throw res.text();
              console.log(res, "re1s");
              return res.text();
            })
            .then((res) => {
              alert(res, "res");
            })
            .catch((e) => {
              console.log("error", e);
            });
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Otp;
