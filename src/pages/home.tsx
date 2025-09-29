import { Box, Fab, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import type { Todo } from "../types";
import TodoItem from "../components/todo_Item";

const TAGS = ["Work", "Health", "Mental", "Others"];
const COLORS = ["#f2f4fe", "#edfaf3", "#f8eff7", "#f4f3f3"];
const COLORS_ICON = ["#7990f8", "#46cf8b", "#bf66b1", "#908986"];

export default function Home() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const navigate = useNavigate();

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  const countByTag = (tag: string) => todos.filter((t) => t.tag === tag).length;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentBox}>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          ToDo
        </Typography>
        <Grid container spacing={2} sx={styles.tagsGrid}>
          {TAGS.map((tag, i) => (
            <Grid size={6} sx={styles.tagItem(i)} key={tag}>
              <FavoriteIcon sx={styles.favoriteIcon(i)} />
              <Box sx={styles.tagInfoBox}>
                <Typography variant="h6" sx={styles.tagCountText}>
                  {countByTag(tag)}
                </Typography>
                <Typography variant="h6" sx={styles.tagNameText}>
                  {tag}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}

        <Fab
          onClick={() => navigate("/addTodo")}
          aria-label="add"
          style={{
            color: "white",
            backgroundColor: "#393433",
            borderRadius: "15%",
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  contentBox: {
    width: "50%",
    height: "100%",
    paddingTop: "50px",
  },
  tagsGrid: {
    marginTop: "20px",
  },
  tagItem: (i: number) => ({
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: COLORS[i],
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  }),
  favoriteIcon: (i: number) => ({
    color: COLORS_ICON[i] || "yellow",
    marginBottom: "10px",
  }),
  tagInfoBox: {
    display: "flex",
    ml: "6px",
  },
  tagCountText: {
    color: "black",
    fontWeight: 600,
  },
  tagNameText: {
    fontWeight: 500,
    color: "gray",
    ml: 1,
  },
};
