import React, { useEffect } from "react";
import StudentTable from "./StudentTable";
import NewStudent from "./NewStudent";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
  const { status } = useSelector((state) => state.userReducer);


  return (
    <>
    {status === 'succeededLogin' && <h5 style={{marginTop:2,marginBottom:2,color:"#46B980"}}>SuccessFully Logged In</h5>}
      <StudentTable />
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <NewStudent />
      </Box>
    </>
  );
};

export default Home;
