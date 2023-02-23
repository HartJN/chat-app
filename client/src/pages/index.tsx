import styles from '@/styles/Home.module.css';
import MessagesContainer from 'containers/Messages';
import RoomsContainer from 'containers/Rooms';
import { useSockets } from 'context/socket.context';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleSetUsername() {
    const value = usernameRef.current?.value;

    if (!value) return;

    setUsername(value);

    localStorage.setItem('username', value);
  }

  useEffect(() => {
    if (usernameRef) {
      usernameRef.current!.value = localStorage.getItem('username') || '';
    }
  }, []);

  return (
    <div>
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" ref={usernameRef} />
            <button onClick={handleSetUsername}>Start</button>
          </div>
        </div>
      )}

      {username && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}
