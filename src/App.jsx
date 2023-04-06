import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./routes/Home";
import Navigation from "./routes/Navigation";
import SingInPage from "./routes/SingInPage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="signIn" element={<SingInPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
