import React from 'react';
import './App.css';
import { Routing } from "./components/Routes";
import { Header } from "./components/Header/Header";
// testing push to GH
export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Routing/>
        </div>
    );
}

