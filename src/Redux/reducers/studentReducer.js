import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentService } from "../../services";

const initialState = {
  students: [],
  student: null,
  loading: false,
  error: null,
};

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().userReducer.accessToken;
      const students = await StudentService.fetchStudents(token);
      return students.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getStudentById = createAsyncThunk(
  "students/getStudentById",
  async (studentId, { getState, rejectWithValue }) => {
    try {
        const token = getState().userReducer.accessToken;
      const student = await StudentService.fetchStudentById(studentId, token);
      return student;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (studentData, { getState, rejectWithValue }) => {
    try {
      const token = getState().userReducer.accessToken;
      const newStudent = await StudentService.addStudent(studentData, token);
      return newStudent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudentById = createAsyncThunk(
  "students/updateStudentById",
  async ({ id, studentData }, { getState, rejectWithValue }) => {
    try {
        const token = getState().userReducer.accessToken;
      const updatedStudent = await StudentService.updateStudent(id, studentData, token);
      return updatedStudent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudentById = createAsyncThunk(
  "students/deleteStudentById",
  async (id, { getState, rejectWithValue }) => {
    try {
        const token = getState().userReducer.accessToken;
      await StudentService.deleteStudent(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getStudents.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      builder.addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      builder.addCase(getStudentById.fulfilled, (state, action) => {
        state.student = action.payload;
      })
      builder.addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      builder.addCase(updateStudentById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex((student) => student._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      builder.addCase(deleteStudentById.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student._id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
