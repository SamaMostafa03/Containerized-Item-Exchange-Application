import { Request, User, Product } from '../../../models';
import sequelize from '../../connection';

const getReceiverNotificationsQuery = (receiver_id: number) => Request.findAll({
  attributes: [
    'id',
    'status',
    'receiver_approval',
    'products',
    ['createdAt', 'date'],
    'updatedAt',
    'sender_id',
    'receiver_id',
    'product_id',
    'exchanged_id',
    [sequelize.col('sender.first_name'), 'first_name'],
    [sequelize.col('sender.last_name'), 'last_name'],
    [sequelize.col('sender.image'), 'image'],
    [sequelize.col('product.title'), 'title'],
    [sequelize.col('product.gallery'), 'gallery'],
    [sequelize.col('product.type'), 'type'],
  ],
  raw: true,
  nest: false,

  include: [
    {
      model: User,
      attributes: [],
      required: true,
      as: 'sender',
    },
    {
      model: Product,
      attributes: [],
      required: true,
      as: 'product',
      paranoid: false,
    },
  ],
  paranoid: false,
  where: {
    receiver_id,
  },
  order: [['createdAt', 'DESC']],
});
export default getReceiverNotificationsQuery;
