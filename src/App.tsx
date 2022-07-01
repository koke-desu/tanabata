import React, { useState } from "react";
import "./App.css";
import { useGetStrips } from "./database/getStrips";
import Tanzaku from "./Tanzaku";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
// @ts-ignore
import take from "./assets/take.png";

Amplify.configure(awsExports);

function App() {
  const { width, height } = window.parent.screen;
  const [backBlur, setBackBlur] = useState(false);

  const strips = useGetStrips();

  if (strips === undefined) return <p>loading...</p>;

  return (
    <div className="App" style={{ position: "relative" }}>
      <img src={take} style={{ position: "absolute", top: 0, left: 0 }} />
      <div
        style={{
          display: "flex",
          alignContent: "center",
          backgroundColor: "red",
        }}
      >
        {strips.map((strip, index) => (
          <Tanzaku
            index={index}
            text={strip.text}
            x={Math.random() * width}
            y={Math.random() * height}
            setBackBlur={setBackBlur}
            key={`tanzaku_${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
