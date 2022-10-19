import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./Components/Frontpage";
import AddItemPage from "./Components/AddItemPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/addItem" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

//litt usikker på utropstegnet
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
