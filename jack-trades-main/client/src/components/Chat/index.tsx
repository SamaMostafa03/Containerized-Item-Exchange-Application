/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC, useEffect, useRef, useState, useContext,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Context';
import { IChatData, IAllMessages, IChatBoxProps } from '../../interfaces';
import './style.css';

// handle message
const ChatMessage = ({
  senderImage,
  receiverImage,
  userId,
  senderId,
  receiverName,
  message,
}: IChatData) => {
  const { fullName } = useContext(AuthContext);
  return (
    <div className={userId === senderId ? 'chatMessage' : 'chatMessage active'}>
      {
    // eslint-disable-next-line no-nested-ternary
    userId === senderId ? senderImage
      ? <img src={senderImage} alt="senderImage" />
      : (
        <Avatar sx={{ bgcolor: '#B9E0FF' }} className="user-img">
          {fullName[0]}
          {fullName.split(' ')[1][0]}

        </Avatar>
      )
      : receiverImage ? <img src={receiverImage} alt="receiverImage" />
        : (
          <Avatar sx={{ bgcolor: '#B9E0FF' }} className="user-img">
            {receiverName[0]}
            { receiverName.split(' ')[1][0] }
          </Avatar>
        )
  }

      <p className="message">{message}</p>
    </div>
  );
};

// start FC
const ChatBox: FC<IChatBoxProps> = ({
  isOpen, handleIsOpen, userId, userImage, userName,
}) => {
  const bottomRef = useRef<HTMLInputElement | null >(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [allMessages, setAllMessages] = useState<[IAllMessages] | null>(null);

  const {
    userId: authUserId, image, fullName, socket,
  } = useContext(AuthContext);

  const { userId: senderId } = useParams();
  const getAllMessages = async () => {
    try {
      const response = await axios.get(`/api/v1/chat/${userId}`);
      setAllMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!inputValue) throw new Error('input is required');
      await axios.post(
        `/api/v1/chat/${userId}/addMessage`,
        { message: inputValue },
      );
      socket.emit('sendTextMessage', {
        senderId: authUserId,
        receiverId: userId,
        message: inputValue,
      });
      setAllMessages((prev: any): any => [...prev, {
        message: inputValue,
        'receiver.first_name': userName.split(' ')[0],
        'receiver.image': userImage,
        'receiver.id': userId,
        'sender.first_name': fullName.split(' ')[0],
        'sender.image': image,
        sender_id: authUserId,
      }]);
      setInputValue('');
    } catch (err) {
      console.log(err);
    }
  };

  const updateMessages = async () => {
    try {
      await axios.put(`/api/v1/chat/${senderId}/updateUnseenMessages`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
    if (isOpen) updateMessages();
  }, [isOpen]);

  useEffect(() => {
    // socket
    try {
      socket.on('sendMessage', (data) => {
        setAllMessages((prev: any): any => [...prev, {
          message: data.message,
          'receiver.first_name': userName.split(' ')[0],
          'receiver.image': userImage,
          'receiver.id': userId,
          'sender.first_name': fullName.split(' ')[0],
          'sender.image': image,
          sender_id: data.senderId,
        }]);
      });
    } catch (err) {
      console.log(err);
    }
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.addEventListener('DOMNodeInserted', (event: any) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    });
  }, [allMessages]);

  return isOpen ? (

    <section id="chat">
      <div className="header">
        <div className="user-info-chat">
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
            />
          ) : (
            <Avatar sx={{ bgcolor: '#B9E0FF' }} className="user-img">
              {userName[0]}
              {userName.split(' ')[1][0]}
            </Avatar>
          )}
          <h3>{userName}</h3>
        </div>
        <CloseIcon onClick={() => handleIsOpen(false)} />
      </div>
      <div className="chatBox" ref={bottomRef}>
        {allMessages !== null ? allMessages.map((e, i) => (
          <ChatMessage
            senderImage={e['sender.image']}
            receiverImage={userImage}
            userId={authUserId}
            senderId={e.sender_id}
            senderName={e['sender.first_name']}
            receiverName={userName}
            message={e.message}
            key={`${i + 1}chat`}
          />
        )) : ''}

      </div>
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Aa"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); }}
        />
        <button
          type="submit"
        >
          <SendOutlinedIcon />
        </button>
      </form>
    </section>
  ) : <div />;
};

export default ChatBox;
