import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import type { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// Extract date part from formatted date string
const extractDate = (dateStr: string) => {
  // "14:30 - 1/10/2025" -> "1/10/2025"
  const parts = dateStr.split(" - ");
  return parts.length > 1 ? parts[1] : dateStr;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    const date = extractDate(todo.date);
    navigate(`/detail/${encodeURIComponent(date)}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking checkbox
    onToggle(todo.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    onDelete(todo.id);
  };

  return (
    <Box sx={styles.container} onClick={handleClick}>
      <Box sx={styles.content}>
        <Checkbox
          sx={styles.checkbox}
          checked={todo.completed}
          onClick={handleCheckboxClick}
        />
        <Box sx={styles.boxMargin}>
          <Typography variant="subtitle1" sx={styles.title}>
            {todo.comment}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
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
      </Box>
      <IconButton color="error" onClick={handleDeleteClick}>
        <DeleteIcon sx={styles.deleteIcon} />
      </IconButton>
    </Box>
  );
}

const styles = {
  container: {
    mt: 5,
    padding: "25px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottom: "2px solid #e7e7e7",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
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
    mb: 1,
    minWidth: "60px",
    backgroundColor: "#e7e7e7",
  },
  tagText: {
    fontWeight: 500,
    color: "gray",
  },
  date: {
    fontWeight: 600,
    color: "black",
    ml: 2,
  },
  deleteIcon: {
    fontSize: "20px",
    color: "black",
  },
  boxMargin: {
    ml: 3,
    flex: 1,
  },
};