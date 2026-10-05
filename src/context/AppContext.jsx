import React, { createContext, useContext, useState, useEffect } from 'react';
import { profilesData } from '../data/profiles';
import { memoriesData } from '../data/memories';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Current Profile
  const [activeProfile, setActiveProfile] = useState(() => {
    const saved = localStorage.getItem('ourflix_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  // Partner's customized name (editable)
  const [partnerName, setPartnerName] = useState(() => {
    const saved = localStorage.getItem('ourflix_partner_name');
    if (!saved || saved === 'Sayang') return 'Nazra';
    return saved;
  });

  // Favorites / My List
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ourflix_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return memoriesData.filter(m => m.favorite).map(m => m.id);
  });

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Audio / Music Player state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Sync profile to localStorage
  const selectProfile = (profile) => {
    setActiveProfile(profile);
    if (profile) {
      localStorage.setItem('ourflix_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('ourflix_profile');
    }
  };

  // Toggle favorite
  const toggleFavorite = (memoryId) => {
    setFavorites(prev => {
      const next = prev.includes(memoryId)
        ? prev.filter(id => id !== memoryId)
        : [...prev, memoryId];
      localStorage.setItem('ourflix_favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (memoryId) => favorites.includes(memoryId);

  // Update partner name
  const updatePartnerName = (name) => {
    setPartnerName(name);
    localStorage.setItem('ourflix_partner_name', name);
  };

  // Keyboard shortcut (CMD/CTRL + K or / for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        profiles: profilesData.map(p => p.id === 'pacar' ? { ...p, name: partnerName } : p),
        activeProfile,
        selectProfile,
        partnerName,
        updatePartnerName,
        favorites,
        toggleFavorite,
        isFavorite,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isPlayingMusic,
        setIsPlayingMusic,
        isMuted,
        setIsMuted,
        currentTrackIndex,
        setCurrentTrackIndex
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
