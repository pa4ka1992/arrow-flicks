import { createAdapter } from '@socket.io/redis-adapter';
import http from 'http';
import { Server } from 'socket.io';

import pubClient, { redisErrorHandler } from 'redis-client';

import logger from 'logger';

import socketHelper from './socket.helper';

export default (server: http.Server) => {
  const io = new Server(server);

  const subClient = pubClient.duplicate();

  subClient.on('error', redisErrorHandler);

  io.adapter(createAdapter(pubClient, subClient));

  logger.info('[Socket.io] Server initialized successfully.');

  io.on('connection', (socket) => {
    socket.on('subscribe', (roomId: string) => {
      const { userId } = socket.data;
      const hasAccessToRoom = socketHelper.checkAccessToRoom(roomId, { userId });

      if (hasAccessToRoom) {
        socket.join(roomId);
      }
    });

    socket.on('unsubscribe', (roomId) => {
      socket.leave(roomId);
    });
  });
};
