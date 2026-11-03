export type MediaType = 'movie' | 'tv';

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  duration: string;
  overview: string;
  thumbnail: string;
}

export interface Movie {
  id: string;
  title: string;
  overview: string;
  backdropUrl: string;
  posterUrl: string;
  mediaType: MediaType;
  releaseYear: number;
  matchScore: number; // e.g. 98 for "98% Match"
  maturityRating: 'G' | 'PG' | 'PG-13' | 'TV-14' | 'TV-MA' | 'R' | '16+' | '18+';
  duration?: string; // e.g. "2h 18m"
  seasonsCount?: number; // e.g. 3
  quality: 'HD' | '4K UHD' | 'IMAX Enhanced';
  audioFeatures: string[]; // e.g. ['5.1 Surround', 'Dolby Atmos', 'Spatial Audio']
  genres: string[];
  director: string;
  cast: string[];
  isOriginal?: boolean;
  isTrending?: boolean;
  isTop10?: boolean;
  top10Rank?: number;
  featured?: boolean;
  episodes?: Episode[];
  tagline?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  isKids?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profiles: UserProfile[];
  currentProfileId: string;
}
