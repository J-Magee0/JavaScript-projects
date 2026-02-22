import { useState } from "react";
import "./Lightbulb.css";

type LightbulbProps = {
  initialState?: boolean;
};

export default function Lightbulb({initialState = false, }: LightbulbProps) {
  const [isOn, setIsOn] = useState<boolean>(initialState);

  const toggleLight = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className={`canvas ${isOn ? "dark" : ""}`}>
      <h1>Click Lightbulb to turn on/off</h1>
      <div
        className={`bulb ${isOn ? "is-on" : ""}`}
        onClick={toggleLight}
      ></div>
    </div>
  );
}
