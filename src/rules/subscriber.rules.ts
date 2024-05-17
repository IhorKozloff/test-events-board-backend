import Joi from 'joi';

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const idRegexp = /^[0-9a-fA-F]{24}$/;

const subscribeUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.pattern.base': 'email must have format like xxx@xx.xxx',
    }),
    subscribed_event_id: Joi.string().pattern(idRegexp).required().messages({
        'string.pattern.base': 'incorrect id format',
    }),
});

export default {
    subscribeUser,
};