import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  IconButton,
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

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formBox}>
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
            rows={4}
            sx={styles.textField}
          />
          <Select value={tag} onChange={(e) => setTag(e.target.value)}>
            {TAGS.map((t) => (
              <MenuItem key={t} value={t} color="primary">
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

        <Box sx={styles.buttonBox}>
          {/* Icon mở lịch */}
          <IconButton onClick={() => setOpenPicker(true)}>
            <AlarmAddIcon sx={styles.icon} />
          </IconButton>

          <Button onClick={handleSave} variant="contained" sx={styles.button}>
            Add Todo
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  formBox: {
    mt: 5,
    padding: "20px",
    borderRadius: "5px",
    height: "100%",
    width: "45%",
    alignItems: "center",
    position: "relative",
  },
  inputBox: {
    height: "25%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    bottom: 100,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "gray",
    height: "35px",
    width: "35px",
    mr:2
  },
  button: {
    flex: 1,
    backgroundColor: "gray",
    fontWeight: 600,
  },
};
