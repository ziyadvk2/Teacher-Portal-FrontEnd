import React, { useEffect } from "react";
import StudentTable from "./StudentTable";
import NewStudent from "./NewStudent";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
  const { status } = useSelector((state) => state.userReducer);

  useEffect(()=>{
    if (status === 'succeededLogin') {
      alert('Login Successful');
    }
  },[]);

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
