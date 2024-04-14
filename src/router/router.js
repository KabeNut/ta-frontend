import React from "react"
import Login from "../pages/Login"
import { Routes, Route } from "react-router-dom";
import MenuLayout from "../components/MenuLayout";
import Home from "../pages/Home";

const RouterView = () => {
    return (
        <Routes>
            <Route element={<MenuLayout />}>
                <Route path='/' element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default RouterView