import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface FavoritesState {
  favorites: GitHubUser[];
  loading: boolean;
}

const FAVORITES_STORAGE_KEY = "github-users-favorites";

const loadFavoritesFromStorage = (): GitHubUser[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: GitHubUser[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Erro ao salvar favoritos:', error);
  }
};

const initialState: FavoritesState = {
  favorites: loadFavoritesFromStorage(),
  loading: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<GitHubUser>) => {
      const user = action.payload;
      
      if (state.favorites.some(fav => fav.id === user.id)) {
        return;
      }
      
      state.favorites.push(user);
      saveFavoritesToStorage(state.favorites);
    },
    
    removeFavorite: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.favorites = state.favorites.filter(fav => fav.id !== userId);
      saveFavoritesToStorage(state.favorites);
    },
    
    loadFavorites: (state) => {
      state.favorites = loadFavoritesFromStorage();
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;