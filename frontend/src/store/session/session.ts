import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginUser, IRegisterUser } from '../../pages/Login';

// Thunk to handle user signup
export const signup = createAsyncThunk('session/signup', async (user: IRegisterUser, thunkAPI) => {
  try {

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if(response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      const error = await response.json();
      console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
      return thunkAPI.rejectWithValue(error);
    }
  } catch (e: any) {
    console.error("There was an issue performing fetch to /api/session/signup")
    return thunkAPI.rejectWithValue(e.message)
  }
});

// Thunk to handle user login
export const login = createAsyncThunk('session/login', async (user: ILoginUser, thunkAPI) => {
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
      console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
      return thunkAPI.rejectWithValue(error);
    }
  } catch (e: any) {
    console.error("There was an issue performing fetch to /api/session/login")
    return thunkAPI.rejectWithValue(e.message)
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
      console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
      return thunkAPI.rejectWithValue(error);
    }
  } catch (e: any) {
    console.error("There was an issue performing fetch to /api/session/logout")
    return thunkAPI.rejectWithValue(e.message)
  }
});

// Thunk to restore user session
export const restoreUser = createAsyncThunk('session/restoreUser', async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/auth/restore");

    if (response.ok) {
      const data = await response.json();
      data.isLoggedIn ? console.log("USER: ", data.user) : console.log('No Signed In User');
      return data.isLoggedIn ? data.user : null;
    } else {
      const error = await response.json();
      console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
      return thunkAPI.rejectWithValue(error);
    }
  } catch (e: any) {
    console.error("There was an issue performing fetch to /api/session/restoreUser")
    return thunkAPI.rejectWithValue(e.message)
  }
});

// Create a slice for the session state
const sessionSlice = createSlice({
  name: 'session',
  initialState: { user: null, isLoaded: false },
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
        state.isLoaded = true
      });
  },
});


export default sessionSlice.reducer;
