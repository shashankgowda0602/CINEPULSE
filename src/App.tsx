import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieRow } from './components/MovieRow';
import { Top10Row } from './components/Top10Row';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SearchPage } from './components/SearchPage';
import { MyListView } from './components/MyListView';
import { CategoriesView } from './components/CategoriesView';
import { AuthModal } from './components/AuthModal';
import { ProfileSelectorModal } from './components/ProfileSelectorModal';
import { Footer } from './components/Footer';
import { MOVIES_DATABASE } from './data/movies';

const MainContent: React.FC = () => {
  const { activeTab, searchQuery, setActiveTab, setSelectedGenre } = useApp();

  // Filter lists for different rows
  const heroMovie = MOVIES_DATABASE.find((m) => m.featured) || MOVIES_DATABASE[0];
  const tvHeroMovie = MOVIES_DATABASE.find((m) => m.id === 'silicon-shadows') || MOVIES_DATABASE[5];
  const movieHeroMovie = MOVIES_DATABASE.find((m) => m.id === 'night-falls') || MOVIES_DATABASE[1];

  const trendingNow = MOVIES_DATABASE.filter((m) => m.isTrending);
  const top10 = MOVIES_DATABASE.filter((m) => m.isTop10);
  const sciFiMovies = MOVIES_DATABASE.filter((m) => m.genres.includes('Sci-Fi'));
  const actionMovies = MOVIES_DATABASE.filter((m) => m.genres.includes('Action'));
  const tvSeries = MOVIES_DATABASE.filter((m) => m.mediaType === 'tv');
  const dramaMovies = MOVIES_DATABASE.filter((m) => m.genres.includes('Drama'));
  const crimeMystery = MOVIES_DATABASE.filter(
    (m) => m.genres.includes('Crime') || m.genres.includes('Mystery')
  );

  // If user searched for something, always show SearchPage
  if (searchQuery.trim().length > 0) {
    return <SearchPage />;
  }

  if (activeTab === 'mylist') {
    return <MyListView />;
  }

  if (activeTab === 'categories') {
    return <CategoriesView />;
  }

  if (activeTab === 'movies') {
    return (
      <div className="space-y-6">
        <HeroBanner movie={movieHeroMovie} />
        <div className="-mt-16 sm:-mt-24 relative z-20 space-y-6 pb-12">
          <MovieRow
            title="Trending Feature Films"
            movies={MOVIES_DATABASE.filter((m) => m.mediaType === 'movie' && m.isTrending)}
            onExploreMore={() => {
              setSelectedGenre('Action');
              setActiveTab('categories');
            }}
          />
          <Top10Row title="Top 10 Movies Today" movies={top10.filter((m) => m.mediaType === 'movie')} />
          <MovieRow
            title="High-Octane Action Blockbusters"
            movies={actionMovies.filter((m) => m.mediaType === 'movie')}
            onExploreMore={() => {
              setSelectedGenre('Action');
              setActiveTab('categories');
            }}
          />
          <MovieRow
            title="Sci-Fi & Cybernetic Thrillers"
            movies={sciFiMovies.filter((m) => m.mediaType === 'movie')}
            onExploreMore={() => {
              setSelectedGenre('Sci-Fi');
              setActiveTab('categories');
            }}
          />
          <MovieRow
            title="Award-Winning Gripping Dramas"
            movies={dramaMovies.filter((m) => m.mediaType === 'movie')}
            onExploreMore={() => {
              setSelectedGenre('Drama');
              setActiveTab('categories');
            }}
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'tv') {
    return (
      <div className="space-y-6">
        <HeroBanner movie={tvHeroMovie} />
        <div className="-mt-16 sm:-mt-24 relative z-20 space-y-6 pb-12">
          <MovieRow
            title="Popular TV Dramas & Sagas"
            movies={tvSeries}
            onExploreMore={() => {
              setSelectedGenre('TV Shows');
              setActiveTab('categories');
            }}
          />
          <Top10Row title="Top 10 Shows Today" movies={top10.filter((m) => m.mediaType === 'tv')} />
          <MovieRow
            title="Binge-Worthy Crime & Nordic Noir"
            movies={tvSeries.filter((m) => m.genres.includes('Crime') || m.genres.includes('Mystery'))}
          />
          <MovieRow
            title="Documentary & Nature Series"
            movies={MOVIES_DATABASE.filter((m) => m.genres.includes('Documentary'))}
          />
        </div>
      </div>
    );
  }

  // Default 'home' view
  return (
    <div className="space-y-6">
      {/* Marquee Featured Hero Banner */}
      <HeroBanner movie={heroMovie} />

      {/* Overlapping Content Rows */}
      <div className="-mt-16 sm:-mt-24 relative z-20 space-y-6 pb-12">
        {/* Top 10 Today Row with Large Outline Digits */}
        <Top10Row title="Top 10 Today on CinePulse" movies={top10} />

        {/* Trending Now */}
        <MovieRow
          title="Trending Now"
          subtitle="Updated Hourly"
          movies={trendingNow}
          onExploreMore={() => setActiveTab('categories')}
        />

        {/* Sci-Fi & Cosmic Odysseys */}
        <MovieRow
          title="Sci-Fi & Cosmic Odysseys"
          movies={sciFiMovies}
          onExploreMore={() => {
            setSelectedGenre('Sci-Fi');
            setActiveTab('categories');
          }}
        />

        {/* Action & Blockbusters */}
        <MovieRow
          title="Action & High-Octane Thrillers"
          movies={actionMovies}
          onExploreMore={() => {
            setSelectedGenre('Action');
            setActiveTab('categories');
          }}
        />

        {/* Popular TV Series */}
        <MovieRow
          title="Critically Acclaimed TV Series"
          movies={tvSeries}
          onExploreMore={() => setActiveTab('tv')}
        />

        {/* Crime & Noir */}
        <MovieRow
          title="Crime, Mystery & Dark Noir"
          movies={crimeMystery}
          onExploreMore={() => {
            setSelectedGenre('Crime');
            setActiveTab('categories');
          }}
        />

        {/* Award-Winning Dramas */}
        <MovieRow
          title="Award-Winning Dramas"
          movies={dramaMovies}
          onExploreMore={() => {
            setSelectedGenre('Drama');
            setActiveTab('categories');
          }}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0b0c10] text-neutral-100 flex flex-col font-sans selection:bg-[#e50914] selection:text-white">
        {/* Header Navigation */}
        <Navbar />

        {/* Main View Router */}
        <main className="flex-1">
          <MainContent />
        </main>

        {/* Interactive Modals */}
        <MovieDetailsModal />
        <VideoPlayerModal />
        <AuthModal />
        <ProfileSelectorModal />

        {/* Global Cinematic Footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}
