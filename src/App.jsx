import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import SearchOverlay from './components/SearchOverlay';

import ProfileSelection from './pages/ProfileSelection';
import Home from './pages/Home';
import Memories from './pages/Memories';
import MemoryDetail from './pages/MemoryDetail';
import Timeline from './pages/Timeline';
import Favorites from './pages/Favorites';
import Secret from './pages/Secret';

function AppContent() {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] relative font-sans selection:bg-red-600/30 selection:text-red-200">
      {/* Global Navbar (Hidden on Profile Selection screen for maximum cinema immersion) */}
      {!isProfilePage && <Navbar />}

      {/* Global Search Modal */}
      <SearchOverlay />

      {/* Global Ambient Romantic Audio Player */}
      <MusicPlayer />

      {/* Main View Routes */}
      <Routes>
        <Route path="/profile" element={<ProfileSelection />} />
        <Route path="/" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/memory/:slug" element={<MemoryDetail />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
