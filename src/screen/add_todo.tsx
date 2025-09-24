import { Box, Button, TextField } from "@mui/material";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
function AddTodo() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          mt: 5,
          padding: "20px",
          borderRadius: "5px",
          height: "100%",
          width: "45%",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "25%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            placeholder="Title"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  // màu border mặc định
                },
                "&:hover fieldset": {
                  borderColor: "black", // khi hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray", // khi focus
                  borderWidth: "1px", // có thể tăng độ dày border
                },
              },
            }}
          />
          <TextField
            placeholder="Add a new task"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  // màu border mặc định
                },
                "&:hover fieldset": {
                  borderColor: "black", // khi hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray", // khi focus
                  borderWidth: "1px", // có thể tăng độ dày border
                },
              },
            }}
          />
          <TextField
            placeholder="Tag"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  // màu border mặc định
                },
                "&:hover fieldset": {
                  borderColor: "black", // khi hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray", // khi focus
                  borderWidth: "1px", // có thể tăng độ dày border
                },
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: 20,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AlarmAddIcon
            sx={{ mr: 2, color: "gray", height: "35px", width: "35px" }}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", backgroundColor: "gray", fontWeight: 600 }}
          >
            Add Todo
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default AddTodo;
