import EVENTS from 'config/events';
import { useSockets } from 'context/socket.context';
import { useRef } from 'react';
import styles from '@/styles/Room.module.css';

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleCreateRoom() {
    const roomName = newRoomRef.current?.value || '';

    if (!String(roomName).trim()) return;

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    if (newRoomRef.current) {
      newRoomRef.current.value = '';
    }
  }

  function joinRoomHandler(key: string) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, { roomId: key });
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input placeholder="Room name" ref={newRoomRef} />
        <button className="cta" onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>
      <ul className={styles.roomList}>
        {Object.keys(rooms).map((key) => {
          const room = rooms[key];

          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${room.name}`}
                onClick={() => joinRoomHandler(key)}
              >
                {room.name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
