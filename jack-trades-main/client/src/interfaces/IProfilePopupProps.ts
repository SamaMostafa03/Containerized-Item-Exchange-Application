import UserInfoTypes from './UserInfoProps';

interface IProfilePopupProps {
  info:UserInfoTypes,
  setIsPopupOpen:(isOpenPopup:boolean) => void,
  isPopupOpen:boolean,
  setInfo:(info:UserInfoTypes | null) => void,
}
export default IProfilePopupProps;
