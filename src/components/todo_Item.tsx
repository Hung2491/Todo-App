import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import type { Todo } from "../context/todoContext";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// Màu tương ứng với từng tag (giống Home)
const TAG_COLORS: Record<string, { background: string; text: string }> = {
  Work: { background: "#f2f4fe", text: "#7990f8" },
  Health: { background: "#edfaf3", text: "#46cf8b" },
  Mental: { background: "#f8eff7", text: "#bf66b1" },
  Others: { background: "#f4f3f3", text: "#908986" },
};

// Extract date part from formatted date string
const extractDate = (dateStr: string) => {
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
    e.stopPropagation();
    onToggle(todo.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(todo.id);
  };

  // Lấy màu cho tag
  const tagColor = TAG_COLORS[todo.tag] || TAG_COLORS.Others;

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
            {todo.title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              ...styles.title,
              fontWeight: 400,
              color: "gray",
              marginTop: "3px",
              fontSize: "16px",
            }}
          >
            {todo.comment}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                ...styles.tagBox,
                backgroundColor: tagColor.background,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  ...styles.tagText,
                  color: tagColor.text,
                }}
              >
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
    padding: "4px 12px",
    borderRadius: "6px",
    justifyContent: "center",
    mt: 1,
    mb: 1,
    minWidth: "60px",
  },
  tagText: {
    fontWeight: 600,
    fontSize: "0.875rem",
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
