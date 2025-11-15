import { Feedback, User } from '../../../models';

const getUsername = (userId) => User.findOne({
  attributes: ['first_name'],
  where: {
    id: userId,
  },
});

const addFeedbackQuery = ({ message, username }) => Feedback.create({
  message,
  nickname: username.first_name,
});

export { addFeedbackQuery, getUsername };
