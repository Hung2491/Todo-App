import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router";
import { UseTodoContext } from "../context/todoContext";

// Màu tương ứng với từng tag (giống Home)
const TAG_COLORS: Record<string, { background: string; text: string }> = {
  Work: { background: "#f2f4fe", text: "#7990f8" },
  Health: { background: "#edfaf3", text: "#46cf8b" },
  Mental: { background: "#f8eff7", text: "#bf66b1" },
  Others: { background: "#f4f3f3", text: "#908986" },
};

export default function Detail() {
  const { date } = useParams<{ date: string }>();
  const { getTodosByDate, toggleTodo, deleteTodo } = UseTodoContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Get todos for the selected date
  const filteredTodos = getTodosByDate(date || "");

  // Phân chia todos thành 2 nhóm: chưa hoàn thành và đã hoàn thành
  const activeTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  const completedCount = completedTodos.length;
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

        {/* Empty state */}
        {filteredTodos.length === 0 && (
          <Box sx={styles.emptyState}>
            <Typography variant="body1" sx={styles.emptyText}>
              No tasks for this date
            </Typography>
          </Box>
        )}

        {/* Active Tasks Section */}
        {activeTodos.length > 0 && (
          <Box>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Pending ({activeTodos.length})
            </Typography>
            {activeTodos.map((todo) => {
              const tagColor = TAG_COLORS[todo.tag] || TAG_COLORS.Others;
              return (
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
                        sx={{ fontWeight: 600, fontSize: 18 }}
                      >
                        {todo.title}
                      </Typography>
                      <Typography variant="subtitle1" sx={styles.todoTitle}>
                        {todo.comment}
                      </Typography>
                      <Box sx={styles.todoMeta}>
                        <Box
                          sx={{
                            ...styles.tagBox,
                            backgroundColor: tagColor.background,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              ...styles.tagText,
                              color: tagColor.text,
                            }}
                          >
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
              );
            })}
          </Box>
        )}

        {/* Divider giữa 2 phần */}
        {activeTodos.length > 0 && completedTodos.length > 0 && (
          <Divider sx={styles.divider} />
        )}

        {/* Completed Tasks Section */}
        {completedTodos.length > 0 && (
          <Box>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Completed ({completedTodos.length})
            </Typography>
            {completedTodos.map((todo) => {
              const tagColor = TAG_COLORS[todo.tag] || TAG_COLORS.Others;
              return (
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
                          textDecoration: "line-through",
                          fontWeight: 600,
                          color: "black",
                          fontSize: '18px',
                        }}
                      >
                        {todo.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          ...styles.todoTitle,
                          opacity: 0.6,
                        }}
                      >
                        {todo.comment}
                      </Typography>
                      <Box sx={styles.todoMeta}>
                        <Box
                          sx={{
                            ...styles.tagBox,
                            backgroundColor: tagColor.background,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              ...styles.tagText,
                              color: tagColor.text,
                            }}
                          >
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
              );
            })}
          </Box>
        )}
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
    backgroundColor: "#fafafa",
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
  sectionTitle: {
    fontWeight: 600,
    color: "#393433",
    marginTop: "30px",
    marginBottom: "10px",
    marginLeft: "10px",
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "15px",
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
    fontWeight: 400,
    fontSize: "18px",
    color: "gray",
    marginBottom: "8px",
  },
  todoMeta: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  tagBox: {
    padding: "4px 12px",
    borderRadius: "6px",
  },
  tagText: {
    fontWeight: 600,
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
  divider: {
    marginTop: "40px",
    marginBottom: "20px",
    borderColor: "#e0e0e0",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    marginTop: "40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  emptyText: {
    color: "#999",
    fontWeight: 500,
  },
};
