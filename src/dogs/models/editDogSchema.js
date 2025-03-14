import Joi from "joi";

const editSchema = {
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .message('user "mail" must be a valid mail')
    .required(),
  phone: Joi.string()
    .regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .message('user "phone" must be a valid phone number')
    .required(),
  birthDate: Joi.date().required().messages({
    "date.base": 'user "birthDate" must be a valid date',
  }),
  gender: Joi.string()
    .valid(0, 1, 2)
    .messages({
      "any.only": 'user "gender" must be one of: Male, Female, Other',
    })
    .required(),
};

export default editSchema;
