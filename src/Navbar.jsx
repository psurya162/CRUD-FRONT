import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to='/dashboard'>
                       Dashboard
                    </Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/register">
                                    Register
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/login">
                                   Login
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/alluser">
                                   All User
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/card">
                                   Cards
                                </Link>
                            </li>
                           
                          
                        </ul>
                       
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
