import React, { useContext, useEffect } from "react";

import api from "./../../services/api";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragemAvaliacaoConsultoria from "./../../components/AsideFiltragemAvaliacaoConsultoria/index";

import "./styles.css";

function ListagemConsultoria() {
  const { token } = useContext(StoreContext);

  useEffect(() => {}, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader iconeDestaque="consultor" />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideFiltragemAvaliacaoConsultoria papelUsuario="CONSULTOR" />
      </div>

      {/* TODO trocar ID dessa div*/}
      <div id="equipes-com-artefatos-para-consultoria">
        <div style={{ marginLeft: "390px", marginTop: "30px" }}>
          <h2>Olá, consultor!</h2>
        </div>
        <div>
          <h5
            style={{ marginLeft: "390px" }}
            className="mb-5"
            id="saudacao-parte-1"
          >
            Lhe foram enviados essas versões de artefatos de Pitches. Dê uma
            olhada e devolva-os com feedbacks! <br />
            Isso ajudará muito as equipes a desenvolver um pitch melhor!
          </h5>
        </div>
      </div>
    </div>
  );
}

export default ListagemConsultoria;
