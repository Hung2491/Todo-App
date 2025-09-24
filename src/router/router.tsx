import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Box } from "@mui/material";
import AddTodo from "../screen/add_todo";
import Home from "../screen/home";

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
  path: "/home",
  component: Home,
});
const addTaskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/addTask",
  component: AddTodo,
});

// Tạo routeTree
const routeTree = rootRoute.addChildren([ homeRoute, addTaskRoute]);

// Tạo router với routeTree
const router = createRouter({ routeTree });

export { router };
