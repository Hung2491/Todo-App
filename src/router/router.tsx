import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Box } from "@mui/material";
import AddTodo from "../pages/add_todo";
import Home from "../pages/home";

// Tạo root route
const rootRoute = createRootRoute({
  component: () => (
    <Box>
      <Outlet />
      <TanStackRouterDevtools></TanStackRouterDevtools>
    </Box>
  ),
});

// Tạo các route con
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const addTodoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/addTodo",
  component: AddTodo,
});

// Tạo routeTree
const routeTree = rootRoute.addChildren([ homeRoute, addTodoRoute]);

// Tạo router với routeTree
const router = createRouter({ routeTree });

export { router };
