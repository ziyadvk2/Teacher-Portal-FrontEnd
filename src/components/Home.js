import React from "react";
import StudentTable from "./StudentTable";
import NewStudent from "./NewStudent";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <StudentTable />
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <NewStudent />
      </Box>
    </>
  );
};

export default Home;
