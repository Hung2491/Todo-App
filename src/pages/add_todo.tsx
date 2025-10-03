import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { UseTodoContext } from "../context/todoContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const TAGS = ["Work", "Health", "Mental", "Others"];

export default function AddTodo() {
  const { addTodo } = UseTodoContext();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [tag, setTag] = useState(TAGS[0]);
  const [date, setDate] = useState<Dayjs | null>(dayjs()); // mặc định hôm nay

  const navigate = useNavigate();

  const handleSave = () => {
    if (!title.trim()) return;
    const now = dayjs().startOf("day");
    const selectedDate = date ? dayjs(date) : dayjs();
    const validDate = selectedDate.isBefore(now) ? dayjs() : selectedDate;
    const formattedDate = `${validDate.hour()}:${validDate
      .minute()
      .toString()
      .padStart(
        2,
        "0"
      )} - ${validDate.date()}/${validDate.month() + 1}/${validDate.year()}`;

    addTodo({
      title,
      comment,
      tag,
      date: formattedDate,
      completed: false,
    });

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
          width: isMobile ? "90%" : isTablet ? "70vw" : "30vw",
        }}
      >
        <Box sx={styles.header}>
          <IconButton sx={styles.backButton} onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              value={date}
              onChange={(newValue) => setDate(newValue)}
              minDate={dayjs()} // không chọn ngày trước hôm nay
            />
          </DemoContainer>
        </LocalizationProvider>

        <Box
          sx={{
            ...styles.buttonBox,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : 0,
          }}
        >
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
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  backButton: {
    color: "#393433",
  },
  formBox: {
    mt: 5,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
    width: "95%",
    flex: 1,
    bottom: 40,
    
  },
  icon: {
    color: "gray",
    height: "30px",
    width: "30px",
  },
  button: {
    backgroundColor: "#375078",
    fontWeight: 600,
    flex: 1,
  },
};
