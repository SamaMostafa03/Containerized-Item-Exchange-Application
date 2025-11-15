import { getDonationsQuery, getExchangesQuery, getContributionsQuery } from './website/getStatistics';

import {
  signinQuery,
  signupQuery,
  checkUserExist,
  getNameQuery,
} from './account';
import { getUserProfileQuery, updateUserProfileQuery, checkEmailQuery } from './user';
import getUserProductsQuery from './getUserProductsQuery';

import {
  addToWishListQuery,
  getAllWishlistItemsQuery,
  deleteFromWishListQuery,
  checkInWishlistQuery,
  deleteProductFromAllWishList,
} from './wishlist';

import {
  getRequestQuery,
  addRequestQuery,
  getProductDetailsQuery,
  checkSelectedProductQuery,
  getAllRequestsQuery,
  deleteRequestQuery,
  declineAllOtherRequests,
  updateRequestQuery,
  getIsExchangeableQuery,
  checkRequestQuery,
  deleteSuccessRequestQuery,
  getAllOfferedProductsQuery,
  getOfferedProductsDetailsQuery,
} from './Requests';

import {
  deleteProductQuery,
  getProductQuery,
  updateProductQuery,
  addProductQuery,
  deleteExchangedProducts,
} from './products';

import {
  addFeedbackQuery,
  getUsername,
} from './website/addFeedback';

import getFeedbackQuery from './website/getFeedback';

import {
  getReceiverNotificationsQuery,
  getSenderNotificationsQuery,
  getUnseenReceiverNotificationsQuery,
  getUnseenSenderNotificationsQuery,
  updateReceiverNotifications,
  updateSenderNotifications,
} from './notifications';

import {
  addMessageQuery,
  getAllMessagesQuery,
  getUnSeenMessagesQuery,
  updateUnseenMessagesQuery,
} from './chat';

export {
  getDonationsQuery,
  getExchangesQuery,
  getContributionsQuery,
  signinQuery,
  getUserProfileQuery,
  getUserProductsQuery,
  deleteProductQuery,
  getProductQuery,
  checkInWishlistQuery,
  addToWishListQuery,
  updateProductQuery,
  deleteFromWishListQuery,
  getAllWishlistItemsQuery,
  addProductQuery,
  getRequestQuery,
  addRequestQuery,
  getProductDetailsQuery,
  checkSelectedProductQuery,
  addFeedbackQuery,
  getUsername,
  getFeedbackQuery,
  getAllRequestsQuery,
  deleteRequestQuery,
  declineAllOtherRequests,
  updateRequestQuery,
  getIsExchangeableQuery,
  getReceiverNotificationsQuery,
  getSenderNotificationsQuery,
  checkRequestQuery,
  deleteSuccessRequestQuery,
  getAllOfferedProductsQuery,
  getOfferedProductsDetailsQuery,
  signupQuery,
  checkUserExist,
  getNameQuery,
  deleteExchangedProducts,
  addMessageQuery,
  getAllMessagesQuery,
  getUnSeenMessagesQuery,
  updateUnseenMessagesQuery,
  getUnseenReceiverNotificationsQuery,
  getUnseenSenderNotificationsQuery,
  updateReceiverNotifications,
  updateSenderNotifications,
  deleteProductFromAllWishList,
  updateUserProfileQuery,
  checkEmailQuery,
};
