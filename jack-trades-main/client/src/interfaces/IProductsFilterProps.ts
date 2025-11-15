import { ICategories } from './ProductsPageInterfaces';

interface IProductsFilterProps {
  category: number[],
  categories:ICategories[] | null,
  changeTypeValue: (value: string | null) => void,
  changeDateValue: (value: string) => void,
  changeCategoryValue: (value: number, index:number) => void
}
export default IProductsFilterProps;
