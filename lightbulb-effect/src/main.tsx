import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lightbulb from "./Lightbulb";


const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

createRoot(container).render(
  <StrictMode>
    <Lightbulb initialState={true} />
  </StrictMode>
);
