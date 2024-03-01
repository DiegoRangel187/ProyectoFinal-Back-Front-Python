import React,{useState, useEffect} from 'react';//react hooks, useState and useEffect for state and lifecycle
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api from './API'
import './App.css';
import Signin from './components/Signin';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function Layout ({children}) {
    return (
        <div className='content'>
            {children}
        </div>
    )
}

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login/login' element={<Layout><Login/></Layout>}/>
                <Route path='/login/signin' element={<Layout><Signin/></Layout>}/>
                <Route path='/task/tasks' element={<Layout><Dashboard/></Layout>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;

/*
    <div className="Signin">
        <Signin url={api}/>
    </div>  

    <div className='Login'>
        <Login url={api}/>
    </div>

    <div className='Dashboard'>
        <Dashboard url={api}/>
    </div>
*/