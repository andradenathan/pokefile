import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Profile from './pages/Profile';
import Trainers from './pages/Trainers';
import Bag from './pages/Bag';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
            <Routes>
                <Route path="/pokedex" element={<Pokedex/>} />
            </Routes>
            <Routes>
                <Route path="/trainers" element={<Trainers/>} />
            </Routes>
            <Routes>
                <Route path="/bag" element={<Bag/>} />
            </Routes>
            <Routes>
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );  
}

export default Router;