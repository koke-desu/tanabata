import { motion } from "framer-motion";
import React from "react";

type Props = {
  name: string;
  text: string;
};

const Wrapper: React.FC<Props & { x: number; y: number; index: number }> = ({
  name,
  text,
  x,
  y,
  index,
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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, type: "spring" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.2 }}
    >
      <motion.div
        animate={{ rotate: 8, translateX: -30 }}
        transition={{
          repeat: Infinity,
          duration: (index % 6) * 1,
          repeatType: "reverse",
          delay: (index % 6) * 0.2,
        }}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tannzaku {...{ name, text }} />
      </motion.div>
    </motion.div>
  );
};

const Tannzaku: React.VFC<Props> = ({ name, text }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 100,
        height: 400,
        zIndex: 30,
      }}
    >
      <img
        style={{
          width: 108,
          height: 400,
          objectFit: "cover",
        }}
        src={require("./assets/tanzaku.png")}
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
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <p
          style={{
            writingMode: "vertical-rl",
            display: "flex",
            textAlign: "left",
            alignSelf: "flex-end",
            padding: 4,
            fontSize: 12,
          }}
        >
          {name}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            padding: 8,
            paddingTop: 100,
          }}
        >
          {text.split("\n").map((a, index) => {
            if (index > 1) return;
            return (
              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  paddingTop: index * 24,
                  margin: 0,
                  fontSize: 16,
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
    </div>
  );
};
export default Wrapper;
