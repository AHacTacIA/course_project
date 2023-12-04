
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullRecipe, Registration, AddRecipe, Login } from "./pages";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
            <Route path= "/" element = {<Home />}/>
            <Route path= "/recipes/:id" element = {<FullRecipe />}/>
            <Route path= "/add-recipe" element = {<AddRecipe />}/>
            <Route path= "/login" element = {<Login />}/>
            <Route path= "/register" element = {<Registration />}/>
            {/*<Home />*/}
            {/*<FullRecipe />*/}
            {/*<AddRecipe />*/}
            {/*<Login />*/}
            {/*<Registration />*/}
        </Routes>
      </Container>
    </>
  );
}

export default App;
