import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h2>Welcome to the Alumni Association Portal!</h2>
      <p>Connecting our alumni, fostering community, and celebrating shared memories.</p>

      <div className="card-grid">
        <div className="card">
          <h3>Stay Connected</h3>
          <p>Update your profile, find old friends, and expand your professional network. Our portal makes it easy to keep in touch with your fellow alumni.</p>
          <Link to="/profile" className="button">Update Profile</Link>
        </div>

        <div className="card">
          <h3>Upcoming Events</h3>
          <p>Discover and register for exciting alumni events, reunions, workshops, and webinars. Don't miss out on opportunities to reconnect and learn.</p>
          <Link to="/events" className="button">View Events</Link>
        </div>

        <div className="card">
          <h3>Photo Gallery</h3>
          <p>Relive cherished moments from past events and campus life. Browse through our extensive photo and video gallery.</p>
          <Link to="/gallery" className="button">Explore Gallery</Link>
        </div>

        <div className="card">
          <h3>Newsletters & Updates</h3>
          <p>Stay informed with the latest news, achievements, and initiatives from the association and our alumni community.</p>
          <Link to="/newsletters" className="button">Read Newsletters</Link>
        </div>
      </div>

      <p style={{ marginTop: '2rem' }}>
        Not a member yet? <Link to="/auth">Join our community today!</Link>
      </p>
    </div>
  );
};

export default HomePage;
