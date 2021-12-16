import React, { useEffect } from 'react';
import './App.css';
import { Routing } from "./components/Routes";
import { Navbar } from "./components/Navbar/Navbar";
import { authMe } from "../src/bll/loginReducer";
import { useDispatch } from "react-redux";


export const App = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(authMe())
    },[])

    return (
        <div className="App">
            <Navbar/>
            <Routing/>
        </div>
    );
}

