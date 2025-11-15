import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IRequest } from '../interfaces/models';

const Request = sequelize.define<IRequest>('Request', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['pending', 'success', 'fail'],
    defaultValue: 'pending',
  },
  is_exchangable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  receiver_approval: {
    type: DataTypes.BOOLEAN,
    defaultValue: null,
  },
  products: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  sender_seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  receiver_seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, { paranoid: true });

export default Request;
