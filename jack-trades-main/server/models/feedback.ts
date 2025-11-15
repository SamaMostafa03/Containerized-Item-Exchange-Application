import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IFeedback } from '../interfaces/models';

const Feedback = sequelize.define<IFeedback>('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { paranoid: true });

export default Feedback;
