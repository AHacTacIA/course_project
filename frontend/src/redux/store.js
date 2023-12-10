import {configureStore} from '@reduxjs/toolkit';
import {recipeReducer} from "./slices/recipes";




const store = configureStore({
    reducer: {
        recipes: recipeReducer,
    }
})

export default store;