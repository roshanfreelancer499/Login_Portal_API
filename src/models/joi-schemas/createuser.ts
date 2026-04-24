import Joi from 'joi';

export class UserSchema {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for create user route
    */
    public static create(): Joi.Schema {
        return Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            fullName: Joi.string().custom((value, helper) => {
                const fullName = helper.state.ancestors[0].firstName + ' ' + helper.state.ancestors[0].lastName;
                if (value !== fullName) {
                    return helper.error("FullName is not matched");
                };
                return value;
            }).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            phoneNumber: Joi.string().length(10).required(),
            address: Joi.string().max(50),
        })
    }

    public static login(): Joi.Schema {
        return Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    }
};
