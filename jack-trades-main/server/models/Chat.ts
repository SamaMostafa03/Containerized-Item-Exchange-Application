import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { IChat } from '../interfaces/models';

const Chat = sequelize.define<IChat>('Chat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, { paranoid: true });

export default Chat;
