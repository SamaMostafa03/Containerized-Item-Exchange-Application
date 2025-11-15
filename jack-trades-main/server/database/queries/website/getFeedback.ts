import { Feedback } from '../../../models';

const getFeedbackQuery = () => Feedback.findAll({
  attributes: ['nickname', 'message', 'createdAt'],
});

export default getFeedbackQuery;
