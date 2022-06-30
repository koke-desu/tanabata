import React, { useState, useEffect } from "react";

import tanzaku from "./assets/6704_b_a.png";

function Tanzaku({ x, y, text }) {
  return (
    <div style={{ display: "flex", position: "absolute", top: y, left: x }}>
      <img src={tanzaku} />
      <p style={{}}>{text}</p>
    </div>
  );
}

export default Tanzaku;
