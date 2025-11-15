/* eslint-disable @typescript-eslint/indent */
interface IProductPopup {
    open: boolean,
    id?: number,
    receiverId?: number,
    handleClose: () => void
    setStatus?: (e: string) => void
    senderId?: number,
}

export default IProductPopup;
