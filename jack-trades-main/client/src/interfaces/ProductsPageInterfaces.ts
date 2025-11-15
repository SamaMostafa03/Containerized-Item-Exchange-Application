export interface IProducts {
  id: string;
  title: string;
  gallery: string[];
}

export interface ICategories {
  id: number;
  name: string;
}

export interface IData {
  totalProducts: number;
  totalPages: number;
  products: IProducts[];
  categories: ICategories[];
  productsCount:number,
}
