import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="menu"> {/*Rotas */}
      <NavLink to="/home" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Home
      </NavLink>

      <NavLink to="/evento" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Eventos
      </NavLink>

      <NavLink to="/cadastrar" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Cadastrar
      </NavLink>

      <NavLink to="/login" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Sair
      </NavLink>
    </nav>
  );

  }