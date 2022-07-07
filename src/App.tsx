import React, { useRef, useState } from "react";
import "./App.css";
import { useGetStrips } from "./database/getStrips";
import Tanzaku from "./Tanzaku";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import take from "./assets/take_dual_screen.png";
import background from "./assets/backgroundMovie.mp4";

Amplify.configure(awsExports);

export const stripNumLimit = 21; // 短冊数の上限

// 短冊の座標をコンポーネント外で定義
let coordinates: { x: number; y: number }[] = Array(stripNumLimit)
  .fill(0)
  .map((_, index) => ({ x: index * 180 + Math.random() * 40, y: Math.random() * 230 + 70 }));

const order = [5, 7, 12, 3, 8, 20, 15, 19, 1, 17, 0, 11, 6, 2, 4, 13, 10, 14, 16, 18, 9, 21];

const imgIndexes = Array(stripNumLimit)
  .fill(0)
  .map(() => Math.floor(Math.random() * 1000) % 5);

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
            imgIndex={imgIndexes[index]}
            index={index}
            x={coordinates[order[index]].x}
            y={coordinates[order[index]].y}
            key={`tanzaku_${strip.id}`}
          />
        );
      })}
    </div>
  );
}

export default App;
