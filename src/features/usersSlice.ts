import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { users: UsersState };

    const FIVE_MIN = 5 * 60 * 1000;
    if (state.users.lastFetched && Date.now() - state.users.lastFetched < FIVE_MIN) {
      return rejectWithValue("cached");
    }

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      return rejectWithValue(errorMessage);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.lastFetched = Date.now();
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        if (action.payload === "cached") {
          state.loading = false;
        } else {
          state.loading = false;
          state.error = action.payload as string;
        }
      });
  },
});

export default usersSlice.reducer;
