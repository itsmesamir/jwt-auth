// validations/userValidation.js
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

const validateUser = (data) => {
  return userSchema.validate(data);
};

export default validateUser;
