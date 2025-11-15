import { Server } from 'socket.io';

const ioHandler = (io:Server) => {
  try {
    let onlineUsers = [];
    // eslint-disable-next-line max-len
    const addNewUser = (userId:number, socketId:string) => !onlineUsers.some((user) => user.userId === userId)
    && onlineUsers.push({
      socketId, userId,
    });

    const removeUser = (socketId) => onlineUsers.filter((user) => socketId !== user.socketId);

    const getUser = (id:number) => onlineUsers.find((user) => user.userId === id);
    io.on('connection', (socket) => {
    // add new user
      socket.on('newUser', (userId:number) => {
        addNewUser(userId, socket.id);
        // console.log(onlineUsers);
      });
      // chatting
      socket.on('sendTextMessage', (data) => {
        const { receiverId, senderId, message } = data;
        const result = getUser(+receiverId);
        if (result) {
          const { socketId } = result;
          socket.to(socketId).emit('sendMessage', {
            senderId,
            message,
          });
        }
      });
      // Requests
      socket.on('requests', ({ receiverId, senderName, type }) => {
        const result = getUser(receiverId);

        if (result) {
          const { socketId } = result;
          socket.to(socketId).emit('sendNotification');
          if (type) {
            socket.to(socketId).emit('toast', { senderName, type });
          }
        }
      });
      socket.on('disconnect', () => {
        onlineUsers = removeUser(socket.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export default ioHandler;
