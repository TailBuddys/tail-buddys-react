import Joi from "joi";

const createParkSchema = {
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(2).max(500).required().messages({
    "string.min": 'Park "description" must be at least 2 characters long',
    "string.max": 'Park "description" cannot be longer than 500 characters',
    "any.required": 'Park "description" is required',
  }),
  address: Joi.string().min(5).max(100).required(),
  lon: Joi.number().min(-180).max(180).required(),
  lat: Joi.number().min(-90).max(90).required(),
};

export default createParkSchema;

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
