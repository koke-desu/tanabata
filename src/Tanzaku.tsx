import { motion } from "framer-motion";
import React from "react";
import "./App.css";

import red1 from "./assets/red1.png";
import red2 from "./assets/red2.png";
import red3 from "./assets/red3.png";
import blue from "./assets/blue.png";
import orange from "./assets/orange.png";

const images = [red1, red2, red3, blue, orange];

type Props = {
  name: string;
  text: string;
  imgIndex: number;
};

const Wrapper: React.FC<Props & { x: number; y: number; index: number }> = ({
  name,
  text,
  x,
  y,
  index,
  imgIndex,
}) => {
  return (
    <motion.div
      style={{
        display: "flex",
        position: "absolute",
        top: y,
        left: x,
        zIndex: 20,
      }}
      className="tanzaku"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, type: "spring" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.2 }}
    >
      <motion.div
        animate={{ rotate: 8, translateX: -30 }}
        transition={{
          repeat: Infinity,
          duration: (index % 6) + 2,
          repeatType: "reverse",
          delay: (index % 6) * 0.2,
        }}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tannzaku {...{ name, text, imgIndex }} />
      </motion.div>
    </motion.div>
  );
};

const Tannzaku: React.VFC<Props> = ({ name, text, imgIndex }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 150,
        height: 600,
        zIndex: 30,
      }}
    >
      <img
        style={{
          width: 150,
          height: 600,
          objectFit: "cover",
        }}
        src={images[imgIndex]}
        alt={text}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
          justifyContent: "start",
          gap: 2,
          padding: 4,
        }}
      >
        <p
          style={{
            writingMode: "vertical-rl",
            display: "flex",
            textAlign: "left",
            alignSelf: "flex-end",
            margin: 0,
            paddingLeft: 4,
            paddingBottom: 16,
            fontSize: 20,
            marginRight: 12,
          }}
        >
          {name}
        </p>
        {(text.split("\n").length === 1 ? text.split("\n").concat([""]) : text.split("\n"))
          .reverse()
          .map((a, index) => {
            if (index > 1) return <></>;
            return (
              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  paddingTop: (1 - index) * 32 + 170,
                  margin: 0,
                  fontSize: 24,
                  writingMode: "vertical-rl",
                  fontWeight: "bold",
                }}
              >
                {a}
              </p>
            );
          })}
      </div>
    </div>
  );
};
export default Wrapper;
