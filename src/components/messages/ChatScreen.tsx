import React, { useState } from 'react';

interface Message {
  text: string;
  fromMe: boolean;
}

interface MessageComponentProps {
  userName: string;
}

const ChatScreen: React.FC<MessageComponentProps> = ({ userName }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello!', fromMe: false },
    { text: 'Hi there!', fromMe: true },
    { text: 'How are you?', fromMe: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      text: inputValue.trim(),
      fromMe: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="bg-indigo-600 text-white py-4 px-6 font-bold">
        Chatting with {userName}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              message.fromMe ? 'bg-indigo-600 text-white self-end' : 'bg-gray-200'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 py-2 px-4 rounded-full border-2 border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 ml-4 rounded-full hover:bg-indigo-700 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
