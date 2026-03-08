import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import NewslettersPage from './pages/NewslettersPage';
import PollsPage from './pages/PollsPage';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Header session={session} />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={session ? <ProfilePage session={session} /> : <AuthPage />} />
          <Route path="/events" element={<EventsPage session={session} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/newsletters" element={<NewslettersPage />} />
          <Route path="/polls" element={<PollsPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
