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

  const [artefatos, setArtefatos] = useState([]);

  const filtrarEquipesPorCompeticao = (idCompeticao) => {
    console.log(`Filtrando equipes pela competição ${idCompeticao}`);
  };

  useEffect(() => {
    setArtefatos([
      { id: 1, nomeEquipe: "teste" },
      { id: 2, nomeEquipe: "teste" },
      { id: 3, nomeEquipe: "teste" },
      { id: 4, nomeEquipe: "teste" },
      { id: 5, nomeEquipe: "teste" },
      { id: 6, nomeEquipe: "teste" },
      { id: 7, nomeEquipe: "teste" },
      { id: 8, nomeEquipe: "teste" },
    ]);
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
          <h5
            style={{ marginLeft: "393px" }}
            className="mb-3"
            id="saudacao-parte-1"
          >
            Lhe foram enviadas essas versões de artefatos de Pitches. Dê uma
            olhada e devolva-os com feedbacks! <br />
            Isso ajudará muito as equipes a desenvolver um pitch melhor!
          </h5>
        </div>
      </div>

      <div id="lista-artefatos-div">
        <ul className="lista-artefatos">
          {artefatos.map((artefato, index) => {
            return (
              <li key={artefato.id} className="item-list-artefato">
                <div className="artefato">
                  <div id="nome-competicao-artefato">
                    <h5 className="nome-competicao-artefato-h4">
                      Equipe {artefato.nomeEquipe}
                    </h5>
                  </div>
                  <div className="botoes-acessar-artefato">
                    <div
                      className="elementos-centralizados cursor-pointer"
                      id={"btn-acessar-pitch-deck" + index}
                    >
                      <i
                        title="Escrever feedbacks no Pitch Deck"
                        className="icone-artefato fa-solid fa-file-arrow-down"
                      ></i>
                    </div>
                    <div
                      className="elementos-centralizados cursor-pointer"
                      id={"btn-acessar-lean-canvas" + index}
                    >
                      <i
                        title="Escrever feedbacks no Lean Canvas"
                        className="icone-artefato fa-brands fa-trello"
                        onClick={() => {
                          navigate("/criar-feedbacks-lean-canvas/1/5555");
                        }}
                      ></i>
                    </div>
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
