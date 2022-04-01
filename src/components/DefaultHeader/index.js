import React, { useContext } from "react";
import StoreContext from "../../store/context";
import { Navigate } from "react-router-dom";

import ImagemLogo from '../../assets/images/Imagem1.svg';
import Dropdown from '../../assets/images/Dropdown.svg';
import Grupo from '../../assets/images/Grupo.svg';
import Trofeu from '../../assets/images/Trofeu.svg';
import Confirma from '../../assets/images/Confirma.svg';

import "./styles.css";

function DefaultHeader() {

  const { setToken } = useContext(StoreContext);

  const fazerLogoff = () => {
    setToken('');
    <Navigate to="/login" />
  }

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
              <a
                className="nav-link active bg-light p-0"
                aria-current="page"
                href="google.com">

                <img
                  src={Trofeu}
                  alt="navegacao_trofeu"
                />
              </a>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="google.com">

                <img
                  src={Confirma}
                  alt="navegacao_confirma"
                />
              </a>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="google.com">
                <img
                  src={Confirma}
                  alt="navegacao_confirma"
                />
              </a>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="google.com">

                <img
                  src={Grupo}
                  alt="navegacao_grupo"
                />
              </a>
            </li>

            <li className="nav-item mt-0 pt-3 pb-3 px-2">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="google.com">

                <img
                  src={Grupo}
                  alt="navegacao_grupo"
                  className="img-fluid"
                />

              </a>
            </li>
          </ul>

          <div className="row dropdown">
            <div className="col elementos-alinhados-esquerda">
              <h6 className="fw-bold nome-usuario">nome do usuário</h6>
            </div>
            <div className="col ">
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
              <div className="dropdown-menu ms-5 p-0">
                <ul className="list-group ms-3 p-0" aria-labelledby="navbarDropdownMenu">
                  <li className="list-group-item m-0 p-0 border border-0">
                    <a href="" className="nav-link text-dark">
                      <h6>Meus dados</h6>
                    </a>
                  </li>

                  <li className="list-group-item m-0 p-0 border border-0">
                    <a href="" className="nav-link text-dark pt-0" onClick={fazerLogoff}>
                      <h6 onClick={fazerLogoff}>Sair</h6>
                    </a>
                  </li>
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