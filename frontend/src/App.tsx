import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <div className="App"><Home /></div>
      <Box sx={{ m: 50 }} />
    </div>
  );
}

export default App;
