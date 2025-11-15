import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IFavorite } from '../interfaces/models';

const Favorite = sequelize.define<IFavorite>('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, { paranoid: true });

export default Favorite;
