import React from 'react';
import './App.css';
import { Routing } from "./components/Routes";
import { Navbar } from "./components/Navbar/Navbar";


export const App = () => {
    return (
        <div className="App">
            <Navbar/>
            <Routing/>
        </div>
    );
}

