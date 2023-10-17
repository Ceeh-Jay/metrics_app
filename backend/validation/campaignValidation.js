import Joi from "joi";

const campaignSchema = Joi.object({
  impressions: Joi.number().required().messages({
    "number.base": "impressions must be a number",
    "any.required": "impressions is required",
  }),
  clicks: Joi.number().required().messages({
    "number.base": "clicks must be a number",
    "any.required": "clicks is required",
  }),
  conversions: Joi.number().required().messages({
    "number.base": "conversions must be a number",
    "any.required": "conversions is required",
  }),
  spend: Joi.number().required().messages({
    "number.base": "spend must be a number",
    "any.required": "spend is required",
  }),
});

export { campaignSchema };
