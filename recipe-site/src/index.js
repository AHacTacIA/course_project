import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {registerValidation, loginValidation, recipeCreateValidation} from './validations.js';
import {checkAuth, handleValidationsErrors} from './utils/index.js';
import { UserController, RecipeController} from './controllers/index.js';
mongoose
    .connect('mongodb+srv://admin:9999999@cluster0.ytbgb2f.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null,'uploads');
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.post('/auth/register', registerValidation, handleValidationsErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationsErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});


app.get('/tags', RecipeController.getLastTags);
app.get('/recipes/tags', RecipeController.getLastTags);
app.get('/recipes', RecipeController.getAll);
app.get('/recipes/:id', RecipeController.getOne);
app.post('/recipes', checkAuth, recipeCreateValidation, handleValidationsErrors, RecipeController.create);
app.delete('/recipes/:id', checkAuth, RecipeController.remove);
app.patch('/recipes/:id', checkAuth, recipeCreateValidation, handleValidationsErrors, RecipeController.update);

app.listen(4444,(err) => {
    if (err){
        return console.log(err);
    }

    console.log('Server OK');
});