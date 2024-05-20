import { Fragment, React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteStudentById } from "../Redux/reducers/studentReducer";

export default function DeleteAlert(props) {
  const [open, setOpen] = useState(false);
  console.log(props.id);
  const dispatch = useDispatch();

  const handleAlertBox = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    dispatch(deleteStudentById(props.id));
  };

  return (
    <Fragment>
      <Button
        sx={[
          { border: "none", color: "black" },
          {
            "&:hover": {
              textDecoration: "none",
              border: "none",
              color: "black",
            },
          },
        ]}
        onClick={() => handleAlertBox()}
      >
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleAlertBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you wanted to delete the Student Details?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertBox}>cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
