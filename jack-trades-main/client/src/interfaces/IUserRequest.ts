interface IUserRequest {

  id:number,
  status:string,
  receiver_approval:null | boolean,
  products: number[],
  createdAt:string,
  receiver_id : number,
  product_id : number,
  exchanged_id:null | number,

  'product.title':string
  'product.gallery':string[],
}
export default IUserRequest;
