import React from "react";

import ImagemLogo from '../../assets/images/Imagem1.png';
import Dropdown from '../../assets/images/Dropdown.png';
import Grupo from '../../assets/images/Grupo.png';
import Trofeu from '../../assets/images/Trofeu.png';
import Confirma from '../../assets/images/Confirma.png';

function DefaultHeader() {
  return (
    <div id="component-defaultHeader">
      <div className="bg-warning navbar navbar-light text-white pb-0 pt-0">
        <div className="container-fluid">

          <img
            src={ImagemLogo}
            alt="imagem logo"
            className="img-fluid m-3"
            height="100"
            width="150"
          />

          <ul className="nav nav-pills justify-content-center">

            <li className="nav-item bg-light">
              <a
                class="nav-link active bg-light p-0"
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
                class="nav-link active bg-warning p-0"
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
                class="nav-link active bg-warning p-0"
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
                class="nav-link active bg-warning p-0"
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
                class="nav-link active bg-warning p-0"
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

          <h6 className="ms-0">nome do usuário</h6>

          <div className="dropdown">
            <img
              src={Dropdown}
              alt="imagem_logo_2"
              className="img-fluid dropdown-toggle m-3"
              height="120"
              width="120"
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
  );
}

export default DefaultHeader;