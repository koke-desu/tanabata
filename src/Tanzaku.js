import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tanzaku from "./assets/6704_b_a.png";

function Tanzaku({ x, y, text, setBackBlur, index }) {
  return (
    <motion.div
      style={{ display: "flex", position: "absolute", top: y, left: x }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, type: "spring" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={{ rotate: 15, translateX: -20 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatType: "reverse",
          delay: index * 0.2,
        }}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={tanzaku}
          style={{
            position: "absolute",
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: 12,
            paddingTop: 20,
            flexDirection: "row",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              lineHeight: 1,
              writingMode: "vertical-rl",
            }}
          >
            {text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Tanzaku;
