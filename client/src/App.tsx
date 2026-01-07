import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import DashbardComponent from "./components/DashbardComponent";
import InfiniteScrollComponent from "./components/InfiniteScroll/InfiniteScrollComponent";
import ReactVirtualized from "./components/ReactVirtualized/ReactVirtualized";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeComponent />} />
        <Route path="dashboard" element={<DashbardComponent />} />
        <Route path="scroll" element={<InfiniteScrollComponent />} />
        <Route path="virtualized" element={<ReactVirtualized />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
