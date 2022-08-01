import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import api from "./../../services/api";
import Trofeu from "../../assets/images/Trofeu.svg";
import { Badge } from "@mui/material";
import ImagemLogo from "../../assets/images/Imagem1.svg";
import StoreContext from "../../store/context";
import AlteracaoConvitesContext from "../../utils/context/alteracaoConvites";

import "./styles.css";

function DefaultHeader(props) {
  const { token, setToken } = useContext(StoreContext);
  const houveAlteracao = useContext(AlteracaoConvitesContext);

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [qntdConvitesAvaliador, setQntdConvitesAvaliador] = useState(0);
  const [qntdConvitesConsultor, setQntdConvitesConsultor] = useState(0);

  const fazerLogoff = () => {
    setToken("");
    <Navigate to="/" />;
  };

  const handleIconeComDestaque = (icone) => {
    if (props.iconeDestaque === icone) {
      return "nav-item mt-0 pt-3 pb-3 px-2 bg-light elementos-centralizados";
    }
    return "nav-item mt-0 pt-3 pb-3 px-2 elementos-centralizados";
  };

  const consultarQuantidadeConvites = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get("/convites/AVALIADOR/quantidade").then((response) => {
      setQntdConvitesAvaliador(response.data.quantidade);
    });

    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get("/convites/CONSULTOR/quantidade").then((response) => {
      setQntdConvitesConsultor(response.data.quantidade);
    });
  };

  useEffect(() => {
    consultarQuantidadeConvites();
  }, [houveAlteracao]);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get("/usuario-logado").then((response) => {
      setUsuarioLogado(response.data);
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
          {!props.isLoginViaToken ? (
            <ul
              id="lista-icones-centrais"
              className="nav nav-pills justify-content-center"
              style={{ width: "30.2%" }}
            >
              <li
                className={handleIconeComDestaque("trofeu")}
                id="op-trofeu-cabecalho"
              >
                <Link to={"/inicio/abertas"}>
                  <img src={Trofeu} alt="navegacao_trofeu" />
                </Link>
              </li>

              <li
                className={handleIconeComDestaque("convites-avaliador")}
                style={{ marginTop: "10px" }}
                id="op-convites-avaliador-cabecalho"
              >
                <Link to={"/convites-avaliador"}>
                  <Badge
                    color="error"
                    badgeContent={qntdConvitesAvaliador}
                    showZero
                    className="mt-2"
                  >
                    <i className="icone-cabecalho fa-regular fa-circle-check"></i>
                  </Badge>
                </Link>
              </li>

              <li
                className={handleIconeComDestaque("avaliador")}
                id="op-avaliador-cabecalho"
              >
                <Link to={"/listagem-avaliacao"}>
                  <i className="icone-cabecalho fa-regular fa-circle-check mt-2"></i>
                </Link>
              </li>

              <li
                className={handleIconeComDestaque("convites-consultor")}
                id="op-convites-consultor-cabecalho"
              >
                <Link to={"/convites-consultor"}>
                  <Badge
                    color="error"
                    badgeContent={qntdConvitesConsultor}
                    showZero
                    className="mt-2"
                  >
                    <i className="icone-cabecalho fa-solid fa-users"></i>
                  </Badge>
                </Link>
              </li>

              <li
                className={handleIconeComDestaque("consultor")}
                id="op-consultor-cabecalho"
              >
                <Link to={"/listagem-consultoria"}>
                  <i className="icone-cabecalho fa-solid fa-users mt-2"></i>
                </Link>
              </li>
            </ul>
          ) : null}

          <div className="elementos-alinhados-esquerda">
            <h6 className="fw-bold nome-usuario" id="nome-usuario-para-teste">
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
                  {props.isLoginViaToken ? null : (
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
                  )}

                  <button
                    type="button"
                    onClick={fazerLogoff}
                    className={
                      props.isLoginViaToken
                        ? "btn btn-link nav-link text-dark pt-0 mt-2"
                        : "btn btn-link nav-link text-dark pt-0"
                    }
                  >
                    <li className="list-group-item m-0 p-0 border border-0">
                      <h6 className={props.isLoginViaToken ? "sem-margem" : ""}>
                        Sair
                      </h6>
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
