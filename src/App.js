import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from "./Components/Home";
import Feature1 from "./Components/Deblur";
import Signin from "./Components/Signin";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/feature" element={<Feature1 />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          
          
        </Routes>
      </BrowserRouter>

    </>

   
  );
}

export default App;