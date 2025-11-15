/* eslint-disable @typescript-eslint/indent */
import Joi from 'joi';

const validateChat = Joi.object({
    receiverId: Joi.number().min(1).required(),
    message: Joi.string().required(),
});

export default validateChat;
