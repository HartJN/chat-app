import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  base: {
    pid: false,
  },
  transport: {
    target: 'pino-pretty',
  },

  timestamp: () => `,"time":"${dayjs().format('DD-MM-YYYY HH:mm:ss')}"`,
});

export default log;
