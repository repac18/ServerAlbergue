import React ,{Fragment}from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const NavHeader=()=>(
    <nav className="navbar">
        <div className="container">
            <Fragment>
                <Link to="/" className="navbar-brand text-light font-weight-bold">
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navegacion"
                    aria-controls="navegacion"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navegacion">
                    <ul className="navbar-nav ml-auto text-right">
                        <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                            <button
                                className="nav-link dropdown-toggle btn btn-block btn-success"
                                data-toggle="dropdown"
                            >Clientes</button>
                            <div className="dropdown-menu" aria-labelledby="navegacion">
                                <Link to="/Clientes" className="dropdown-item">
                                    Ver Clientes
                                </Link>
                                <Link to="/Clientes/Nuevo" className="dropdown-item">
                                    Nuevo Cliente
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                            <button
                                className="nav-link dropdown-toggle btn btn-block btn-success"
                                data-toggle="dropdown"
                            >Productos</button>
                            <div className="dropdown-menu" aria-labelledby="navegacion">
                                <Link to="/Productos" className="dropdown-item">
                                    Ver Productos
                                </Link>
                                <Link to="/Productos/Nuevo" className="dropdown-item">
                                    Nuevo Productos
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                            <button
                                className="nav-link dropdown-toggle btn btn-block btn-success"
                                data-toggle="dropdown"
                            >Mantenimientos</button>
                            <div className="dropdown-menu" aria-labelledby="navegacion">
                                <Link to="/Mantenimientos/TipoProductos" className="dropdown-item">
                                    Ver TipoProductos
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                            <button
                                className="nav-link dropdown-toggle btn btn-block btn-success"
                                data-toggle="dropdown"
                            >Donaciones</button>
                            <div className="dropdown-menu" aria-labelledby="navegacion">
                                <Link to="/Donacion" className="dropdown-item">
                                    Ver Donaciones
                                </Link>
                                <Link to="/Donacion/Nueva" className="dropdown-item">
                                    Nueva Donacion
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </Fragment>
        </div>
    </nav>
);

export default NavHeader;