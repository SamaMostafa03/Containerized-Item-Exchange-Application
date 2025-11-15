import {
  signIn, signup, signOut, checkAuth,
} from './account';
import { getStatistics, getFeedback, addFeedback } from './website';
import {
  getUserProducts, getUserProfile, getUserWishList, updateUserProfile,
} from './user';
import {
  getProduct, addProduct, deleteProduct, updateProduct, filterProduct, getCategories,
} from './products';
import {
  getAllRequest, addRequests, deleteRequest, updateRequest,
  getAllOfferedProducts,
} from './request';
import {
  getAllNotifications, viewItemDetails, getUnseenNotifications, updateNotifications,
} from './notifications';

import {
  deleteFromWishList, getAllWishListItems, addToWishList, checkWishList,
} from './wishList';

import {
  addMessage, getAllMessages, getUnSeenMessages, updateUnseenMessages,
} from './chat';

export {
  signIn,
  signup,
  signOut,
  getStatistics,
  getFeedback,
  addFeedback,
  getUserProducts,
  getUserProfile,
  getUserWishList,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  filterProduct,
  getCategories,
  getAllRequest,
  addRequests,
  deleteRequest,
  updateRequest,
  getAllNotifications,
  viewItemDetails,
  deleteFromWishList,
  getAllWishListItems,
  addToWishList,
  checkAuth,
  checkWishList,
  getAllOfferedProducts,
  addMessage,
  getAllMessages,
  getUnSeenMessages,
  updateUnseenMessages,
  getUnseenNotifications,
  updateNotifications,
  updateUserProfile,
};
