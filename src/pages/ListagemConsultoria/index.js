import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "./../../services/api";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragemAvaliacaoConsultoria from "./../../components/AsideFiltragemAvaliacaoConsultoria/index";

import "./styles.css";

function ListagemConsultoria() {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);

  const [equipes, setEquipes] = useState([]);

  const filtrarEquipesPorCompeticao = (idCompeticao) => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/${idCompeticao}/equipes/para-consultoria`)
      .then((response) => {
        setEquipes(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    filtrarEquipesPorCompeticao(0);
  }, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader iconeDestaque="consultor" />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideFiltragemAvaliacaoConsultoria
          papelUsuario="CONSULTOR"
          filtrarEquipesPorCompeticao={filtrarEquipesPorCompeticao}
        />
      </div>

      <div id="equipes-com-artefatos-para-consultoria">
        <div style={{ marginLeft: "390px", marginTop: "30px" }}>
          <h2>Olá, consultor!</h2>
        </div>
        <div>
          {equipes.length > 0 ? (
            <h5 style={{ marginLeft: "393px" }} className="mb-3">
              Lhe foram enviadas essas versões de artefatos de Pitches. Dê uma
              olhada e devolva-os com feedbacks! <br />
              Isso ajudará muito as equipes a desenvolver um pitch melhor!
            </h5>
          ) : (
            <h5 style={{ marginLeft: "393px" }} className="mb-3">
              Você ainda não possui nenhuma solicitação de consultoria.
            </h5>
          )}
        </div>
      </div>

      <div id="lista-artefatos-div">
        <ul className="lista-artefatos">
          {equipes.map((equipe, index) => {
            return (
              <li key={index} className="item-list-artefato">
                <div className="artefato">
                  <div id="nome-competicao-artefato">
                    <h5 className="nome-competicao-artefato-h4">
                      Equipe {equipe.nomeEquipe}
                    </h5>
                  </div>
                  <div
                    className={
                      (equipe.idPitch && !equipe.idLeanCanvas) ||
                        (!equipe.idPitch && equipe.idLeanCanvas)
                        ? "elementos-centralizados"
                        : "botoes-acessar-artefato"
                    }
                  >
                    {equipe.idPitch ? (
                      <div
                        className="elementos-centralizados cursor-pointer"
                        id={"btn-acessar-pitch-deck" + index}
                      >
                        <i
                          id="btn-acessar-tela-criar-feedbacks-pitch-deck"
                          title="Escrever feedbacks no Pitch Deck"
                          className="icone-artefato fa-solid fa-file-arrow-down"
                          onClick={() => {
                            navigate(
                              `/criar-feedbacks-pitch/${equipe.idEquipe}/${equipe.idPitch}`
                            );
                          }}
                        ></i>
                      </div>
                    ) : null}

                    {equipe.idLeanCanvas ? (
                      <div
                        className="elementos-centralizados cursor-pointer"
                        id={"btn-acessar-lean-canvas" + index}
                      >
                        <i
                          id="btn-acessar-tela-criar-feedbacks-lean-canvas"
                          title="Escrever feedbacks no Lean Canvas"
                          className="icone-artefato fa-brands fa-trello"
                          onClick={() => {
                            navigate(
                              `/criar-feedbacks-lean-canvas/${equipe.idEquipe}/${equipe.idLeanCanvas}`
                            );
                          }}
                        ></i>
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ListagemConsultoria;
