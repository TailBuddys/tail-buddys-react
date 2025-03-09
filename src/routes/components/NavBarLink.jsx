import React from "react";
import { Link } from "react-router-dom";

export default function NavBarLink({ to, children, sx = { color: "black" } }) {
  return (
    <Link to={to} style={{ textDecoration: "none", ...sx }}>
      {children}
    </Link>
  );
}
