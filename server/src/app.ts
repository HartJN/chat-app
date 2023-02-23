import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import config from 'config';

import log from './utils/logger';
import { version } from '../package.json';
import socket from './socket';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: config.get<string>('corsOrigin'),
    credentials: true,
  },
});

// app.use(cors());

app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}, running version ${version}`);
});

httpServer.listen(port, host, () => {
  log.info(`🔥 Server version ${version} is listening on port ${port} 🔥`);
  log.info(`http://${host}:${port}`);

  socket({ io });
});
