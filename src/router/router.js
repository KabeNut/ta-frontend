import React from "react"
import Login from "../pages/Login"
import { Routes, Route, Navigate } from "react-router-dom";
import MenuLayout from "../components/MenuLayout";
import Home from "../pages/Home";
import TableEws from "../pages/TableEws";
import EnhancedTable from "../pages/Playground";
import Form from "../pages/Form";

const RouterView = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<MenuLayout />}>
                <Route path='/home' element={<Home />} />
                <Route path='/TableEws' element={<TableEws />} />
            </Route>
            <Route path='/form/:id' element={<Form />} />
            <Route path='/form' element={<Form />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default RouterView