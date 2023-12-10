import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'Incorrect mail format').isEmail(),
    body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
    body('fullName','Enter name').isLength({ min: 3 }),
    body('avatarUrl','Wrong link to avatar').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Incorrect mail format').isEmail(),
    body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
];

export const recipeCreateValidation = [
    body('title', 'Enter a recipe title').isLength({min: 3}).isString(),
    body('text', 'Enter a recipe text').isLength({min: 10}).isString(),
    body('tags', 'Incorrect tag format').optional().isString(),
    body('imageUrl','Wrong link to image').optional().isString(),
];