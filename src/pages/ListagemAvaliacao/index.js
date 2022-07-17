import React, { useContext, useEffect } from "react";

import api from "./../../services/api";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragemAvaliacaoConsultoria from "./../../components/AsideFiltragemAvaliacaoConsultoria/index";

import "./styles.css";

function ListagemAvaliacao() {
  const { token } = useContext(StoreContext);

  useEffect(() => {}, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader iconeDestaque="avaliador" />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideFiltragemAvaliacaoConsultoria papelUsuario="AVALIADOR" />
      </div>

      {/* TODO trocar ID dessa div*/}
      <div id="dados-lean-canvas-para-leitura"></div>
    </div>
  );
}

export default ListagemAvaliacao;
