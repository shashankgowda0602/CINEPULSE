import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, User, UserProfile } from '../types/movie';
import { MOVIES_DATABASE } from '../data/movies';

export type NavTab = 'home' | 'movies' | 'tv' | 'mylist' | 'categories';

const DEFAULT_PROFILES: UserProfile[] = [
  { id: 'p1', name: 'Alex', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { id: 'p2', name: 'Sam', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { id: 'p3', name: 'Kids Room', avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80', isKids: true },
  { id: 'p4', name: 'Guest', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' },
];

const DEFAULT_USER: User = {
  id: 'usr_cine_01',
  email: 'alex.thorne@cinepulse.io',
  name: 'Alex Thorne',
  profiles: DEFAULT_PROFILES,
  currentProfileId: 'p1',
};

interface AppContextType {
  user: User | null;
  currentProfile: UserProfile;
  profiles: UserProfile[];
  switchProfile: (profileId: string) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;

  myList: string[];
  toggleMyList: (movieId: string) => void;
  isInMyList: (movieId: string) => boolean;

  likedMovies: string[];
  toggleLike: (movieId: string) => void;
  isLiked: (movieId: string) => boolean;

  activeMovie: Movie | null;
  openMovieDetails: (movie: Movie) => void;
  closeMovieDetails: () => void;

  playingMovie: Movie | null;
  startPlaying: (movie: Movie) => void;
  stopPlaying: () => void;

  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'signin' | 'signup';
  setAuthMode: (mode: 'signin' | 'signup') => void;

  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cinepulse_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [profiles] = useState<UserProfile[]>(DEFAULT_PROFILES);
  const [currentProfileId, setCurrentProfileId] = useState<string>(() => {
    return localStorage.getItem('cinepulse_profile_id') || 'p1';
  });

  const [myList, setMyList] = useState<string[]>(() => {
    const saved = localStorage.getItem('cinepulse_mylist');
    return saved ? JSON.parse(saved) : ['aura-eclipse', 'silicon-shadows', 'chromasync-rebel'];
  });

  const [likedMovies, setLikedMovies] = useState<string[]>(() => {
    const saved = localStorage.getItem('cinepulse_likes');
    return saved ? JSON.parse(saved) : ['aura-eclipse', 'night-falls'];
  });

  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('cinepulse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cinepulse_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cinepulse_profile_id', currentProfileId);
  }, [currentProfileId]);

  useEffect(() => {
    localStorage.setItem('cinepulse_mylist', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem('cinepulse_likes', JSON.stringify(likedMovies));
  }, [likedMovies]);

  const currentProfile = profiles.find((p) => p.id === currentProfileId) || profiles[0];

  const switchProfile = (profileId: string) => {
    setCurrentProfileId(profileId);
    setIsProfileModalOpen(false);
  };

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      profiles: DEFAULT_PROFILES,
      currentProfileId: 'p1',
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleMyList = (movieId: string) => {
    setMyList((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const isInMyList = (movieId: string) => myList.includes(movieId);

  const toggleLike = (movieId: string) => {
    setLikedMovies((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const isLiked = (movieId: string) => likedMovies.includes(movieId);

  const openMovieDetails = (movie: Movie) => {
    setActiveMovie(movie);
  };

  const closeMovieDetails = () => {
    setActiveMovie(null);
  };

  const startPlaying = (movie: Movie) => {
    setPlayingMovie(movie);
  };

  const stopPlaying = () => {
    setPlayingMovie(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentProfile,
        profiles,
        switchProfile,
        login,
        logout,
        myList,
        toggleMyList,
        isInMyList,
        likedMovies,
        toggleLike,
        isLiked,
        activeMovie,
        openMovieDetails,
        closeMovieDetails,
        playingMovie,
        startPlaying,
        stopPlaying,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isProfileModalOpen,
        setIsProfileModalOpen,
        selectedGenre,
        setSelectedGenre,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
