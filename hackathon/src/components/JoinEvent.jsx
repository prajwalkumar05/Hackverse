import { useState, useEffect } from "react";
import { Calendar, QrCode, Users, MapPin, Phone, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JoinEvent = () => {
  const navigate = useNavigate();
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [registrationForm, setRegistrationForm] = useState({ name: '', email: '', phoneNumber: '' });
  const [registrations, setRegistrations] = useState({});
  
  const [events, setEvents] = useState([
    {
      id: "YOGA123",
      title: "Yoga and Meditation",
      type: "Wellness, Group",
      date: "Fri, 15 Mar | 08:00 AM",
      venueName: "Central Park",
      cityState: "Downtown, NY",
      mapsLink: "https://maps.google.com/?q=Central+Park+NY",
      maxParticipants: 30,
      ticketType: "Free",
      phoneNumber: "+1 234-567-8900"
    }
  ]);

  useEffect(() => {
    const initialRegistrations = events.reduce((acc, event) => {
      acc[event.id] = [];
      return acc;
    }, {});
    setRegistrations(initialRegistrations);
  }, []);

  const handleOpenRegistration = (eventId) => {
    setCurrentEventId(eventId);
    setShowRegistrationPopup(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistrationPopup(false);
    setRegistrationForm({ name: '', email: '', phoneNumber: '' });
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if (currentEventId) {
      setRegistrations(prev => ({
        ...prev,
        [currentEventId]: [...prev[currentEventId], { ...registrationForm }]
      }));
      setUserEmail(registrationForm.email);
      handleCloseRegistration();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Available Events</h1>
        <button onClick={() => navigate("/events")} className="text-blue-600 hover:text-blue-800">
          Back
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow">
            <div className="flex border-b border-gray-200">
              <div className="w-12 bg-blue-900 flex items-center justify-center">
                <Calendar className="text-white h-6 w-6" />
              </div>
              <div className="p-4 w-full">
                <h2 className="font-bold text-lg">{event.title}</h2>
                <p className="text-gray-600 text-sm">{event.type}</p>
                <p className="text-gray-700 text-sm mt-1">{event.date}</p>
                <p className="text-gray-600 text-sm">{event.venueName}, {event.cityState}</p>
              </div>
            </div>

            <div className="p-4 flex justify-center">
              <QrCode className="h-24 w-24" />
            </div>

            <div className="px-4 pb-2">
              <button onClick={() => handleOpenRegistration(event.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>

      {showRegistrationPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Register for Event</h2>
              <button onClick={handleCloseRegistration} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRegistration} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" required className="w-full p-2 border rounded-md" 
                onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})} />
              <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded-md" 
                onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})} />
              <input type="tel" name="phoneNumber" placeholder="Phone Number" required className="w-full p-2 border rounded-md"
                onChange={(e) => setRegistrationForm({...registrationForm, phoneNumber: e.target.value})} />
              <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Join Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinEvent;
