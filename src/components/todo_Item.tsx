import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import type { Todo } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const styles = {
    container: {
      mt: 5,
      padding: "25px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      borderBottom: "2px solid #e7e7e7",
    },
    content: {
      display: "flex",
      alignItems: "flex-start",
      flex: 1,
    },
    checkbox: {
      padding: "5px",
    },
    title: {
      color: "black",
      fontWeight: 600,
    },
    tagBox: {
      display: "flex",
      alignItems: "center",
      padding: "1px",
      borderRadius: "5px",
      justifyContent: "center",
      mt: 1,
      width: "50%",
      mb: 1,
      backgroundColor: "#e7e7e7",
    },
    tagText: {
      fontWeight: 500,
      color: "gray",
    },
    date: {
      fontWeight: 600,
      color: "black",
    },
    deleteIcon: {
      fontSize: "20px",
      color: "black",
    },
    boxMargin: {
      ml: 3,
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Checkbox
          sx={styles.checkbox}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <Box sx={styles.boxMargin}>
          <Typography variant="subtitle1" sx={styles.title}>
            {todo.title}
          </Typography>
          <Box sx={styles.tagBox}>
            <Typography variant="body2" sx={styles.tagText}>
              {todo.tag}
            </Typography>
          </Box>
          <Typography variant="body2" sx={styles.date}>
            {todo.date.toString()}
          </Typography>
        </Box>
      </Box>
      <IconButton color="error" onClick={() => onDelete(todo.id)}>
        <DeleteIcon sx={styles.deleteIcon} />
      </IconButton>
    </Box>
  );
}
