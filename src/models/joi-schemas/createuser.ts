import Joi from 'Joi';

export const CreateUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    fullName: Joi.string().custom((value, helper) => {
        const fullName = helper.state.ancestors[0].firstName + '' + helper.state.ancestors[0].lastName;
        if (value !== fullName) {
            return helper.error("FullName is not matched");
        };
        return value;
    }).required(),
    gmail: Joi.string().email().required,
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().length(10).required(),
    address: Joi.string().max(50),
});
