import Joi from "joi";

const loginSchema = {
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .message('user "mail" must be a valid mail')
    .required(),

  password: Joi.string()
    .regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
    )
    .message(
      "The password must be at least eight characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"
    )
    .required(),
};

export default loginSchema;
