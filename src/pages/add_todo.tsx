import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import type { Todo } from "../types";
import { useNavigate } from "react-router";

// Date Picker imports
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const TAGS = ["Work", "Health", "Mental", "Others"];

export default function AddTodo() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [tag, setTag] = useState(TAGS[0]);
  const [date, setDate] = useState<Dayjs | null>(dayjs()); // mặc định hôm nay
  const [openPicker, setOpenPicker] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    if (!title.trim()) return;

    const selectedDate = date || dayjs();
    const formattedDate = `${selectedDate.hour()}:${selectedDate
      .minute()
      .toString()
      .padStart(2, "0")} - ${selectedDate.date()}/${
      selectedDate.month() + 1
    }/${selectedDate.year()}`;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      comment,
      tag,
      date: formattedDate,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    navigate("/");
  };

  // Responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900px

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          ...styles.formBox,
          width: isMobile ? "90%" : isTablet ? "70%" : "50%",
        }}
      >
        <Box sx={styles.inputBox}>
          <TextField
            placeholder="Title"
            variant="outlined"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            sx={styles.textField}
          />
          <TextField
            placeholder="Add a new task"
            variant="outlined"
            multiline
            fullWidth
            onChange={(e) => setComment(e.target.value)}
            rows={isMobile ? 3 : 4} // mobile ít dòng hơn
            sx={styles.textField}
          />
          <Select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            size={isMobile ? "small" : "medium"} // nhỏ gọn hơn trên mobile
          >
            {TAGS.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* DateTime Picker hidden, open by icon */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={date}
            onChange={(newValue) => setDate(newValue)}
            open={openPicker}
            onClose={() => setOpenPicker(false)}
            slotProps={{
              textField: {
                style: { display: "none" }, // ẩn textfield mặc định
              },
            }}
          />
        </LocalizationProvider>

        <Box
          sx={{
            ...styles.buttonBox,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : 0,
          }}
        >
          {/* Icon mở lịch */}
          <IconButton onClick={() => setOpenPicker(true)}>
            <AlarmAddIcon
              sx={{
                ...styles.icon,
                mr: isMobile ? 0 : 2,
              }}
            />
          </IconButton>

          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              ...styles.button,
              width: isMobile ? "100%" : "auto",
            }}
          >
            Add Todo
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    justifyContent: "center",
    display: "flex",
  },
  formBox: {
    mt: 5,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    position: "relative",
  },
  inputBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "black" },
      "&.Mui-focused fieldset": { borderColor: "gray", borderWidth: "1px" },
    },
  },
  buttonBox: {
    display: "flex",
    position: "absolute",
    width: "96%",
    bottom: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "gray",
    height: "35px",
    width: "35px",
  },
  button: {
    backgroundColor: "gray",
    fontWeight: 600,
    flex: 1,
  },
};
