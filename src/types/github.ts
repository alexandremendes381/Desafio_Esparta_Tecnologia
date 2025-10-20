
export interface GitHubUser {
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
  type: string;
}

export interface GitHubUserState {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

export interface FavoritesState {
  favorites: GitHubUser[];
  loading: boolean;
}

export interface UseFavoritesReturn {
  favorites: GitHubUser[];
  addFavorite: (user: GitHubUser) => void;
  removeFavorite: (userId: number) => void;
  isFavorite: (userId: number) => boolean;
  toggleFavorite: (user: GitHubUser) => void;
}

export interface UseGitHubUserReturn {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  searchUser: (username: string) => Promise<void>;
  searchUserIfNeeded: (username: string) => Promise<void>;
  clearUser: () => void;
}