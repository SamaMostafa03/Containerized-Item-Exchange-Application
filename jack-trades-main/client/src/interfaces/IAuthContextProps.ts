import { Socket } from 'socket.io-client';

interface IAuthContextProps {
  setUserId: (userId:number) => void,
  userId: number,
  fullName: string,
  image:string
  socket :Socket,
}
export default IAuthContextProps;
