import axios from 'axios';

const fetchStudents = async (token) => {
  try{
  const response = await axios.get("/api/allstudents", {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (response.status === 200) {
    return {
      status: true,
      message: "All Students Data Fetched successfully",
      data: response.data,
    };
  } else {
    return {
      status: false,
      message: "Failed to fetch All Students data",
    };
  }
} catch (error) {
  return {
    status: false,
    message: "Error fetch All Students",
    error: error.response?.data.message || error.message,
  };
}
};

const fetchStudentById = async (id, studentId, token) => {
  try {
    const response = await axios.get(`/api/student/${id}` + studentId, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    if (response.status === 200) {
      return {
        status: true,
        message: "Fetched Student successfully",
        data: response.data,
      };
    } else {
      return {
        status: false,
        message: "Failed to fetch Student",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error Fetching Student",
      error: error.response?.data.message || error.message,
    };
  }
};

const addStudent = async (studentData, token) => {
  try {
  const response = await axios.post("/api/newstudent", studentData, {
    headers: { Authorization: `Bearer ${token}` }
  });

      if (response.status === 200) {
      return {
        status: true,
        message: "Student Data successfully posted",
        data: response.data,
      };
    } else {
      return {
        status: false,
        message: "Failed to post Student data",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error posting Student",
      error: error.response?.data.message || error.message,
    };
  }
};

const updateStudent = async (id, studentData, token) => {
  try{
  const response = await axios.put(`/api/student/${id}`, studentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
 
  if (response.status === 200) {
    return {
      status: true,
      message: "Student Data Updated successfully",
      data: response.data,
    };
  } else {
    return {
      status: false,
      message: "Failed to update Student data",
    };
  }
} catch (error) {
  return {
    status: false,
    message: "Error updating Student",
    error: error.response?.data.message || error.message,
  };
}
};

const deleteStudent = async (id, token) => {
  try{
  const response = await axios.delete(`/api/student/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
 
  if (response.status === 200) {
    return {
      status: true,
      message: "Student Data Deleted successfully",
      data: response.data,
    };
  } else {
    return {
      status: false,
      message: "Failed to delete Student data",
    };
  }
} catch (error) {
  return {
    status: false,
    message: "Error deleting Student",
    error: error.response?.data.message || error.message,
  };
}
};

export const StudentService = {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  fetchStudentById
};
