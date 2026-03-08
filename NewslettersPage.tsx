import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

interface ProfilePageProps {
  session: Session;
}

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  updated_at?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const { user } = session;

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      setMessage('Error loading user profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    fullName,
    website,
    avatarUrl,
  }: {
    fullName: string | null;
    website: string | null;
    avatarUrl: string | null;
  }) {
    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user.id,
        full_name: fullName,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage('Error updating the profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          updateProfile({ fullName, website, avatarUrl });
        }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={session.user.email} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName || ''}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatarUrl">Avatar URL</label>
            <input
              id="avatarUrl"
              type="url"
              value={avatarUrl || ''}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
          {message && <p className="error-message" style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
