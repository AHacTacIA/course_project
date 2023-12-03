import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'Incorrect mail format').isEmail(),
    body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
    body('fullName','Enter name').isLength({ min: 3 }),
    body('avatarUrl','Wrong link to avatar').optional().isURL(),
];