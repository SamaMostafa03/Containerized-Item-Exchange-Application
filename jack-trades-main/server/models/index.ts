/* eslint-disable import/prefer-default-export */
import User from './users';
import Category from './Category';
import Product from './Product';
import Favorite from './favorites';
import Feedback from './feedback';
import Request from './requests';
import Chat from './Chat';

// user relations
User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Chat);
Chat.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });

User.hasMany(Chat);
Chat.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

User.hasMany(Request);
Request.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });

User.hasMany(Request);
Request.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

// product relations
Product.hasMany(Request);
Request.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });

Product.hasOne(Request);
Request.belongsTo(Product, { as: 'exchanged', foreignKey: 'exchanged_id' });

Product.hasMany(Favorite, { foreignKey: 'product_id' });
Favorite.belongsTo(Product, { foreignKey: 'product_id' });

// category relations
Category.hasMany(Product, { foreignKey: 'category_id', sourceKey: 'id' });
Product.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id' });

export {
  User,
  Category,
  Product,
  Favorite,
  Feedback,
  Request,
  Chat,
};
