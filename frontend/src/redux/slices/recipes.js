import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../axios";
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async() => {
    const {data} = await axios.get('/recipes');
    return data
});

export const fetchTags = createAsyncThunk('recipes/fetchRecipes', async() => {
    const {data} = await axios.get('/tags');
    return data
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
        // [fetchTags.pending]: (state) =>{
        //     state.tags.items = [];
        //     state.tags.status = 'loading';
        // },
        // [fetchTags.fulfilled]: (state, action) =>{
        //     state.tags.items = action.payload;
        //     state.tags.status = 'loaded';
        // },
        // [fetchTags.rejected]: (state) =>{
        //     state.tags.items = [];
        //     state.tags.status = 'error';
        // },
    },
});

export const recipeReducer = recipesSlice.reducer;