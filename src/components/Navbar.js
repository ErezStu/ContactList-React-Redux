import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="col-md-12 bg-success py-2">
      <nav className="navbar bg-success navbar-dark">
        <Link to="/" className="navbar-brand">
          Contact List
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
