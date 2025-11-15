import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';
import { IAuthContextProps } from '../../interfaces';

export const AuthContext = createContext<IAuthContextProps>({
  userId: 0,
  setUserId: () => {},
  fullName: '',
  image: '',
  socket: io(''),
});

interface IChildrenProps {
  children : React.ReactNode
}

export const AuthContextProvider = ({ children } : IChildrenProps) => {
  const [userId, setUserId] = useState<number>(0);
  const [fullName, setFullName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const socket = io(`${process.env.REACT_APP_BASE_URL}`);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await axios.get('/api/v1/account/');
      if (user) {
        const {
          id, firstName, lastName, userImage,
        } = user;
        setUserId(id);
        setFullName(`${firstName} ${lastName}`);
        setImage(userImage);
      }
    } catch (error) {
      if (error.response.status !== 401) {
        Swal.fire({
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      userId,
      setUserId,
      fullName,
      image,
      socket,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
