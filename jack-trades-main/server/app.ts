import { join } from 'path';
import http from 'http';

import express, { Application } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import router from './routes';
import { ErrorHandler } from './helpers';
import ioHandler from './IOHandler/IoHandler';

const { NODE_ENV, PORT } = process.env;
const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
ioHandler(io);

app.set('port', PORT || 8000);
app.use('/api/v1', router);

if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(ErrorHandler);
export { app, server };
