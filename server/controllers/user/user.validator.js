import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const validateRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().trim(true).label("First Name"),
    lastName: Joi.string().required().trim(true).label("Last Name"),
    email: Joi.string().email().required().trim(true).label("Email"),
    password: passwordComplexity().required().trim(true).label("Password"),
  });
  return schema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().trim(true).label("Email"),
    password: Joi.string().required().trim(true).label("Password"),
  }).unknown(true);
  return schema.validate(data);
};
