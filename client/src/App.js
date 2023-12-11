import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullRecipe, Registration, AddRecipe, Login } from "./pages";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    },[]);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
            <Route path= "/" element = {<Home />}/>
            <Route path= "/recipes/:id" element = {<FullRecipe />}/>
            <Route path= "/recipes/:id/edit" element = {<AddRecipe />}/>
            <Route path= "/add-recipe" element = {<AddRecipe />}/>
            <Route path= "/login" element = {<Login />}/>
            <Route path= "/register" element = {<Registration />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
