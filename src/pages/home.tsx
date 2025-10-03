import {
  Box,
  Fab,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import TodoItem from "../components/todo_Item";
import { UseTodoContext } from "../context/todoContext";
import WorkIcon from "@mui/icons-material/Work";
import FolderIcon from "@mui/icons-material/Folder";

// const TAGS = ["Work", "Health", "Mental", "Others"];

const TAGS = [
  {
    icon: <FavoriteIcon sx={{ color: "#7990f8", mb: 1 }} />,
    tag: "Work",
    color: "#f2f4fe",
    iconColor: "#7990f8",
  },
  {
    icon: <WorkIcon sx={{ color: "#46cf8b", mb: 1 }} />,
    tag: "Health",
    color: "#edfaf3",
    iconColor: "#46cf8b",
  },
  {
    icon: <VolunteerActivismIcon sx={{ color: "#bf66b1", mb: 1 }} />,
    tag: "Mental",
    color: "#f8eff7",
    iconColor: "#bf66b1",
  },
  {
    icon: <FolderIcon sx={{ color: "#908986", mb: 1 }} />,
    tag: "Others",
    color: "#f4f3f3",
    iconColor: "#908986",
  },
];

export default function Home() {
  const { todos, toggleTodo, deleteTodo, updateTodo, countByTag } =
    UseTodoContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Tách todos thành 2 nhóm: chưa hoàn thành và đã hoàn thành
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const getToday = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // thêm 0 nếu < 10
    const month = String(today.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

 


  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          ...styles.contentBox,
          width: isMobile ? "90%" : isTablet ? "70%" : "50%",
        }}
      >
        <Typography variant={isMobile ? "h4" : "h3"} sx={{ fontWeight: 600 }}>
          Today {getToday()}
        </Typography>

        <Grid container spacing={2} sx={styles.tagsGrid}>
          {TAGS.map((tag) => (
            <Grid
              size={3}
              sx={styles.tagItem(tag.color)}
              key={tag.tag}
              onClick={() => navigate(`/tag/${tag.tag}`)}
            >
              {tag.icon}

              <Box sx={styles.tagInfoBox}>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  sx={styles.tagCountText}
                >
                  {countByTag(tag.tag)}
                </Typography>
                <Typography
                  variant={isMobile ? "body2" : "h6"}
                  sx={styles.tagNameText}
                >
                  {tag.tag}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Danh sách todos chưa hoàn thành */}
        {activeTodos.length > 0 && (
          <Box>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Pending ({activeTodos.length})
            </Typography>
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
          </Box>
        )}

        {activeTodos.length > 0 && completedTodos.length > 0}

        {completedTodos.length > 0 && (
          <Box>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Completed Tasks ({completedTodos.length})
            </Typography>
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
          </Box>
        )}

        {/* Hiển thị khi không có todo nào */}
        {todos.length === 0 && (
          <Box sx={styles.emptyState}>
            <Typography variant="body1" sx={styles.emptyText}>
              No tasks yet. Click the + button to add your first task!
            </Typography>
          </Box>
        )}

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
  tagItem: (i: string) => ({
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: i,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  }),
  favoriteIcon: (i: string) => ({
    color: i || "yellow",
    marginBottom: "10px",
  }),
  tagInfoBox: {
    display: "flex",
    ml: "6px",
    flexDirection: "column",
  },
  tagCountText: {
    color: "black",
    fontWeight: 600,
  },
  tagNameText: {
    fontWeight: 500,
    color: "gray",
  },
  sectionTitle: {
    fontWeight: 600,
    color: "#393433",
    marginTop: "30px",
    marginBottom: "10px",
    marginLeft: "10px",
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
  },
  emptyText: {
    color: "#999",
    fontWeight: 500,
  },
};
