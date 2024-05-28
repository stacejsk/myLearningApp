const { body, validationResult } = require('express-validator');

// Middleware to validate and handle errors for profile updates in one step
const validateProfileUpdate = (req, res, next) => {
    // Perform validation directly
    body('name').optional().trim().escape().isLength({ min: 1 }).withMessage('Name cannot be empty').run(req);
    body('email').optional().isEmail().withMessage('Must be a valid email address').normalizeEmail().run(req);

    // Check the result of the validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, send a 400 response with the error details
        return res.status(400).json({ errors: errors.array() });
    }
    // If no errors, proceed to the next middleware or route handler
    next();
};

module.exports = validateProfileUpdate;
