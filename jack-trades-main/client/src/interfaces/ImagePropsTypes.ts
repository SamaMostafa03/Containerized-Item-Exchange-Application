interface IImageProps {
  attributes: {
    src: string,
    alt: string,
    className: string,
    handleMainImage?:(arg:string) => void,
  }
}
export default IImageProps;
