import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GitHubUser, GitHubUserState } from "@/types";

const initialState: GitHubUserState = {
  user: null,
  loading: false,
  error: null,
  lastFetched: null,
};
 

export const fetchGitHubUser = createAsyncThunk(
  "githubUser/fetchUser",
  async (username: string, { rejectWithValue, getState }) => {
    if (!username.trim()) {
      return rejectWithValue("Nome de usuário não pode estar vazio");
    }

    // Verificar cache antes de fazer a requisição
    const state = getState() as { githubUser: GitHubUserState };
    const { user, lastFetched } = state.githubUser;
    
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos
    const now = Date.now();
    
    // Se o usuário é o mesmo e o cache ainda é válido, retornar dados cached
    if (
      user && 
      user.login.toLowerCase() === username.trim().toLowerCase() && 
      lastFetched && 
      (now - lastFetched) < CACHE_DURATION
    ) {
      return user;
    }

    try {
      const response = await fetch(
        `/api/github/users/${username.trim()}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || `Erro ao buscar usuário: ${response.status}`);
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
    updateLastFetched: (state) => {
      state.lastFetched = Date.now();
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

export const { clearUser, clearError, updateLastFetched } = githubUserSlice.actions;
export default githubUserSlice.reducer;