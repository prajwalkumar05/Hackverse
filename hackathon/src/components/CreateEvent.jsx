import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = ({ setEvents }) => {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    date: "",
    venueName: "",
    address: "",
    cityState: "",
    mapsLink: "",
    maxParticipants: "",
    ticketType: "Free",
    price: "",
    paymentLink: "",
    phoneNumber: "",
  });

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  // Handle Create Event form submission
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const eventId = `EVT${Math.floor(1000 + Math.random() * 9000)}`;
    const createdEvent = {
      ...newEvent,
      id: eventId,
      price: newEvent.ticketType === "Free" ? 0 : parseFloat(newEvent.price) || 0,
    };

    // Update the events list
    setEvents((prevEvents) => [...prevEvents, createdEvent]);

    // Reset the form
    setNewEvent({
      title: "",
      type: "",
      date: "",
      venueName: "",
      address: "",
      cityState: "",
      mapsLink: "",
      maxParticipants: "",
      ticketType: "Free",
      price: "",
      paymentLink: "",
      phoneNumber: "",
    });

    // Redirect back to the Join Events page
    navigate("/events/join");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Create New Event</h1>
        <button onClick={() => navigate("/events")} className="text-blue-600 hover:text-blue-800">
          Back
        </button>
      </div>

      <form onSubmit={handleCreateEvent} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <input type="text" name="title" placeholder="Event Title" required value={newEvent.title} onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          
          <input type="text" name="type" placeholder="Event Type" required value={newEvent.type} onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          <input type="text" name="date" placeholder="Date & Time" required value={newEvent.date} onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          <input type="text" name="venueName" placeholder="Venue Name" required value={newEvent.venueName} onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          <input type="text" name="address" placeholder="Address" required value={newEvent.address} onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          <input type="text" name="cityState" placeholder="City & State" required value={newEvent.cityState} onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          <input type="url" name="mapsLink" placeholder="Google Maps Link (Optional)" value={newEvent.mapsLink} onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          <input type="number" name="maxParticipants" placeholder="Maximum Participants" required min="1"
            value={newEvent.maxParticipants} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          <input type="tel" name="phoneNumber" placeholder="Contact Phone Number" required value={newEvent.phoneNumber}
            onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />

          {/* Ticketing Type Selection */}
          <select name="ticketType" value={newEvent.ticketType} onChange={handleInputChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>

          {newEvent.ticketType === "Paid" && (
            <>
              <input type="number" name="price" placeholder="Ticket Price" min="0" step="0.01"
                value={newEvent.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />

              <input type="url" name="paymentLink" placeholder="Payment Link (Optional)" value={newEvent.paymentLink}
                onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </>
          )}

          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
