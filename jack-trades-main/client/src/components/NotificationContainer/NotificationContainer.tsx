import { HorizontalRule } from '@mui/icons-material';
import { Typography } from '@mui/material';
import axios from 'axios';
import {
  FC, useState, useEffect, useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import NotificationCard from '../NotificationCard/NotificationCard';
import NoData from '../NoData';
import Loading from '../Loading/Loading';
import { INotificationProps } from '../../interfaces';
import { AuthContext } from '../Context/AuthContext';
import './notificationContainer.css';

const NotificationContainer:FC = () => {
  const [notifications, setNotifications] = useState<INotificationProps[]>([]);
  const [isSend, setIsSend] = useState<number>(0);
  const { socket } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { state } = useLocation();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/v1/notifications');
      setNotifications(response.data);
      setIsLoading(false);
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const updateRequestSeen = async () => {
    try {
      if (state?.received.length || state?.sent.length) {
        await axios.put('/api/v1/notifications/update', state);
      }
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  useEffect(() => {
    updateRequestSeen();
    fetchData();
    socket.on('sendNotification', () => {
      setIsSend((prev) => prev + 1);
    });
  }, [socket, isSend]);

  if (isLoading) return <Loading className="loading" />;
  return (
    <div className="notifications-container">
      <div className="notification-header">
        <div className="notification">
          <Typography variant="h4">
            Notifications
          </Typography>
        </div>
        <div className="line">
          <HorizontalRule
            color="info"
            fontSize="large"
          />
        </div>
      </div>
      {notifications.length ? (notifications.map((e) => (
        <NotificationCard
          item={e}
          key={e.id}
        />
      ))) : (
        <NoData />
      )}
    </div>
  );
};

export default NotificationContainer;
