import React, { useState } from 'react';

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  
  // Sample data
  const chats = [
    { id: 1, name: 'Sebastian Rudiger', message: '✓ Perfect! Will check it 🔥', time: '09:34 PM', unread: false, online: true, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: 'Caroline Varsaha', message: 'Thanks, Jimmy! Talk later', time: '08:12 PM', unread: true, count: 2, online: true, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: 'Darshan Patelchi', message: 'Sound good for me too!', time: '02:29 PM', unread: true, count: 3, online: true, avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 4, name: 'Mohammed Arnold', message: '✓ No rush, mate! Just let ...', time: '01:08 PM', unread: false, online: true, avatar: "https://randomuser.me/api/portraits/men/91.jpg" },
    { id: 5, name: 'Tamara Schipchinskaya', message: '✓ Okay. I\'ll tell him about it', time: '11:15 AM', unread: false, online: true, avatar: "https://randomuser.me/api/portraits/women/60.jpg" },
    { id: 6, name: 'Ariana Amberline', message: 'Good nite, Honey! ❤️', time: 'Yesterday', unread: false, online: false, avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    { id: 7, name: 'Sebastian Rudiger', message: '✓ Perfect! Will check it 🔥', time: 'Yesterday', unread: false, online: false, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  ];

  // Initialize chat messages for each chat
  React.useEffect(() => {
    const initialMessages = {};
    chats.forEach(chat => {
      initialMessages[chat.id] = [
        { id: 1, sender: 'other', text: `Hi from ${chat.name}! Any updates?`, time: '09:32 PM' },
      ];
    });
    setChatMessages(initialMessages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add the new message to the selected chat's messages
      setChatMessages(prev => {
        const updatedMessages = {...prev};
        const chatId = selectedChat.id;
        
        // Create a new message
        const newMessage = {
          id: updatedMessages[chatId].length + 1,
          sender: 'me',
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        updatedMessages[chatId] = [...updatedMessages[chatId], newMessage];
        return updatedMessages;
      });
      
      setMessage('');
    }
  };

  const renderChatList = () => (
    <div className="h-full overflow-y-auto pb-20 bg-white">
      {chats.map((chat) => (
        <div 
          key={chat.id} 
          className="flex items-center px-4 py-3 cursor-pointer"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              {/* Using avatar placeholder */}
              <span className="text-lg font-semibold text-white">{chat.name.charAt(0)}</span>
            </div>
            {chat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="ml-3 flex-grow border-b pb-3">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">{chat.name}</h3>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{chat.message}</p>
          </div>
          {chat.unread && (
            <div className="ml-2 flex-shrink-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-xs text-white">{chat.count}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderChatView = () => (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b bg-white">
        <button 
          className="mr-4 text-gray-500" 
          onClick={() => setSelectedChat(null)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {/* Using avatar placeholder */}
            <span className="text-sm font-semibold text-white">{selectedChat.name.charAt(0)}</span>
          </div>
          {selectedChat.online && (
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
          <p className="text-xs text-green-500">
            {selectedChat.online ? 'Online' : 'Offline'}
          </p>
        </div>
        <div className="flex">
          <button className="ml-4 p-2 bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {selectedChat && chatMessages[selectedChat.id]?.map((msg) => (
          <div key={msg.id} className={`flex mb-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender !== 'me' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-xs font-semibold text-white">{selectedChat.name.charAt(0)}</span>
              </div>
            )}
            <div className={`rounded-2xl px-4 py-2 max-w-xs ${
              msg.sender === 'me' 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-white border rounded-bl-none'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-purple-200' : 'text-gray-500'}`}>
                {msg.time} {msg.sender === 'me' && '✓'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <div className="flex items-center flex-grow bg-gray-100 rounded-full px-4 py-1">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-transparent py-2 focus:outline-none"
              placeholder="Type here..."
            />
            <button type="button" className="text-gray-500 ml-1 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          </div>
          <button 
            type="submit" 
            className="ml-3 bg-gray-100 text-gray-500 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
            disabled={!message.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* If chat is selected, show chat view, otherwise show lists */}
      {selectedChat ? (
        renderChatView()
      ) : (
        <>
          {/* Header - Search Bar */}
          <div className="px-4 py-3">
            <div className="flex items-center bg-gray-100 rounded-full py-2 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                className="bg-transparent flex-grow focus:outline-none text-gray-700"
                placeholder="Search message..."
              />
              <button className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Chat List */}
          {renderChatList()}
          
          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6">
            <button className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatApp;