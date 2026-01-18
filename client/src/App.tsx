import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import DashbardComponent from "./components/DashbardComponent";
import InfiniteScrollComponent from "./components/InfiniteScroll/InfiniteScrollComponent";
import ReactVirtualized from "./components/ReactVirtualized/ReactVirtualized";
import PaginatedTable from "./components/PaginatedTable/PaginatedTable";
import TodoComponent from "./components/Todo/TodoComponent";
import BlobComponent from "./components/blob/BlobComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeComponent />} />
        <Route path="dashboard" element={<DashbardComponent />} />
        <Route path="scroll" element={<InfiniteScrollComponent />} />
        <Route path="virtualized" element={<ReactVirtualized />} />
        <Route path="table" element={<PaginatedTable />} />
        <Route path="todo" element={<TodoComponent />} />
        <Route path="blob" element={<BlobComponent />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
