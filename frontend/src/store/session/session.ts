import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginUser {
  email: string
  password: string
}

// Thunk to handle user signup
export const signup = createAsyncThunk('session/signup', async (user, thunkAPI) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data.user;
  } catch (error) {
    throw error;
  }
});

// Thunk to handle user login
export const login = createAsyncThunk('session/login', async (user: LoginUser, thunkAPI) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      const error = await response.json();
      throw error;
    }
  } catch (error) {
    throw error;
  }
});

// Thunk to handle user logout
export const logout = createAsyncThunk('session/logout', async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/auth/logout");
    if (response.ok) {
      return null;
    } else {
      const error = await response.json();
      throw error;
    }
  } catch (error) {
    throw error;
  }
});

// Thunk to restore user session
export const restoreUser = createAsyncThunk('session/restoreUser', async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/auth/restore");

    if (response.ok) {
      const data = await response.json();
      console.log("USER", data.user)
      return data.isLoggedIn ? data.user : null;
    } else {
      const error = await response.json();
      throw error;
    }
  } catch (error) {
    throw error;
  }
});

// Create a slice for the session state
const sessionSlice = createSlice({
  name: 'session',
  initialState: { user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});


export default sessionSlice.reducer;
