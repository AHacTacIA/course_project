import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../axios";
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async() => {
    const {data} = await axios.get('/recipes');
    return data
});

export const fetchTags = createAsyncThunk('recipes/fetchTags', async() => {
    const {data} = await axios.get('/tags');
    return data
});

export const fetchRemoveRecipes = createAsyncThunk('recipes/fetchRemoveRecipes', async(id) => {
    await axios.delete(`/recipes/${id}`);
});

const initialState = {
    recipes: {
        items: [],
        status: 'loading'
    },
    tags:  {
        items: [],
        status: 'loading'
    },
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение рецептов
        [fetchRecipes.pending]: (state) =>{
            state.recipes.items = [];
            state.recipes.status = 'loading';
        },
        [fetchRecipes.fulfilled]: (state, action) =>{
            state.recipes.items = action.payload;
            state.recipes.status = 'loaded';
        },
        [fetchRecipes.rejected]: (state) =>{
            state.recipes.items = [];
            state.recipes.status = 'error';
        },
        //Получение тегов
        [fetchTags.pending]: (state) =>{
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) =>{
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) =>{
            state.tags.items = [];
            state.tags.status = 'error';
        },
        //Удаление рецептов
        [fetchRemoveRecipes.pending]: (state, action) =>{
            state.recipes.items = state.recipes.items.filter(obj => obj._id !== action.meta.arg);
        },
    },
});

export const recipeReducer = recipesSlice.reducer;