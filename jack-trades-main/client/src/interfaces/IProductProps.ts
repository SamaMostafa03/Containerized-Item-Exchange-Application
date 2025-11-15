interface IProductProps {
  attributes: {
    id: number,
    title: string;
    description: string;
    type: string;
    user_id: number;
    'Category.name': string,
    createdAt: string

  }
}
export default IProductProps;
