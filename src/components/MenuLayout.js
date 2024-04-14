import React from "react";
import { Outlet } from "react-router-dom";
import MenuNavigation from "./ui/MenuNavigation";

function MenuLayout() {
  return (
    <>
      <MenuNavigation />
      <Outlet />
    </>
  );
}

export default MenuLayout;