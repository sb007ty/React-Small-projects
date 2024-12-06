import { useEffect, useState } from "react";

const yearsArr = ["1950", "1960", "1970", "1980", "1990", "2000", "2010"];
function Histogram() {
  const [maxY, setMaxY] = useState(0);
  const [freqObj, setFreqObj] = useState({});
  async function generateNew() {
    try {
      const resp = await fetch(
        "https://www.random.org/integers/?num=200&min=1950&max=2019&col=1&base=10&format=plain"
      );
      const respData = await resp.text();
      //   console.log(typeof respData);
      const respDataArray = respData.split("\n");
      console.log(respDataArray);
      const newFreqObj = {};
      yearsArr.forEach((item) => {
        newFreqObj[item] = 0;
      });
      respDataArray.forEach((item) => {
        const year = Number(item);
        if (year >= 1950 && year < 1960) newFreqObj[yearsArr[0]]++;
        if (year >= 1960 && year < 1970) newFreqObj[yearsArr[1]]++;
        if (year >= 1970 && year < 1980) newFreqObj[yearsArr[2]]++;
        if (year >= 1980 && year < 1990) newFreqObj[yearsArr[3]]++;
        if (year >= 1990 && year < 2000) newFreqObj[yearsArr[4]]++;
        if (year >= 2000 && year < 2010) newFreqObj[yearsArr[5]]++;
        if (year >= 2010 && year < 2020) newFreqObj[yearsArr[6]]++;
      });
      console.log(newFreqObj);
      let maxFreq = -1;
      Object.values(newFreqObj).forEach((item) => {
        maxFreq = Math.max(item, maxFreq);
      });
      console.log(maxFreq);
      const newMaxY = Math.ceil(maxFreq / 10) * 10;
      setMaxY(newMaxY);
      setFreqObj(newFreqObj);
    } catch (e) {
      alert("api error");
    }
  }
  useEffect(() => {
    generateNew();
  }, []);
  const yLen = maxY / 10 + 1;
  const xAboveH = maxY === 0 ? 0 : `${(yLen + 1) * 100 - 2}px`;
  const yArr = Array(yLen)
    .fill(0)
    .map((item, index) => {
      return index * 10;
    })
    .reverse();
  console.log(yArr, "yar");
  return (
    <>
      <div
        className="hisotogram"
        style={{ display: "flex", minHeight: "80vh", alignItems: "flex-end" }}
      >
        {maxY > 0 && (
          <>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-evenly",
                  }}
                >
                  {yArr.map((item, index) => {
                    if (item !== 0)
                      return (
                        <div
                          key={index}
                          style={{
                            height: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              transform: "translate(0px,-12px)",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      );
                  })}
                </div>
                <div
                  style={{
                    width: "2px",
                    // height: yHeight,
                    backgroundColor: "black",
                  }}
                ></div>
              </div>
              <div style={{ height: "50px" }}></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  //   height: xAboveH,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "flex-end",
                }}
              >
                {yearsArr.map((item, index) => {
                  console.log(`${freqObj[item]}px`, "this px");
                  return (
                    <div
                      key={index}
                      style={{
                        width: "100px",
                        height: `${freqObj[item] * 10}px`,
                        backgroundColor: "red",
                      }}
                    ></div>
                  );
                })}
              </div>
              <div
                style={{
                  width: "900px",
                  height: "2px",
                  backgroundColor: "black",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  height: "50px",
                }}
              >
                {yearsArr.map((item, index) => {
                  return (
                    <div key={index} style={{ width: "100px" }}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      <button onClick={generateNew}>Refresh</button>
    </>
  );
}

export default Histogram;
{
  /* <div
style={{
  height: "2px",
  backgroundColor: "black",
}}
></div> */
}
