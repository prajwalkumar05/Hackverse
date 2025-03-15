import React, { useState, useEffect } from 'react';
import { Plus, Share2, Heart, ExternalLink, Phone, Mail } from 'lucide-react';

// Sample initial NGO data
const initialNGOs = [
  {
    id: 1,
    name: 'Green Earth Foundation',
    role: 'Environmental',
    category: 'CONSERVATION',
    location: 'Barcelona, España',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu sem ornare, egestas nibh sit amet, hendrerit felis. Etiam eu nisi et purus vehicula convallis...',
    impactMetric: '50 Projects completed',
    likes: 32,
    endorsements: 45,
    logo: 'https://randomuser.me/api/portraits/women/44.jpg',
    owner: {
      name: 'Maria Rodriguez',
      phoneNumber: '+34 612 345 678',
      email: 'maria@greenearthfoundation.org'
    },
    totalMembers: 87
  },
];

const NGOPage = () => {
  const [ngos, setNgos] = useState(initialNGOs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: '',
    location: '',
    description: '',
    impactMetric: '',
    logo: '',
    totalMembers: '',
    owner: {
      name: '',
      phoneNumber: '',
      email: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOwnerInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      owner: {
        ...formData.owner,
        [name]: value
      }
    });
  };

  const handleAddNGO = (e) => {
    e.preventDefault();
    
    const newNGO = {
      id: ngos.length + 1,
      ...formData,
      likes: 0,
      endorsements: 0,
    };
    
    setNgos([...ngos, newNGO]);
    setShowAddForm(false);
    setFormData({
      name: '',
      role: '',
      category: '',
      location: '',
      description: '',
      impactMetric: '',
      logo: '',
      totalMembers: '',
      owner: {
        name: '',
        phoneNumber: '',
        email: ''
      }
    });
  };

  const openNGODetails = (ngo) => {
    setSelectedNGO(ngo);
  };

  const closeNGODetails = () => {
    setSelectedNGO(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">NGO Directory</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add to Give
        </button>
      </div>

      {/* NGO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ngos.map((ngo) => (
          <NGOCard key={ngo.id} ngo={ngo} onClick={() => openNGODetails(ngo)} />
        ))}
      </div>

      {/* Add NGO Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New NGO</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddNGO}>
              <div className="mb-4">
                <h3 className="font-bold text-gray-700 mb-2">NGO Information</h3>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">NGO Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Focus Area</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. Environmental, Healthcare, Education"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. CONSERVATION, EDUCATION, RELIEF"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Impact Metric</label>
                  <input
                    type="text"
                    name="impactMetric"
                    value={formData.impactMetric}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. 50 Projects completed"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Total Members</label>
                  <input
                    type="number"
                    name="totalMembers"
                    value={formData.totalMembers}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Logo URL</label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-bold text-gray-700 mb-2">Owner Information</h3>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Owner Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.owner.name}
                    onChange={handleOwnerInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.owner.phoneNumber}
                    onChange={handleOwnerInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="+1 (123) 456-7890"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.owner.email}
                    onChange={handleOwnerInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Add NGO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NGO Details Modal */}
      {selectedNGO && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">NGO Details</h2>
              <button onClick={closeNGODetails} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-4">
              <img 
                src={selectedNGO.logo} 
                alt={selectedNGO.name} 
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
              <h3 className="text-lg font-bold">{selectedNGO.name}</h3>
              <p className="text-gray-600">{selectedNGO.role}</p>
              <span className="text-xs text-gray-500 uppercase">{selectedNGO.category}</span>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>Location:</strong> {selectedNGO.location}</p>
              <p className="text-gray-700 mb-2"><strong>Impact:</strong> {selectedNGO.impactMetric}</p>
              <p className="text-gray-700 mb-2"><strong>Total Members:</strong> {selectedNGO.totalMembers}</p>
              <p className="text-gray-700 mb-4"><strong>Description:</strong> {selectedNGO.description}</p>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-700 mb-2">Contact Information</h4>
                <p className="text-gray-700 mb-1"><strong>Owner:</strong> {selectedNGO.owner.name}</p>
                <div className="flex items-center gap-1 text-gray-700 mb-1">
                  <Phone size={16} />
                  <span>{selectedNGO.owner.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <Mail size={16} />
                  <span>{selectedNGO.owner.email}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-1">
                <div className="bg-yellow-100 p-1 rounded-full">
                  <Heart size={16} className="text-yellow-500" />
                </div>
                <span className="text-sm">{selectedNGO.endorsements}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-gray-100 p-1 rounded-full">
                  <Share2 size={16} className="text-gray-500" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-gray-100 p-1 rounded-full">
                  <Heart size={16} className="text-gray-500" />
                </div>
                <span className="text-sm">{selectedNGO.likes}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// NGO Card Component
const NGOCard = ({ ngo, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className="bg-green-500 h-12 w-full absolute top-0"></div>
        <div className="flex justify-center pt-4 relative">
          <img 
            src={ngo.logo} 
            alt={ngo.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>
      
      <div className="p-4 pt-2 text-center">
        <h3 className="font-medium text-lg">{ngo.name}</h3>
        <p className="text-gray-800">{ngo.role}</p>
        <p className="text-xs text-gray-500 uppercase">{ngo.category}</p>
        <p className="text-gray-600 text-sm mt-1">{ngo.location}</p>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{ngo.description}</p>
        
        <p className="font-medium mt-2">{ngo.impactMetric}</p>
      </div>
      
      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <div className="bg-yellow-100 p-1 rounded-full">
            <Heart size={16} className="text-yellow-500" />
          </div>
          <span className="text-sm">{ngo.endorsements}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-gray-100 p-1 rounded-full">
            <Share2 size={16} className="text-gray-500" />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-gray-100 p-1 rounded-full">
            <Heart size={16} className="text-gray-500" />
          </div>
          <span className="text-sm">{ngo.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NGOPage;