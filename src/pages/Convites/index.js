import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import StoreContext from "../../store/context";
import DefaultHeader from "../../components/DefaultHeader";

import "./styles.css";

function Convites() {
  const { papelUsuario } = useParams();
  const { token } = useContext(StoreContext);

  const [convites, setConvites] = useState([]);

  const responderConvite = (convite, aceito) => {
    console.log(aceito);
    // let resposta = {
    //   idCompeticao: convite.idCompeticao,
    //   aceito,
    //   tipoConvite: papelUsuario,
    // };

    // api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    // api.post("/responder-convite", resposta).then((response) => {
    //   obterConvites();
    // });
  };

  const obterConvites = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/convites-${papelUsuario}`).then((response) => {
      const { data } = response;
      setConvites(data);
      console.log(data);
    });
  };

  useEffect(() => {
    obterConvites();
  }, [papelUsuario]);

  return (
    <div id="cadastro-equipe">
      <DefaultHeader />
      <div className="elementos-centralizados">
        <div id="dados-equipe">
          <div className="mb-4">
            <h2 id="nome-pagina">Olá, {papelUsuario}!</h2>
          </div>
          <div>
            <h5 className="mb-5">
              Lhe foram feitos estes convites para participar destas competições
              como {papelUsuario}.<br />
              <br />
              Dê uma olhada e responda se deseja ou não participar da
              competição!
            </h5>
          </div>

          <div id="lista-convites-div" className="elementos-centralizados">
            <ul id="lista-convites" className="mb-5">
              <li className="item-list-convite">
                <div className="convite">
                  <div id="nome-competicao-convite">
                    <h4 className="nome-competicao-convite-h4">
                      Nome Competicao
                    </h4>
                  </div>
                  <div className="botoes-aceitar-recusar-convite">
                    <div
                      className="btn-aceitar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, true);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-check"></i>
                    </div>
                    <div
                      className="btn-recusar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, false);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-x"></i>
                    </div>
                  </div>
                </div>
              </li>

              <li className="item-list-convite">
                <div className="convite">
                  <div id="nome-competicao-convite">
                    <h4 className="nome-competicao-convite-h4">
                      Nome Competicao
                    </h4>
                  </div>
                  <div className="botoes-aceitar-recusar-convite">
                    <div
                      className="btn-aceitar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, true);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-check"></i>
                    </div>
                    <div
                      className="btn-recusar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, false);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-x"></i>
                    </div>
                  </div>
                </div>
              </li>

              <li className="item-list-convite">
                <div className="convite">
                  <div id="nome-competicao-convite">
                    <h4 className="nome-competicao-convite-h4">
                      Nome Competicao
                    </h4>
                  </div>
                  <div className="botoes-aceitar-recusar-convite">
                    <div
                      className="btn-aceitar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, true);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-check"></i>
                    </div>
                    <div
                      className="btn-recusar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, false);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-x"></i>
                    </div>
                  </div>
                </div>
              </li>

              <li className="item-list-convite">
                <div className="convite">
                  <div id="nome-competicao-convite">
                    <h4 className="nome-competicao-convite-h4">
                      Nome Competicao
                    </h4>
                  </div>
                  <div className="botoes-aceitar-recusar-convite">
                    <div
                      className="btn-aceitar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, true);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-check"></i>
                    </div>
                    <div
                      className="btn-recusar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, false);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-x"></i>
                    </div>
                  </div>
                </div>
              </li>

              <li className="item-list-convite">
                <div className="convite">
                  <div id="nome-competicao-convite">
                    <h4 className="nome-competicao-convite-h4">
                      Nome Competicao
                    </h4>
                  </div>
                  <div className="botoes-aceitar-recusar-convite">
                    <div
                      className="btn-aceitar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, true);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-check"></i>
                    </div>
                    <div
                      className="btn-recusar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, false);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-x"></i>
                    </div>
                  </div>
                </div>
              </li>

              <li className="item-list-convite">
                <div className="convite">
                  <div id="nome-competicao-convite">
                    <h4 className="nome-competicao-convite-h4">
                      Nome Competicao
                    </h4>
                  </div>
                  <div className="botoes-aceitar-recusar-convite">
                    <div
                      className="btn-aceitar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, true);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-check"></i>
                    </div>
                    <div
                      className="btn-recusar-convite elementos-centralizados"
                      onClick={() => {
                        responderConvite(null, false);
                      }}
                    >
                      <i className="icone-convite fa-solid fa-x"></i>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Convites;
