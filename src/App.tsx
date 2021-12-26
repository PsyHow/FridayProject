import React, { useEffect } from 'react';
import './App.css';
import { Routing } from "./components/Routes";
import { Navbar } from "./components/common/Navbar/Navbar";
import { authMe } from "./bll/loginReducer";
import { useDispatch } from "react-redux";


export const App = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(authMe())
    },[dispatch])

    return (
        <div className="App">
            <Navbar/>
            <Routing/>
        </div>
    );
}

