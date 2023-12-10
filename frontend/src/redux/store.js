import {configureStore} from '@reduxjs/toolkit';
import {recipeReducer} from "./slices/recipes";
import {authReducer} from "./slices/auth";


const store = configureStore({
    reducer: {
        recipes: recipeReducer,
        auth: authReducer,
    }
})

export default store;