import  React,{useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../Redux/reducers/studentReducer";
import DeleteAlert from "./DeleteAlert";
import EditStudent from "./EditStudent";

const columns = [
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  { id: "subjectName", label: "SubjectName", minWidth: 100, align: "center" },
  {
    id: "mark",
    label: "Mark",
    minWidth: 100,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

export default function StudentTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { students } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={student._id}
                  >
                    {columns.map((column) => {
                      const value = student[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "action" ? (
                            <>
                              <EditStudent
                                studentId={student._id}
                                initialData={student}
                              />
                              <DeleteAlert id={student._id} />
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
