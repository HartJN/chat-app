import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from 'config/default';
import EVENTS from 'config/events';

type Room = {
  name: string;
};

interface Message {
  message: string;
  time: string;
  username: string;
}

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: Message[];
  setMessages: Function;
  roomId?: string;
  rooms: Record<string, { name: string }>;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: {},
  messages: [],
  setMessages: () => false,
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = 'Chat app';
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    const handleRoomMessage = ({ message, username, time }: Message) => {
      if (!document.hasFocus()) {
        document.title = 'New message...';
      }

      setMessages((messages) => [...messages, { message, username, time }]);
    };

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, handleRoomMessage);

    return () => {
      socket.off(EVENTS.SERVER.ROOM_MESSAGE, handleRoomMessage);
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        messages,
        setMessages,
        rooms,
        roomId,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
