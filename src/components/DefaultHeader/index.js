import React from "react";

import ImagemLogo from '../../assets/images/Imagem1.svg';
import Dropdown from '../../assets/images/Dropdown.svg';
import Grupo from '../../assets/images/Grupo.svg';
import Trofeu from '../../assets/images/Trofeu.svg';
import Confirma from '../../assets/images/Confirma.svg';

import "./styles.css";

function DefaultHeader() {
  return (
    <div id="component-defaultHeader">
      <div className="bg-warning navbar navbar-light text-white pb-2 pt-2">
        <div className="container-fluid ">

          <img
            src={ImagemLogo}
            alt="imagem logo"
            className="img-fluid m-3"
            height="100"
            width="150"
          />

          <ul className="nav nav-pills justify-content-center ">

            <li className="nav-item bg-light mt-0">
              <a
                className="nav-link active bg-light p-0"
                aria-current="page"
                href="#">

                <img
                  src={Trofeu}
                  alt="navegacao_trofeu"
                  className="img-fluid"
                />

              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="#">

                <img
                  src={Confirma}
                  alt="navegacao_confirma"
                  className="img-fluid"
                />

              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="#">
                <img
                  src={Confirma}
                  alt="navegacao_confirma"
                  className="img-fluid"
                />
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="#">

                <img
                  src={Grupo}
                  alt="navegacao_grupo"
                  className="img-fluid"
                />

              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active bg-warning p-0"
                aria-current="page"
                href="#">

                <img
                  src={Grupo}
                  alt="navegacao_grupo"
                  className="img-fluid"
                />

              </a>
            </li>

          </ul>

          <div className="row">
            <div className="col elementos-alinhados-esquerda">
              <h6 className="fw-bold nome-usuario">nome do usuário</h6>
            </div>
            <div className="col dropdown">
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
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenu">
                <li>
                  <a href="#" className="nav-link text-dark">
                    <h6>Meus dados</h6>
                  </a>
                </li>

                <li>
                  <a href="#" className="nav-link text-dark pt-0">
                    <h6>Sair</h6>
                  </a>
                </li>
              </ul>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default DefaultHeader;