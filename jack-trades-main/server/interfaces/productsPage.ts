import { Op } from 'sequelize';

export type TStrOrStrArr = string | string[];

export interface Args {
  title?: TStrOrStrArr;
  user_id?: {
    [Op.ne]: string
  };
  category_id: string[];
  type: TStrOrStrArr
}

export interface IArguments {
  limit: number;
  offset: number;
  date: string;
  args: Args
}
