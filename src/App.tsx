import React, { useRef, useState } from "react";
import "./App.css";
import { useGetStrips } from "./database/getStrips";
import Tanzaku from "./Tanzaku";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import take from "./assets/take_dual_screen.png";
import background from "./assets/backgroundMovie.mp4";

Amplify.configure(awsExports);

const limit = 30; // 短冊数の上限

// 短冊の座標をコンポーネント外で定義
let coordinates: { x: number; y: number }[] = Array(30)
  .fill(0)
  .map((_, index) => ({ x: index * 120 * (Math.random() * 40 - 20), y: Math.random() * 230 + 70 }));

function App() {
  const strips = useGetStrips();

  if (strips === undefined) return <p>loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        backgroundColor: "red",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={take}
        style={{ position: "absolute", top: -100, right: 0, zIndex: 10 }}
        width={3960}
        alt="竹"
      />
      <video
        src={background}
        width={1920}
        height={1020}
        autoPlay
        muted
        loop
        className="background_movie"
      />
      {strips.map((strip, index) => {
        return (
          <Tanzaku
            text={strip.text}
            name={strip.name}
            index={index}
            x={0}
            y={0}
            key={`tanzaku_${index}`}
          />
        );
      })}
    </div>
  );
}

export default App;
