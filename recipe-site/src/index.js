import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {registerValidation, loginValidation, recipeCreateValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/userController.js';
import * as RecipeController from './controllers/recipeController.js';
mongoose
    .connect('mongodb+srv://admin:9999999@cluster0.ytbgb2f.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();



app.use(express.json());


app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/recipes', RecipeController.getAll);
app.get('/recipes/:id', RecipeController.getOne);
app.post('/recipes', checkAuth, recipeCreateValidation,RecipeController.create);
app.delete('/recipes/:id', checkAuth, RecipeController.remove);
app.patch('/recipes/:id', checkAuth, RecipeController.update);

app.listen(4444,(err) => {
    if (err){
        return console.log(err);
    }

    console.log('Server OK');
});