import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import AddTodo from "./pages/add_todo";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addTodo" element={<AddTodo />} />
      </Routes>
      ;
    </BrowserRouter>
  );
}
