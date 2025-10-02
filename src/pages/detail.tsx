import { Box, Typography, Checkbox, IconButton, useTheme, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {  useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import type { Todo } from "../types";

// Extract date part from formatted date string
const extractDate = (dateStr: string) => {
  // "14:30 - 1/10/2025" -> "1/10/2025"
  const parts = dateStr.split(" - ");
  return parts.length > 1 ? parts[1] : dateStr;
};

export default function Detail() {
  const { date } = useParams<{ date: string }>();
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Filter todos by selected date
  const filteredTodos = todos.filter(
    (todo) => extractDate(todo.date) === date
  );

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const completedCount = filteredTodos.filter((t) => t.completed).length;
  const totalCount = filteredTodos.length;

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          ...styles.contentBox,
          width: isMobile ? "90%" : isTablet ? "70%" : "50%",
        }}
      >
        {/* Header */}
        <Box sx={styles.header}>
          {/* <IconButton sx={styles.backButton} onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton> */}
          <Typography variant={isMobile ? "h5" : "h4"} sx={styles.title}>
            Tasks for {date}
          </Typography>
        </Box>

        {/* Summary */}
        <Box sx={styles.summaryBox}>
          <Typography variant="body1" sx={styles.summaryText}>
            {completedCount} of {totalCount} tasks completed
          </Typography>
          <Box sx={styles.progressBar}>
            <Box
              sx={{
                ...styles.progressFill,
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
              }}
            />
          </Box>
        </Box>

        {/* Todo List */}
        <Box sx={styles.todoList}>
          {filteredTodos.length === 0 ? (
            <Box sx={styles.emptyState}>
              <Typography variant="body1" sx={styles.emptyText}>
                No tasks for this date
              </Typography>
            </Box>
          ) : (
            filteredTodos.map((todo) => (
              <Box key={todo.id} sx={styles.todoItem}>
                <Box sx={styles.todoContent}>
                  <Checkbox
                    sx={styles.checkbox}
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <Box sx={styles.todoInfo}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        ...styles.todoTitle,
                        textDecoration: todo.completed ? "line-through" : "none",
                        opacity: todo.completed ? 0.6 : 1,
                      }}
                    >
                      {todo.comment}
                    </Typography>
                    <Box sx={styles.todoMeta}>
                      <Box sx={styles.tagBox}>
                        <Typography variant="caption" sx={styles.tagText}>
                          {todo.tag}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={styles.timeText}>
                        {todo.date.split(" - ")[0]}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <IconButton
                  color="error"
                  onClick={() => deleteTodo(todo.id)}
                  sx={styles.deleteButton}
                >
                  <DeleteIcon sx={styles.deleteIcon} />
                </IconButton>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  contentBox: {
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    gap: 2,
  },
  backButton: {
    color: "#393433",
  },
  title: {
    fontWeight: 600,
    color: "#393433",
  },
  summaryBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  summaryText: {
    fontWeight: 500,
    color: "#666",
    marginBottom: "12px",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e7e7e7",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#46cf8b",
    transition: "width 0.3s ease",
  },
  todoList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    },
  },
  todoContent: {
    display: "flex",
    alignItems: "flex-start",
    flex: 1,
  },
  checkbox: {
    padding: "5px",
    marginTop: "-5px",
  },
  todoInfo: {
    marginLeft: "12px",
    flex: 1,
  },
  todoTitle: {
    fontWeight: 600,
    color: "#393433",
    marginBottom: "8px",
  },
  todoMeta: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  tagBox: {
    backgroundColor: "#f0f0f0",
    padding: "4px 12px",
    borderRadius: "6px",
  },
  tagText: {
    fontWeight: 500,
    color: "#666",
    fontSize: "0.75rem",
  },
  timeText: {
    fontWeight: 600,
    color: "#393433",
    fontSize: "0.75rem",
  },
  deleteButton: {
    marginTop: "-8px",
  },
  deleteIcon: {
    fontSize: "20px",
    color: "#393433",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  emptyText: {
    color: "#999",
    fontWeight: 500,
  },
};