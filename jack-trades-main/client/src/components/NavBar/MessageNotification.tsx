/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import { FC, useEffect, useState } from 'react';
import {
  MenuItem,
  ListItemText,
  Avatar,
  Menu,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const MessageNotification:FC<{
  openMessage: boolean
  anchor: SVGSVGElement | null
  handleCloseMessage: ()=> void
}> = ({
  openMessage, anchor, handleCloseMessage,
}) => {
  const [notifies, setNotifies] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMessageNotifications = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/api/v1/chat/getUnseenMessages');
      setNotifies(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openMessage)fetchMessageNotifications();
  }, [openMessage]);

  return (
    <Menu
      onClose={handleCloseMessage}
      anchorEl={anchor}
      open={openMessage}
      className="messages"
    >
      {
      isLoading ? <Loading className="loading" />
        : notifies.length
          ? notifies.map((e) => (
            <Link
              to={`/profile/${e['sender.id']}`}
              state={{ open: true }}
              key={e['sender.id']}
              style={{ textDecoration: 'none', color: '#333' }}
              onClick={handleCloseMessage}
            >
              <MenuItem
                sx={{ borderBottom: 'solid #CCC 1px' }}
              >
                <Avatar
                  src={e['sender.image'] || ''}
                  sx={{ width: 30, height: 30, fontSize: 15 }}
                >
                  {
              `${e['sender.first_name'][0]}${e['sender.last_name'][0]}`
              }
                </Avatar>
                <ListItemText inset>
                  {
              `${e['sender.first_name']} messaged you`
              }

                </ListItemText>
              </MenuItem>
            </Link>
          ))
          : <p className="no-msgs"> No messages</p>
    }
    </Menu>
  );
};
export default MessageNotification;
