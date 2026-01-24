import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar navbar-expand-lg" id="navbar">
      <div className="container-fluid">
        <Link className=" fs-4 fw-bold text-beige navbar-brand" to="/">
          Add Todo
        </Link>

        <div className="container-fluid">
          
             
                <Link className="nav-link text-beige fs-4 fw-bold " to="/todos">
                  Show All Todos
                </Link>
              
          
        </div>

        <div className="register">
          {!isAuthenticated && (
            <Link
              to="/register"
              className="btn btn-outline-primary btn-sm mx-1"
            >
              Sign up
            </Link>
          )}
        </div>

        {isAuthenticated ? (
          <Link to="/logout" className="btn btn-outline-primary">
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline-primary btn-sm mx-1"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
