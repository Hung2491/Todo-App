import {
  Box,
  Fab,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import TodoItem from "../components/todo_Item";
import { UseTodoContext } from "../context/todoContext";

const TAGS = ["Work", "Health", "Mental", "Others"];
const COLORS = ["#f2f4fe", "#edfaf3", "#f8eff7", "#f4f3f3"];
const COLORS_ICON = ["#7990f8", "#46cf8b", "#bf66b1", "#908986"];

export default function Home() {
  const { todos, toggleTodo, deleteTodo, countByTag } = UseTodoContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Tách todos thành 2 danh sách: chưa hoàn thành và đã hoàn thành
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          ...styles.contentBox,
          width: isMobile ? "90%" : isTablet ? "70%" : "50%",
        }}
      >
        <Typography variant={isMobile ? "h4" : "h3"} sx={{ fontWeight: 600 }}>
          ToDo
        </Typography>

        {/* Tags Grid */}
        <Grid container spacing={2} sx={styles.tagsGrid}>
          {TAGS.map((tag, i) => (
            <Grid size={3} sx={styles.tagItem(i)} key={tag}>
              <FavoriteIcon sx={styles.favoriteIcon(i)} />
              <Box sx={styles.tagInfoBox}>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  sx={styles.tagCountText}
                >
                  {countByTag(tag)}
                </Typography>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  sx={styles.tagNameText}
                >
                  {tag}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Active Todos */}
        {activeTodos.length > 0 && (
          <Box sx={styles.todoSection}>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Active Tasks ({activeTodos.length})
            </Typography>
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </Box>
        )}

        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <Box sx={styles.todoSection}>
            <Typography variant="h6" sx={styles.sectionTitleCompleted}>
              Completed ({completedTodos.length})
            </Typography>
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </Box>
        )}

        {/* Empty State */}
        {activeTodos.length === 0 && completedTodos.length === 0 && (
          <Box sx={styles.emptyState}>
            <Typography variant="body1" sx={styles.emptyText}>
              No tasks yet. Click the + button to add one!
            </Typography>
          </Box>
        )}

        {/* Add Button */}
        <Fab
          onClick={() => navigate("/addTodo")}
          aria-label="add"
          style={{
            color: "white",
            backgroundColor: "#375078",
            borderRadius: "15%",
            position: "fixed",
            bottom: isMobile ? "15px" : "20px",
            right: isMobile ? "15px" : "20px",
            width: isMobile ? "50px" : "56px",
            height: isMobile ? "50px" : "56px",
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
    minHeight: "100vh",
    width: "100vw",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  contentBox: {
    height: "100%",
    paddingTop: "50px",
    paddingBottom: "80px",
  },
  tagsGrid: {
    marginTop: "20px",
    marginBottom: "20px",
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
  todoSection: {
    marginTop: "30px",
  },
  sectionTitle: {
    fontWeight: 600,
    color: "#375078",
    marginBottom: "10px",
  },
  sectionTitleCompleted: {
    fontWeight: 600,
    color: "#999",
    marginBottom: "10px",
    marginTop: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "10px",
    borderColor: "#e0e0e0",
  },
  emptyState: {
    textAlign: "center",
    marginTop: "50px",
    padding: "40px 20px",
  },
  emptyText: {
    color: "#999",
    fontSize: "1rem",
  },
};
