import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Image as ImageIcon, Youtube } from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  created_at: string;
}

const GalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (err: any) {
      setError('Failed to fetch gallery items: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="gallery-page">
      <h2>Our Photo & Video Gallery</h2>
      <p>Relive the memories from our past events and gatherings.</p>

      {galleryItems.length === 0 ? (
        <p>No gallery items found yet. Check back soon!</p>
      ) : (
        <div className="card-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.caption}
                  style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                />
              ) : (
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, marginBottom: '1rem' }}>
                  <iframe
                    src={item.url.replace("watch?v=", "embed/")} // Convert YouTube watch URL to embed URL
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.caption}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
                  ></iframe>
                </div>
              )}
              <p style={{ fontSize: '0.9em', color: '#555' }}>{item.caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
