import axios from "axios";

const fetchUser = async (accessToken) => {
  try {
    let userResponse = await axios.post("/api/current_user",null,{
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
      });
   
    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `user Data Fetched`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `user Data not Found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `user Data not Found`,
      error: error.response?.data.message || error.message,
    };
  }
};

const postUserData = async (userData) => {
  try {
    let userResponse = await axios.post("/api/register", userData);
    console.log("userData",userData);
    if (userResponse?.status === 201) {
      return {
        status: true,
        message: `User data successfully posted`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `Failed to post user data`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Error posting user data`,
      error: error.response?.data.message || error.message,
    };
  }
};

const loginUser = async (loginData) => {
  try {
    const response = await axios.post("/api/login", loginData);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    if (response.status === 200) {
      return {
        status: true,
        message: "Login successful",
        data: response.data,
      };
    } else {
      return {
        status: false,
        message: "Failed to login",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error logging in",
      error: error.response?.data.message || error.message,
    };
  }
};

const logout = async (accessToken) => {
  // const accessToken = localStorage.getItem('accessToken');
  await axios.post('/api/logout', null,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
    });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};


export const userService =  {fetchUser,postUserData,loginUser,logout};
