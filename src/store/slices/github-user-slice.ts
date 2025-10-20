import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../api-config";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubUserState {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: GitHubUserState = {
  user: null,
  loading: false,
  error: null,
  lastFetched: null,
};
 

export const fetchGitHubUser = createAsyncThunk(
  "githubUser/fetchUser",
  async (username: string, { rejectWithValue }) => {
    if (!username.trim()) {
      return rejectWithValue("Nome de usuário não pode estar vazio");
    }

    try {
      const response = await fetch(
        `${BASE_URL}/users/${username.trim()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue("Usuário não encontrado");
        }
        return rejectWithValue(`Erro ao buscar usuário: ${response.status}`);
      }

      const data: GitHubUser = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(`Erro ao buscar usuário: ${error.message}`);
      }
      return rejectWithValue("Erro desconhecido ao buscar usuário");
    }
  }
);

const githubUserSlice = createSlice({
  name: "githubUser",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.lastFetched = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGitHubUser.fulfilled, (state, action: PayloadAction<GitHubUser>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchGitHubUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser, clearError } = githubUserSlice.actions;
export default githubUserSlice.reducer;