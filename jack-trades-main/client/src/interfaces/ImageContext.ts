interface IImageContext {
  setMainImage: (mainImage: string) => void,
  mainImage: string,
  gallery: string[],
  setProductArray: React.Dispatch<React.SetStateAction<number[]>>,
  productArray: number[],
  setProductId: (value: number) => void,
  setOpen: (value: boolean) => void,
  open: boolean,
  handleRequest: (receiverId: number, senderName: string) => void,
}
export default IImageContext;
