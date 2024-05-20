import { Fragment, React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {  TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import {
  updateStudentById,
} from "../Redux/reducers/studentReducer";

export default function EditStudent({ studentId, initialData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subjectName: "",
    mark: null,
  });
  const { name, subjectName, mark } = formData;
  const dispatch = useDispatch();

  const handleBox = () => {
    setOpen(!open);
  };
useEffect(()=>{
  setFormData(initialData);
},[initialData])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    try {
      dispatch(updateStudentById({ id: studentId, studentData: formData }));
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Fragment>
      <Button sx={{ color: "black" }} onClick={handleBox}>
        <EditIcon />
      </Button>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleBox}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the Student Details with Name, Subject Name, Mark.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
              mt: 2,
               minWidth: 120, 
               maxWidth: "100%",
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          >
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter Student Name"
              />
              <TextField
                id="outlined-basic"
                label="Subject Name"
                variant="outlined"
                type="text"
                name="subjectName"
                value={subjectName}
                onChange={handleChange}
                placeholder="Enter Subject Name"
              />
              <TextField
                id="outlined-basic"
                label="Mark"
                variant="outlined"
                type="number"
                name="mark"
                value={mark}
                onChange={handleChange}
                placeholder="Enter Mark"
              />
              <Button
                type="submit"
                sx={{ mt: 1, backgroundColor: "black", color: "white" }}
                onClick={handleSubmit}
              >
                Edit Student
              </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBox}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
