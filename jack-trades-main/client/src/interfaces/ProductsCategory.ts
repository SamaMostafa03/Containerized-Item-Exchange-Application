import { IProducts } from './ProductsPageInterfaces';

interface IProductsCategoryProps {
  products: IProducts[],
  totalPages: number,
  loading: boolean,
  changeOffsetValue: (value: number) => void
  productsCount:number,
}
export default IProductsCategoryProps;
