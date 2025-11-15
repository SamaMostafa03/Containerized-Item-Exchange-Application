import { Op } from 'sequelize';
import { Request, User, Product } from '../../../models';
import sequelize from '../../connection';

const getSenderNotificationsQuery = (sender_id: number) => Request.findAll({
  attributes: [
    'id',
    'status',
    'receiver_approval',
    'products',
    'createdAt',
    ['updatedAt', 'date'],
    'sender_id',
    'receiver_id',
    'product_id',
    'exchanged_id',
    [sequelize.col('receiver.first_name'), 'first_name'],
    [sequelize.col('receiver.last_name'), 'last_name'],
    [sequelize.col('receiver.image'), 'image'],
    [sequelize.col('exchanged.title'), 'title'],
    [sequelize.col('exchanged.gallery'), 'gallery'],
    [sequelize.col('exchanged.type'), 'type'],
  ],
  raw: true,
  nest: false,
  include: [
    {
      model: User,
      attributes: [],
      required: true,
      as: 'receiver',
    },
    {
      model: Product,
      attributes: [],
      as: 'exchanged',
      paranoid: false,
    },
  ],
  paranoid: false,
  where: {
    sender_id,
    receiver_approval: {
      [Op.ne]: null,
    },
  },
  order: [['updatedAt', 'DESC']],
});
export default getSenderNotificationsQuery;
