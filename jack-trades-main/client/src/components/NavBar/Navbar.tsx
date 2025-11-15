import {
  FC, useState, useContext, useEffect,
} from 'react';
import './Navbar.css';
import {
  Badge,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  NotificationsNone,
  PersonOutline, KeyboardArrowDown,
} from '@mui/icons-material/';
import {
  Link, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ButtonComponent from '../Button/Button';
import { links } from '../../StaticData';
import { AuthContext } from '../Context';
import MessageNotification from './MessageNotification';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { userId, setUserId, socket } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement >();
  const [open, setOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<number>(0);
  const [dataObj, setDataObj] = useState({});

  const [anchor, setAnchor] = useState < SVGSVGElement | null>(null);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [messageNum, setMessageNum] = useState<number>(0);
  // start socket
  const fetchNotifications = async () => {
    try {
      if (userId) {
        const { data } = await axios.get('/api/v1/notifications/unseen');
        const { received, sent } = data;
        setDataObj(data);
        setNotification([...received, ...sent].length);
      }
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const fetchMessageNotifications = async () => {
    try {
      if (userId) {
        const { data } = await axios.get('/api/v1/chat/getUnseenMessages');
        setMessageNum(data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessageNotifications();
    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    socket.on('connect', () => {
    });
    if (userId) {
      socket?.emit('newUser', userId);
    }
    socket?.on('sendNotification', () => {
      setNotification((prev) => prev + 1);
    });
    socket?.on('toast', ({ senderName, type }) => {
      switch (type) {
        case 'request':
          toast(`${senderName} requested your item`);
          break;
        case 'decline':
          toast(`${senderName} decline your Request`);
          break;
        case 'approve':
          toast(`${senderName} approved your Request`);
          break;
        default: toast('you have new notification');
          break;
      }
    });

    socket.on('sendMessage', () => {
      setMessageNum(messageNum + 1);
    });
  }, [userId]);

  // end socket

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleOpenMessages = (event:
  React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setMessageNum(0);
    setAnchor(event.currentTarget);
    setOpenMessage(true);
    setMessageNum(0);
  };

  const handleCloseMessage = () => {
    setAnchor(null);
    setOpenMessage(false);
  };

  const handleSignOut = async () => {
    try {
      await axios.post('/api/v1/account/logout');
      navigate('/');
      setUserId(0);
    } catch (error) {
      const { message } = error.response.data;
      Swal.fire({
        title: 'Failed To Signout',
        text: message,
        icon: 'error',
      });
    }
  };

  return (
    <AppBar
      sx={{
        background: 'white',
        boxShadow: '0 4px 4px -2px rgba(0,0,0,.2)',
        position: 'sticky',
      }}
    >
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <Typography
          variant="h4"
          sx={{ color: '#1B4B66' }}
        >
          Jack  Trades
        </Typography>
        <div className="navbar">
          <ul>
            {
            links.map((link) => (
              <li key={link.id}>
                <Link
                  className="link"
                  to={link.path}
                >
                  {link.content}
                </Link>
              </li>
            ))
          }
          </ul>
        </div>
        {/* if the user authorize display the menu,
         if not display join us button */}
        { userId
          ? (
            <Box sx={{
              display: 'flex',
              gap: '6px',
            }}
            >
              <Badge badgeContent={messageNum} color="primary">
                <EmailOutlinedIcon
                  sx={{
                    color: 'black',
                    fontSize: '25px',
                    cursor: 'pointer',
                  }}
                  onClick={handleOpenMessages}
                />
              </Badge>
              <div
                onClick={() => {
                  setNotification(0);
                  navigate('/notifications', {
                    state: dataObj,
                  });
                }}
                style={{
                  cursor: 'pointer',
                }}
                role="button"
                aria-hidden="true"
              >
                <Badge badgeContent={notification} color="primary">

                  <NotificationsNone sx={{
                    color: 'black',
                    fontSize: '25px',
                  }}
                  />
                </Badge>
              </div>

              <div
                onClick={handleOpen}
                style={{
                  width: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                }}
                role="button"
                aria-hidden="true"
              >
                <PersonOutline sx={{
                  color: 'black',
                  fontSize: '25px',
                  cursor: 'pointer',
                }}
                />
                <KeyboardArrowDown sx={{
                  color: 'black',
                  fontSize: '25px',
                }}
                />
              </div>
              <ToastContainer style={{
                marginTop: '40px',
              }}
              />
              <Menu
                onClose={handleClose}
                anchorEl={anchorEl}
                open={open}
                PaperProps={{
                  style: {
                    backgroundColor: '#fff',
                  },
                }}
              >
                <MenuItem onClick={() => {
                  handleClose();
                  navigate(`/profile/${userId}`);
                }}
                >
                  Profile
                </MenuItem>

                <MenuItem onClick={() => {
                  handleClose();
                  navigate(`/profile/${userId}/requests`);
                }}
                >
                  My Requests
                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  navigate(`/profile/${userId}/wishlist`);
                }}
                >
                  My Wishlist
                </MenuItem>
                <MenuItem onClick={() => {
                  handleSignOut();
                  handleClose();
                }}
                >
                  Logout
                </MenuItem>
              </Menu>
              <MessageNotification
                openMessage={openMessage}
                anchor={anchor}
                handleCloseMessage={handleCloseMessage}
              />
            </Box>
          )

          : (
            <Link
              to="signup"
              style={{
                textDecoration: 'none',
              }}
            >
              <ButtonComponent style={{
                text: 'Join Us',
                icon: '',
                classes: 'btn navbar-btn',
              }}
              />
            </Link>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
