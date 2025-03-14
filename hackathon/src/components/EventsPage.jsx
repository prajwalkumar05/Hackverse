import React, { useState, useEffect } from 'react';
import { Calendar, QrCode, Phone, Mail, X, ChevronDown, MapPin, Users, Link } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpeg';
// import p3 from '../assets/p3.jpeg';
// Main Events Page Component

const birthdayPeople = [
  {
    id: 1,
    name: "John Doe",
    age: 75,
    image: p1, // Replace with real image
    location: "Central Park, NY",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 82,
    image: p2, // Replace with real image
    location: "Downtown, CA",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 90,
    image: p2, // Replace with real image
    location: "Greenwood Village, TX",
  },
];
const EventsPage = () => {
  const navigate = useNavigate();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [activeView, setActiveView] = useState('main'); // 'main', 'join', 'create'
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [registrations, setRegistrations] = useState({});
  const [userEmail, setUserEmail] = useState(''); // To simulate the current user
  const [events, setEvents] = useState([
    {
      id: 'YOGA123',
      title: 'Yoga and Meditation',
      type: 'Wellness, Group',
      date: 'Fri, 15 Mar | 08:00 AM',
      venueName: 'Central Park',
      address: '123 Park Avenue',
      cityState: 'Downtown, NY',
      mapsLink: 'https://maps.google.com/?q=Central+Park+NY',
      maxParticipants: 30,
      ticketType: 'Free',
      price: 0,
      paymentLink: '',
      phoneNumber: '+1 234-567-8900'
    }
  ]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    date: '',
    venueName: '',
    address: '',
    cityState: '',
    mapsLink: '',
    maxParticipants: '',
    ticketType: 'Free',
    price: '',
    paymentLink: '',
    phoneNumber: ''
  });
  const [showParticipantsPopup, setShowParticipantsPopup] = useState(false);
  const [viewingEventId, setViewingEventId] = useState(null);

  // Initialize registrations state
  useEffect(() => {
    // Create an object with event IDs as keys and empty arrays as values
    const initialRegistrations = events.reduce((acc, event) => {
      acc[event.id] = [];
      return acc;
    }, {});
    setRegistrations(initialRegistrations);
  }, []);

  // Handle Create Event form submission
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const eventId = `EVT${Math.floor(1000 + Math.random() * 9000)}`;
    const createdEvent = {
      ...newEvent,
      id: eventId,
      price: newEvent.ticketType === 'Free' ? 0 : parseFloat(newEvent.price) || 0
    };
    setEvents([...events, createdEvent]);
    
    // Add new event to registrations state
    setRegistrations(prev => ({
      ...prev,
      [eventId]: []
    }));
    
    setNewEvent({
      title: '',
      type: '',
      date: '',
      venueName: '',
      address: '',
      cityState: '',
      mapsLink: '',
      maxParticipants: '',
      ticketType: 'Free',
      price: '',
      paymentLink: '',
      phoneNumber: ''
    });
    setActiveView('join');
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Handle registration form changes
  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: value
    });
  };

  // Open registration popup
  const handleOpenRegistration = (eventId) => {
    setCurrentEventId(eventId);
    setShowRegistrationPopup(true);
  };

  // Close registration popup
  const handleCloseRegistration = () => {
    setShowRegistrationPopup(false);
    setRegistrationForm({
      name: '',
      email: '',
      phoneNumber: ''
    });
  };

  // Submit registration
  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    
    if (currentEventId) {
      // Add registration to the event
      setRegistrations(prev => ({
        ...prev,
        [currentEventId]: [
          ...prev[currentEventId],
          { ...registrationForm, timestamp: new Date().toISOString() }
        ]
      }));
      
      // Save user email to simulate "current user"
      setUserEmail(registrationForm.email);
      
      // Close popup
      handleCloseRegistration();
    }
  };

  // Check if user is already registered for an event
  const isUserRegistered = (eventId) => {
    if (!userEmail || !registrations[eventId]) return false;
    
    return registrations[eventId].some(
      registration => registration.email.toLowerCase() === userEmail.toLowerCase()
    );
  };

  // Handle viewing participants
  const handleViewParticipants = (eventId) => {
    setViewingEventId(eventId);
    setShowParticipantsPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 mb-20">


<div className="w-full max-w-lg mx-auto mb-8 relative mt-5">
        <h2 className="text-center text-xl font-bold mb-2 text-gray-800">🎂 Celebrating Today!</h2>
        <Slider {...sliderSettings}>
          {birthdayPeople.map((person) => (
            <div key={person.id} className="relative rounded-lg overflow-hidden shadow-lg">
              <img src={person.image} alt={person.name} className="w-full h-64 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
                <h2 className="text-white text-xl font-semibold">{person.name}, {person.age}</h2>
                <p className="text-gray-300">🎂 Wish {person.name} a Happy {person.age}th Birthday! 🎊</p>
                <button
                  onClick={() => handleMakeWish(person.name, person.age)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                >
                  🎉 Make a Wish
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Main View with Buttons */}
      {activeView === 'main' && (
        <div className="flex flex-col items-center justify-center h-80">
          <h1 className="text-2xl font-bold mb-6">Events</h1>
          <div className="space-y-4 w-full max-w-xs">
            <button 
              onClick={() => setActiveView('join')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Join Event
            </button>
            <button 
              onClick={() => setActiveView('create')}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Create Event
            </button>
          </div>
        </div>
      )}

      {/* Join Event View */}
      {activeView === 'join' && (
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Available Events</h1>
            <button 
              onClick={() => setActiveView('main')}
              className="text-blue-600 hover:text-blue-800"
            >
              Back
            </button>
          </div>
          
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow">
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
                  <p className="text-right text-sm">{event.ticketType === 'Free' ? 'FREE' : `₹${event.price.toFixed(2)}`}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Max Participants: {event.maxParticipants}</p>
                    <p className="text-sm font-medium">
                      Registered: {registrations[event.id] ? registrations[event.id].length : 0}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm text-center">{event.venueName}, {event.address}, {event.cityState}</p>
                  <p className="text-gray-500 text-xs">Phone: {event.phoneNumber}</p>
                </div>
                
                <div className="text-xs text-gray-500 px-4 py-2 border-t border-gray-200">
                  <p>A confirmation is sent on e-mail/SMS/WhatsApp within 15 minutes of booking.</p>
                </div>
                
                <div className="grid grid-cols-3 border-t border-gray-200">
                  <button 
                    className="py-3 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-r"
                    onClick={() => handleViewParticipants(event.id)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    <span>Participants</span>
                  </button>
                  {event.mapsLink ? (
                    <a 
                      href={event.mapsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="py-3 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-r"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Location</span>
                    </a>
                  ) : (
                    <button className="py-3 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-r">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Contact</span>
                    </button>
                  )}
                  
                  {isUserRegistered(event.id) ? (
                    <div className="py-3 flex items-center justify-center text-green-600 bg-green-50">
                      <span>Completed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenRegistration(event.id)}
                      className="py-3 flex items-center justify-center text-blue-600 hover:bg-blue-50"
                    >
                      <span>Join Event</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Event View */}
      {activeView === 'create' && (
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Create New Event</h1>
            <button 
              onClick={() => setActiveView('main')}
              className="text-blue-600 hover:text-blue-800"
            >
              Back
            </button>
          </div>
          
          <form onSubmit={handleCreateEvent} className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Yoga and Meditation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Wellness, Group"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date and Time
                </label>
                <input
                  type="text"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Fri, 15 Mar | 08:00 AM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Name
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={newEvent.venueName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Central Park"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={newEvent.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 123 Park Avenue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City & State
                </label>
                <input
                  type="text"
                  name="cityState"
                  value={newEvent.cityState}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., New York, NY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Maps Link (Optional)
                </label>
                <input
                  type="url"
                  name="mapsLink"
                  value={newEvent.mapsLink}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., https://maps.google.com/?q=..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={newEvent.maxParticipants}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={newEvent.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., +1 234-567-8900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ticketing Type
                </label>
                <select
                  name="ticketType"
                  value={newEvent.ticketType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              
              {newEvent.ticketType === 'Paid' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ticket Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newEvent.price}
                      onChange={handleInputChange}
                      required={newEvent.ticketType === 'Paid'}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 10.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="paymentLink"
                      value={newEvent.paymentLink}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., https://payment.gateway.com/..."
                    />
                  </div>
                </>
              )}
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Create Event
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Registration Popup */}
      {showRegistrationPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Register for Event</h2>
              <button 
                onClick={handleCloseRegistration}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitRegistration}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={registrationForm.name}
                    onChange={handleRegistrationInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registrationForm.email}
                    onChange={handleRegistrationInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={registrationForm.phoneNumber}
                    onChange={handleRegistrationInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Join Event
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participants List Popup */}
      {showParticipantsPopup && viewingEventId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Registered Participants</h2>
              <button 
                onClick={() => setShowParticipantsPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Event: {events.find(e => e.id === viewingEventId)?.title}
              </p>
              <p className="text-sm text-gray-600">
                Total Registrations: {registrations[viewingEventId]?.length || 0}
              </p>
            </div>
            
            {registrations[viewingEventId] && registrations[viewingEventId].length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations[viewingEventId].map((participant, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{participant.email}</div>
                          <div className="text-sm text-gray-500">{participant.phoneNumber}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No participants registered yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;