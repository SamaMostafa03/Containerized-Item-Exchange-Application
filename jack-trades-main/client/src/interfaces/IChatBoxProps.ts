interface IChatBoxProps {
  isOpen: boolean,
  handleIsOpen: (chatOpen: boolean) => void,
  userId: string | undefined,
  userImage: string,
  userName: string,
}
export default IChatBoxProps;
