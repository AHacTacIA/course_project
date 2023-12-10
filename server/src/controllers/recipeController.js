import RecipeModel from '../models/Recipe.js';
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
    try {
        const doc = new RecipeModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
            user: req.userId,
        });

        const recipe = await doc.save();

        res.json(recipe);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create the recipe',
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const recipes = await RecipeModel.find().populate('user').exec();

        res.json(recipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get recipes',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const recipeID = req.params.id;

        RecipeModel.findOneAndUpdate(
            {_id: recipeID,},
            {$inc: {viewsCount: 1},},
            {returnDocument: 'after',})
            .populate('user').then((doc, err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to get the recipe',
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Recipe not found',
                });
            }


            res.json(doc);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get recipes',
        });
    }
}

export const remove = async (req, res) => {
    try {
        const recipeID = req.params.id;

        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
        let userId;

        if (token) {
            try {
                const decoded = jwt.verify(token, 'secret123');
                userId = decoded._id;
            } catch (err) {
                return res.status(403).json({
                    message: 'No access',
                });
            }
        }


        RecipeModel.findOneAndDelete({
            _id: recipeID,
            user: userId
        }).then((doc, err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to delete recipe',
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Recipe not found',
                });
            }


            res.json({
                success: true,
            });
        });

    } catch
        (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get recipes',
        });
    }
}

export const update = async (req, res) => {
    try {
        const recipeId = req.params.id;

        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
        let userId;

        if (token) {
            try {
                const decoded = jwt.verify(token, 'secret123');
                userId = decoded._id;
            } catch (err) {
                return res.status(403).json({
                    message: 'No access',
                });
            }
        }

        await RecipeModel.updateOne(
            {
                _id: recipeId,
                user: userId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update recipes',
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const recipes = await RecipeModel.find().limit(5).exec();

        const tags = recipes
            .map((obj) => obj.tags)
            .flat()
            .slice(0,5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get recipes',
        });
    }
}