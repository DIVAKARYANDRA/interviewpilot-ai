import React from "react";
import ReactDOM from "react-dom/client";
import { InterviewProvider } from "./context/InterviewContext";
import App from "./App";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
       <InterviewProvider>
          <App />
      </InterviewProvider>
    </React.StrictMode>
);