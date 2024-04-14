import React from "react"
import Login from "../pages/Login"
import { Routes, Route } from "react-router-dom";

const RouterView = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    )
}

export default RouterView