import Joi from 'joi';
import _ from 'lodash';
import BadRequest from './handler/Exceptions/BadRequest';

const validate = (schema) => (req, res, next) => {
	const validSchema = _.pick(schema, ['params', 'query', 'body', 'headers']);
	const object = _.pick(req, Object.keys(validSchema));
	const { error, value } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'path', wrap: { label: false } }, abortEarly: false })
		.validate(object);
	if (error) {
		return next(new BadRequest(400, null, error.details.flatMap(x=>[x.message, ])));
	}
	Object.assign(req, value);
	return next();
};

export default validate;
