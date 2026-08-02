import React from "react";
import ReactDOM from "react-dom/client";
import { InterviewProvider } from "./context/InterviewContext";
import App from "./App";
import "./styles/variables.css";
import "./styles/theme.css";
import "./styles/responsive.css";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
       <InterviewProvider>
          <App />
      </InterviewProvider>
    </React.StrictMode>
);