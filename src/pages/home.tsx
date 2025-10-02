import { Box, Fab, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { UseTodoContext } from "../context/todoContext";
import TodoItem from "../components/todo_Item";

const TAGS = ["Work", "Health", "Mental", "Others"];
const COLORS = ["#f2f4fe", "#edfaf3", "#f8eff7", "#f4f3f3"];
const COLORS_ICON = ["#7990f8", "#46cf8b", "#bf66b1", "#908986"];

export default function Home() {
  const { todos, toggleTodo, deleteTodo, countByTag } = UseTodoContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
        <Grid container spacing={2} sx={styles.tagsGrid}>
          {TAGS.map((tag, i) => (
            <Grid size={6} sx={styles.tagItem(i)} key={tag}>
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
};