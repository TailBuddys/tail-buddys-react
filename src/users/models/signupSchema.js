import Joi from "joi";

const signupSchema = {
  FirstName: Joi.string().min(2).max(20).required(),
  LastName: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .message('user "mail" must be a valid mail')
    .required(),
  phone: Joi.string()
    .regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .message('user "phone" must be a valid phone number')
    .required(),
  password: Joi.string()
    .regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
    )
    .message(
      "The password must be at least eight characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"
    )
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

export default signupSchema;

// const signupSchema = {
//   first: Joi.string().min(2).max(256).required(),
//   middle: Joi.string().min(2).max(256).allow(""),
//   last: Joi.string().min(2).max(256).required(),
//   phone: Joi.string()
//     .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
//     .rule({ message: 'user "phone" must be a valid phone number' })
//     .required(),
//   email: Joi.string()
//     .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
//     .rule({ message: 'user "mail" must be a valid mail' })
//     .required(),
//   password: Joi.string()
//     .ruleset.regex(
//       /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
//     )
//     .rule({
//       message:
//         "The password must be at least eight characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
//     })
//     .required(),
//   url: Joi.string()
//     .ruleset.regex(
//       /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
//     )
//     .rule({ message: "user image must be a valid url" })
//     .allow(""),
//   alt: Joi.string().min(2).max(256).allow(""),
//   state: Joi.string().allow(""),
//   country: Joi.string().min(2).max(256).required(),
//   city: Joi.string().min(2).max(256).required(),
//   street: Joi.string().min(2).max(256).required(),
//   houseNumber: Joi.number().required(),
//   zip: Joi.number(),
//   isBusiness: Joi.boolean().required(),
// };

// export default signupSchema;
