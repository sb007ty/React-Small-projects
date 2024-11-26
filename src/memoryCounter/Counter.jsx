import React, { useState } from "react";

function Counter() {
  const [countArr, setCountArr] = useState([]);
  const [undoVal, setUndoVal] = useState({});
  function modifyCount(e) {
    if (e.target.tagName === "BUTTON") {
      setUndoVal({});
      const op = e.target.getAttribute("data-op");
      const countLen = countArr.length;
      const oldCountVal = countLen ? countArr[countLen - 1]["newVal"] : 0;
      const newCount = { op, oldVal: oldCountVal, id: crypto.randomUUID() };
      let newCountVal;
      const newCountArr = [...countArr];
      if (op === "divide") {
        newCountVal = oldCountVal / 2;
      }
      if (op === "subtract") {
        newCountVal = oldCountVal - 1;
      }
      if (op === "add") {
        newCountVal = oldCountVal + 1;
      }
      if (op === "multiply") {
        newCountVal = oldCountVal * 2;
      }
      newCount["newVal"] = newCountVal;
      newCountArr.push(newCount);
      setCountArr(newCountArr);
    }
  }
  function displayOps() {
    const newCountArr = countArr.map((item) => ({ ...item })).reverse();
    return newCountArr.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{item["op"]}</td>
          <td>{item["oldVal"]}</td>
          <td>{item["newVal"]}</td>
          {/* <td>{item["id"]}</td> */}
          {/* <td>
            <input />
          </td> */}
        </tr>
      );
    });
  }
  function handleMajorOps(e) {
    if (e.target.tagName === "BUTTON") {
      const op = e.target.getAttribute("data-op");
      if (op === "undo") {
        const newCountArr = [...countArr];
        const lastVal = newCountArr.pop();
        setCountArr(newCountArr);
        setUndoVal(lastVal);
      }
      if (op === "redo") {
        const newCountArr = [...countArr];
        newCountArr.push({ ...undoVal });
        setUndoVal({});
        setCountArr(newCountArr);
      }
      if (op === "reset") {
        setCountArr([]);
        setUndoVal({});
      }
    }
  }
  console.log(countArr);
  return (
    <div>
      <div onClick={handleMajorOps}>
        <button
          data-op="undo"
          disabled={Object.keys(undoVal).length !== 0 || countArr.length === 0}
        >
          Undo
        </button>
        <button data-op="redo" disabled={Object.keys(undoVal).length === 0}>
          Redo
        </button>
        <button data-op="reset">Reset</button>
      </div>
      <hr />
      <div onClick={modifyCount}>
        <button data-op="divide">/2</button>
        <button data-op="subtract">-1</button>
        <span>Val - </span>
        <button data-op="add">+1</button>
        <button data-op="multiply">*2</button>
      </div>
      <hr />
      {countArr.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Old</th>
                <th>New</th>
              </tr>
            </thead>
            <tbody>{displayOps()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Counter;
