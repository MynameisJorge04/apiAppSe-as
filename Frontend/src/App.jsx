import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Conéctate al servidor Node.js

function App() {
  const [messages, setMessages] = useState([]);
  const [messageError, setMessageError] = useState('');
  const [message, setMessage] = useState('');
  const messageInputRef = useRef(null);

  useEffect(() => {
    try {
      // Escucha mensajes del servidor
      socket.on('message', (message) => {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
        setMessageError('');
      });

      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  }, []);

  const sendMessage = () => {
    try {
      socket.emit('message', message);
      setMessage('');
      messageInputRef.current.focus(); // Enfoca nuevamente en el input
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div>
      <h1>Chat en tiempo real</h1>

      {messages.length > 0 ? (
        <div>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      ) : (
        <div>
          {messageError}
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={messageInputRef}
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      )}
    </div>
  );
}

export default App;
