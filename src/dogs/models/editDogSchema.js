import Joi from "joi";

const dogBreeds = Array.from({ length: 141 }, (_, i) => i); // Creates an array [0, 1, ..., 80] for breed index

const editDogSchema = {
  name: Joi.string().min(2).max(20).required().messages({
    "string.min": 'Dog "name" must be at least 2 characters long',
    "string.max": 'Dog "name" cannot be longer than 20 characters',
    "any.required": 'Dog "name" is required',
  }),

  description: Joi.string().min(2).max(500).required().messages({
    "string.min": 'Dog "description" must be at least 2 characters long',
    "string.max": 'Dog "description" cannot be longer than 500 characters',
    "any.required": 'Dog "description" is required',
  }),

  // Validate breed as a number (Enum index)
  type: Joi.number()
    .valid(...dogBreeds)
    .required()
    .messages({
      "any.only": 'Dog "type" must be a valid breed index',
      "any.required": 'Dog "type" is required',
    }),

  size: Joi.number()
    .valid(0, 1, 2) // 0 = Small, 1 = Medium, 2 = Large
    .required()
    .messages({
      "any.only": 'Dog "size" must be 0 (Small), 1 (Medium), or 2 (Large)',
      "any.required": 'Dog "size" is required',
    }),

  gender: Joi.number()
    .valid(0, 1)
    .messages({
      "any.only": 'dog "gender" must be one of: Male, Female',
    })
    .required(),

  birthDate: Joi.date().required().messages({
    "date.base": 'user "birth Date" must be a valid date',
  }),

  address: Joi.string().required().messages({
    "any.required": 'Dog "address" is required',
  }),

  lon: Joi.number().required().messages({
    "any.required": 'Dog "longitude" is required',
  }),

  lat: Joi.number().required().messages({
    "any.required": 'Dog "latitude" is required',
  }),

  vaccinated: Joi.boolean().required().messages({
    "any.required": 'Dog "vaccinated" status is required',
  }),
  images: Joi.optional(),
};
export default editDogSchema;

//------------------------------//

// import Joi from "joi";

// const editDogSchema = {
//   name: Joi.string().min(2).max(20).required(),
//   lastName: Joi.string().min(2).max(20).required(),
//   email: Joi.string()
//     .regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
//     .message('user "mail" must be a valid mail')
//     .required(),
//   phone: Joi.string()
//     .regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
//     .message('user "phone" must be a valid phone number')
//     .required(),
//   birthDate: Joi.date().required().messages({
//     "date.base": 'user "birthDate" must be a valid date',
//   }),
//   gender: Joi.string()
//     .valid(0, 1, 2)
//     .messages({
//       "any.only": 'user "gender" must be one of: Male, Female, Other',
//     })
//     .required(),
// };

// export default editDogSchema;
