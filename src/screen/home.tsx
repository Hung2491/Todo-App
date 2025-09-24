import type React from "react";
import { Box, Checkbox, Fab, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "@tanstack/react-router";

const handleClick = () => {
  return <Link to="/addTask"></Link>;
};
function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "50%", height: "100%", paddingTop: "50px" }}>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Today
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <IconBox title="Task 1" />
          <IconBox title="Task 2" />
          <IconBox title="Task 3" />
          <IconBox title="Task 4" />
        </Grid>
        <CategoryItem title="Drink 8 glasses of water" color="#FFCDD2" />
        <Fab
          aria-label="add"
          onClick={handleClick}
          style={{
            color: "white",
            backgroundColor: "#393433",
            borderRadius: "15%",
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}

const CategoryItem: React.FC<GridProps> = ({ title }) => {
  return (
    <Box
      sx={{
        mt: 5,
        padding: "25px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderBottom: "2px solid #e7e7e7",
      }}
    >
      {" "}
      <Checkbox sx={{ padding: "5px" }} />
      <Box sx={{ ml: 3 }}>
        <Typography variant="subtitle1" sx={{ color: "black" }}>
          {title}
        </Typography>
        <Box
          sx={{
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "#E0E0E0",
            display: "inline-block",
            mt: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: "black" }}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

type GridProps = {
  color?: string;
  title?: string;
};

const IconBox: React.FC<GridProps> = ({ color, title }) => {
  return (
    <Grid
      size={6}
      sx={{
        padding: "30px",
        // border: "1px solid black",
        borderRadius: "10px",
        backgroundColor: color || "#E0E0E0",
      }}
    >
      <FavoriteIcon sx={{ color: color || "yellow", marginRight: "10px" }} />

      <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
        {title}
      </Typography>
    </Grid>
  );
};

export default Home;
