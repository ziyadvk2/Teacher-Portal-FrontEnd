import { Fragment, React, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createStudent } from "../Redux/reducers/studentReducer";

export default function NewStudent() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subjectName: "",
    mark: null,
  });
  const { name, subjectName, mark } = formData;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    console.log(JSON.stringify(formData));
    dispatch(createStudent(formData));
  };
  return (
    <Fragment>
      <Button
        sx={{ mt: 1, backgroundColor: "black", color: "white" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add New Student
      </Button>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Add New Sudent Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Student Details with Name, Subject Name, Mark.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              mt: 2,
              minWidth: 120,
              maxWidth: "100%",
              width: "fit-content",
            }}
          >
            <TextField
              sx={{ mt: 1 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Student Name"
            />
            <TextField
              sx={{ mt: 1 }}
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
              sx={{ mt: 1 }}
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
              Add Student
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
