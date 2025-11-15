export type Product = {
  title: string;
  description: string;
  gallery: string[];
  is_available: boolean;
  type: string;
  user_id: number;
  category_id: number;
};

export type User = {
  email: string,
  first_name: string,
  last_name: string,
  hashedPassword: string,
  image: string,
  bio: string,
};

export type Category = {
  name: string,
  image: string,
};
export type Favorite = {
  user_id: number;
  product_id:number,
};
