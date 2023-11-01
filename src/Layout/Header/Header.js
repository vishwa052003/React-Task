import React from "react";
import { NavLink } from "react-router-dom";
import AttractionsIcon from '@mui/icons-material/Attractions';


export const Header = () => {
  return (
    <body className="body">
    <div>
      <nav className="navbar navbar-bg navbar-expand-lg ">
        <div className="container-fluid bg-dark ms-1  " id="nav">
          <NavLink to="/" className="navbar-brand text-light fs-2">
           React
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-light active mt-2 fs-5"
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle text-light mt-2 fs-5"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hooks
                </a>
                <ul
                  className="dropdown-menu hooks"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="nav-item bg-warning" >
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to=""
                    >
                      UseReducer
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="ContextForm"
                    >
                      useState
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light mt-2 fs-5"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hooks with API
                </a>
                <ul
                  className="dropdown-menu hooks"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="/Read"
                    >
                      useState-API
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="Reducerform"
                    >
                      useReducer-API
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="ContextForm"
                    >
                      useContext-API
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="/Reduxform "
                    >
                     <AttractionsIcon /> Redux API
                    </NavLink>

                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="/SagaForm" href="/SagaForm"
                    >
                      Saga-API
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    </body>
  );
};