import React from "react"
import Login from "../pages/Login"
import { Routes, Route, Navigate } from "react-router-dom";
import MenuLayout from "../components/MenuLayout";
import Home from "../pages/Home";
import TableEws from "../pages/TableEws";
import Form from "../pages/Form";
import Patient from "../pages/Patient";
import FormPatient from "../pages/FormPatient";
import Detail from "../pages/Detail";

const RouterView = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<MenuLayout />}>
                <Route path='/home' element={<Home />} />
                <Route path='/TableEws' element={<TableEws />} />
                <Route path='/Patient' element={<Patient />} />
                <Route path='/Detail/:id' element={<Detail />} />
            </Route>
            <Route path='/form/:id' element={<Form />} />
            <Route path='/form' element={<Form />} />
            <Route path='/formPatient/:id' element={<FormPatient />} />
            <Route path='/formPatient' element={<FormPatient />} />
        </Routes>
    )
}

export default RouterView