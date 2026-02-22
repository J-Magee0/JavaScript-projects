import { useState } from "react";
import "./Lightbulb.css";

export default function Lightbulb() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className={`canvas ${isOn ? "dark" : ""}`}>
      <h1>Click to turn on/off lightbulb</h1>
      <div
        className={`bulb ${isOn ? "is-on" : ""}`}
        onClick={() => setIsOn(!isOn)}
      ></div>
    </div>
  );
}
