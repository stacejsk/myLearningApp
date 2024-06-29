const { check, validationResult } = require('express-validator');


// Single middleware to validate registration and handle errors
const validateRegistration = async (req, res, next) => {
    // Perform validations
    await check('email').isEmail().run(req);
    await check('username').isAlphanumeric().withMessage('Username must be alphanumeric').run(req);

    // Custom validations to check uniqueness of email and username
    await check('email').custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('Email already exists');
        }
    }).run(req);

    await check('username').custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
            throw new Error('Username already exists');
        }
    }).run(req);

    // Check the result of the validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, send a 400 response with the error details
        return res.status(400).json({ errors: errors.array() });
    }
    // If no errors, proceed to the next middleware or route handler
    next();
};

module.exports = validateRegistration;
