import React, { useState } from "react";
import "./App.css";
import { useGetStrips } from "./database/getStrips";
import Tanzaku from "./Tanzaku";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
// @ts-ignore
import take from "./assets/take.png";
// @ts-ignore
import background from "./assets/backgroundMovie.mp4";

const { width, height } = window.parent.screen;
let coordinates: { x: number; y: number }[] = Array(30)
  .fill(0)
  .map(() => ({ x: Math.random() * (width - 200), y: Math.random() * (height - 200) }));

Amplify.configure(awsExports);

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
        style={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}
        width={1200}
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
      {strips.map((strip, index) => (
        <Tanzaku
          text={strip.text}
          name={strip.name}
          index={index}
          x={coordinates[index].x}
          y={coordinates[index].y}
          key={`tanzaku_${index}`}
        />
      ))}
    </div>
  );
}

export default App;
