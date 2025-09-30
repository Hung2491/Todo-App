import { Route, Routes } from "react-router";
import AddTodo from "../pages/add_todo";
import Home from "../pages/home";

// Tạo root route
export default function Router() {
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/addTodo" element={<AddTodo />} />
  </Routes>;
}
