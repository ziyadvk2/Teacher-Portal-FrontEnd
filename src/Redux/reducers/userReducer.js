import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services";

const initialState = {
  loading: false,
  registerError: null,
  loginError: null,
  currentUserError: null,
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  status:'idle',
};


export const postUserData = createAsyncThunk(
  "userReducer/postUserData",
  async (postData, { rejectWithValue }) => {
    try {
      const userResponse = await userService.postUserData(postData);
      if (userResponse.status) {
      return {
        userData: userResponse.data ? userResponse.data : null,
      };
    }else{
      return rejectWithValue(userResponse.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "userReducer/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const userResponse = await userService.loginUser(loginData);
      if (userResponse.status) {
        const accessToken = userResponse.data.accessToken;
        const userData = userResponse.data.user;
        return {
          userData: userData ? userData : null,
          accessToken: userData ? accessToken : null,
        };
      } else {
        return rejectWithValue(userResponse.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "userReducer/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().userReducer.accessToken;
      const userResponse = await userService.fetchUser(accessToken);
      if (userResponse.status) {
      return {
        userData: userResponse.data ? userResponse.data.user : null,
      };
    }else{
      return rejectWithValue(userResponse.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
   
    builder.addCase(postUserData.pending, (state) => {
      state.loading = true;
      state.status = 'loading';
      state.registerError = null;
    });
    builder.addCase(postUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.status = 'succeededRegistration';
      if (action.payload.userData !== null) {
        state.user = action.payload.userData;
      } else {
        state.user = false;
      }
    });
    builder.addCase(postUserData.rejected, (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.registerError = action.payload || action.error.message;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.status = 'loading';
      state.loginError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = 'succeededLogin';
      state.user = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.loginError = action.payload || action.error.message;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.currentUserError = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.userData;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.currentUserError = action.payload || action.error.message;
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    });

  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
