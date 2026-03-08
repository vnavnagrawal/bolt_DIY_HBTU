import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer_id: string;
  created_at: string;
}

interface EventsPageProps {
  session: Session | null;
}

const EventsPage: React.FC<EventsPageProps> = ({ session }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });
  const [registrationMessage, setRegistrationMessage] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err: any) {
      setError('Failed to fetch events: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError('You must be logged in to create an event.');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...newEvent,
          organizer_id: session.user.id,
        })
        .select();

      if (error) throw error;
      setEvents([...events, data[0]]);
      setNewEvent({ title: '', description: '', date: '', time: '', location: '' });
      setShowCreateForm(false);
    } catch (err: any) {
      setError('Failed to create event: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterForEvent = async (eventId: string) => {
    if (!session) {
      setRegistrationMessage(prev => ({ ...prev, [eventId]: 'Please log in to register for events.' }));
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('event_registrations')
        .insert({ event_id: eventId, user_id: session.user.id });

      if (error) {
        if (error.code === '23505') { // Unique violation code
          setRegistrationMessage(prev => ({ ...prev, [eventId]: 'You are already registered for this event.' }));
        } else {
          throw error;
        }
      } else {
        setRegistrationMessage(prev => ({ ...prev, [eventId]: 'Successfully registered!' }));
      }
    } catch (err: any) {
      setRegistrationMessage(prev => ({ ...prev, [eventId]: 'Failed to register: ' + err.message }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>

      {session && (
        <button onClick={() => setShowCreateForm(!showCreateForm)} style={{ marginBottom: '1.5rem' }}>
          {showCreateForm ? 'Hide Event Form' : 'Create New Event'}
        </button>
      )}

      {showCreateForm && session && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Create New Event</h3>
          <form onSubmit={handleCreateEvent}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Add Event'}
            </button>
          </form>
        </div>
      )}

      {events.length === 0 ? (
        <p>No upcoming events found. Check back soon!</p>
      ) : (
        <div className="card-grid">
          {events.map((event) => (
            <div key={event.id} className="card" style={{ textAlign: 'left' }}>
              <h3>{event.title}</h3>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555' }}>
                <Calendar size={16} /> {new Date(event.date).toLocaleDateString()}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555' }}>
                <Clock size={16} /> {event.time}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555' }}>
                <MapPin size={16} /> {event.location}
              </p>
              <p>{event.description}</p>
              {session ? (
                <>
                  <button onClick={() => handleRegisterForEvent(event.id)} disabled={loading}>
                    {loading ? 'Registering...' : 'Register Now'}
                  </button>
                  {registrationMessage[event.id] && (
                    <p className="error-message" style={{ color: registrationMessage[event.id].includes('Successfully') ? 'green' : 'red', marginTop: '0.5rem' }}>
                      {registrationMessage[event.id]}
                    </p>
                  )}
                </>
              ) : (
                <p style={{ color: '#888', fontSize: '0.9em' }}>Login to register for this event.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
