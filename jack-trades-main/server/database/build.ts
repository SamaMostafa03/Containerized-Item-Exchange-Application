/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv';
import sequelize from './connection';
import fakeData from './fakeData';
import {
  User, Request, Product, Category, Favorite, Feedback,
} from '../models';

dotenv.config();

const buildTables = async () => {
  try {
    await sequelize.sync({ force: true });
    await Category.bulkCreate(fakeData.categories);
    await User.bulkCreate(fakeData.users);
    await Product.bulkCreate(fakeData.products);
    await Favorite.bulkCreate(fakeData.favorites);
    // eslint-disable-next-line no-console
    console.log('Database built successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`error in building data: ${error}`);
  }
};

if (process.env.SEED) {
  buildTables();
}

export default buildTables;
