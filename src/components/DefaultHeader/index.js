import React, { useContext } from "react";
import StoreContext from "../../store/context";
import { Link, Navigate } from "react-router-dom";

import Grupo from "../../assets/images/Grupo.svg";
import Trofeu from "../../assets/images/Trofeu.svg";
import Confirma from "../../assets/images/Confirma.svg";
import Dropdown from "../../assets/images/Dropdown.svg";
import ImagemLogo from "../../assets/images/Imagem1.svg";

import "./styles.css";

function DefaultHeader() {
  const { setToken } = useContext(StoreContext);

  const fazerLogoff = () => {
    setToken("");
    <Navigate to="/login" />;
  };

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

          <ul className="nav nav-pills justify-content-center ">
            <li className="nav-item bg-light mt-0 pt-3 pb-3 px-2">
              <Link to={"/"}>
                <img src={Trofeu} alt="navegacao_trofeu" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/"}>
                <img src={Confirma} alt="navegacao_confirma" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/"}>
                <img src={Confirma} alt="navegacao_confirma" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/"}>
                <img src={Grupo} alt="navegacao_grupo" />
              </Link>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <Link to={"/"}>
                <img src={Grupo} alt="navegacao_grupo" className="img-fluid" />
              </Link>
            </li>
          </ul>

          <div className="row dropdown">
            <div className="col elementos-alinhados-esquerda">
              <h6 className="fw-bold nome-usuario">nome do usuário</h6>
            </div>
            <div id="dropdown-div" className="col">
              <img
                src={Dropdown}
                alt="imagem_logo_2"
                className="img-fluid dropdown-toggle m-3 "
                height="70"
                width="70"
                id="navbarDropdownMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <div className="dropdown-menu p-0">
                <ul
                  className="list-group p-0"
                  aria-labelledby="navbarDropdownMenu"
                >
                  <button
                    type="button"
                    className="btn btn-link nav-link text-dark pt-0"
                  >
                    <li className="list-group-item m-0 p-0 mt-2 border border-0">
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
