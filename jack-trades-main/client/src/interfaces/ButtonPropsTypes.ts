interface ButtonPropsTypes {
  style: {
    text: string,
    icon?: string,
    classes?: string,
    handleClick?: () => void
    disabled?:boolean
  }
}
export default ButtonPropsTypes;
