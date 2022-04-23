import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import StoreContext from "../../store/context";

import api from "./../../services/api";
import Grupo from "../../assets/images/Grupo.svg";
import Trofeu from "../../assets/images/Trofeu.svg";
import Confirma from "../../assets/images/Confirma.svg";
import ImagemLogo from "../../assets/images/Imagem1.svg";

import "./styles.css";

function DefaultHeader() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const { token, setToken } = useContext(StoreContext);

  const fazerLogoff = () => {
    setToken("");
    <Navigate to="/" />;
  };

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get("/usuario-logado").then((response) => {
      const { data } = response;
      setUsuarioLogado(data);
    });
  }, [token]);

  return (
    <div id="component-defaultHeader">
      <div className="bg-warning navbar navbar-light text-white pb-0 pt-0">
        <div className="container-fluid ">
          <img
            src={ImagemLogo}
            alt="imagem logo"
            className="img-fluid m-3"
            height="100"
            width="150"
          />
          <div></div>
          <ul
            className="nav nav-pills justify-content-center"
            style={{ width: "30.2%" }}
          >
            <li className="nav-item bg-light mt-0 pt-3 pb-3 px-2">
              <Link to={"/inicio"}>
                <img src={Trofeu} alt="navegacao_trofeu" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/inicio"}>
                <img src={Confirma} alt="navegacao_confirma" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/inicio"}>
                <img src={Confirma} alt="navegacao_confirma" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/inicio"}>
                <img src={Grupo} alt="navegacao_grupo" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/inicio"}>
                <img src={Grupo} alt="navegacao_grupo" className="img-fluid" />
              </Link>
            </li>
          </ul>

          <div className="elementos-alinhados-esquerda">
            <h6 className="fw-bold nome-usuario">
              {usuarioLogado?.nomeUsuario}
            </h6>
          </div>

          <div className="row dropdown">
            <div id="dropdown-div">
              <div
                id="navbarDropdownMenu"
                role="button"
                className="img-fluid dropdown-toggle m-3 "
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-address-card"></i>
              </div>
              <div className="dropdown-menu p-0">
                <ul
                  className="list-group p-0 lista-dropdown"
                  aria-labelledby="navbarDropdownMenu"
                >
                  <button
                    type="button"
                    className="btn btn-link nav-link text-dark pt-0"
                  >
                    <li className="list-group-item m-0 p-0 mt-3 border border-0">
                      <Link
                        to={"/cadastro-usuario"}
                        style={{ textDecoration: "none" }}
                      >
                        <h6 style={{ color: "black" }}>Meus dados</h6>
                      </Link>
                    </li>
                  </button>

                  <button
                    type="button"
                    onClick={fazerLogoff}
                    className="btn btn-link nav-link text-dark pt-0"
                  >
                    <li className="list-group-item m-0 p-0 border border-0">
                      <h6>Sair</h6>
                    </li>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultHeader;
