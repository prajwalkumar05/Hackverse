import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Plus, AlertCircle, Calendar } from "lucide-react";

// 🚨 Emergency Contacts Data
const emergencyContacts = [
  { id: 1, name: "Ambulance", number: "102", icon: "🚑", color: "bg-red-600" },
  { id: 2, name: "Police", number: "100", icon: "🚓", color: "bg-blue-600" },
  { id: 3, name: "Fire Brigade", number: "101", icon: "🔥", color: "bg-orange-600" },
  { id: 4, name: "Senior Helpline", number: "14567", icon: "☎️", color: "bg-purple-600" },
  { id: 5, name: "Local Hospital", number: "123456789", icon: "🏥", color: "bg-green-600" },
];

// 🏥 Healthcare Contacts Data
const healthcareContacts = [
  { id: 1, name: "Dr. Sharma (Physiotherapist)", number: "9876543210", icon: "🦵", color: "bg-teal-600" },
  { id: 2, name: "Dr. Mehta (Dentist)", number: "9234567890", icon: "🦷", color: "bg-indigo-600" },
];

export default function EmergencyContacts() {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [customContacts, setCustomContacts] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");

  // Handle adding a custom contact
  const handleAddContact = () => {
    if (newContact.name && newContact.number) {
      setCustomContacts([...customContacts, { ...newContact, id: customContacts.length + 1 }]);
      setNewContact({ name: "", number: "" });
      setIsAddingContact(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-6 mt-10 ">
      <div className="max-w-2xl mx-auto">
        {/* 🚨 Emergency Contacts */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">🚨 Emergency Contacts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact) => (
            <motion.button
              key={contact.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${contact.color} text-white p-6 rounded-2xl shadow-lg flex items-center justify-center space-x-4 transition-all`}
              onClick={() => window.open(`tel:${contact.number}`, "_self")}
            >
              <span className="text-4xl">{contact.icon}</span>
              <div className="text-left">
                <p className="text-2xl font-bold">{contact.name}</p>
                <p className="text-lg opacity-80">{contact.number}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* 🏥 Healthcare Contacts */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">🏥 Healthcare Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthcareContacts.map((doctor) => (
              <motion.div
                key={doctor.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${doctor.color} text-white p-6 rounded-2xl shadow-lg flex items-center justify-between transition-all`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{doctor.icon}</span>
                  <div className="text-left">
                    <p className="text-2xl font-semibold">{doctor.name}</p>
                    <p className="text-lg opacity-80">{doctor.number}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => window.open(`tel:${doctor.number}`, "_self")} className="bg-white text-gray-900 p-2 rounded-lg">
                    <Phone size={24} />
                  </button>
                  <button onClick={() => { setSelectedDoctor(doctor); setIsBooking(true); }} className="bg-white text-gray-900 p-2 rounded-lg">
                    <Calendar size={24} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 📞 Custom Contacts */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">📞 Custom Contacts</h2>
          {customContacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customContacts.map((contact) => (
                <motion.button
                  key={contact.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg flex items-center justify-center space-x-4 transition-all"
                  onClick={() => window.open(`tel:${contact.number}`, "_self")}
                >
                  <Phone size={30} className="text-gray-700" />
                  <div className="text-left">
                    <p className="text-2xl font-semibold">{contact.name}</p>
                    <p className="text-lg opacity-70">{contact.number}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-lg">No custom contacts added yet.</p>
          )}

          {/* ➕ Add Custom Contact Button */}
          <button onClick={() => setIsAddingContact(true)} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-all text-lg">
            <Plus size={24} />
            <span>Add Custom Contact</span>
          </button>
        </div>
      </div>

      {/* 🆕 Add Contact Modal */}
      <AnimatePresence>
        {isAddingContact && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={() => setIsAddingContact(false)}>
            <motion.div className="bg-white p-8 rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-gray-800 mb-5">Add Custom Contact</h2>
              <input type="text" placeholder="Name" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg" />
              <input type="tel" placeholder="Phone Number" value={newContact.number} onChange={(e) => setNewContact({ ...newContact, number: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg" />
              <button onClick={handleAddContact} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all text-lg w-full">Add Contact</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
