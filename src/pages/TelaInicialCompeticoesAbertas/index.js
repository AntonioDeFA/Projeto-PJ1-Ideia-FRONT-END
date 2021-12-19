import React from "react";

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from "../../components/AsideFiltragem";

// import { Link } from "react-router-dom";

// import api from "../../services/api";

import "./styles.css";

function TelaInicialCompeticoesAbertas() {
  return (
    <div>
      <DefaultHeader />
      <AsideFiltragem hasCheckboxes="true" />
    </div>
  );
}

export default TelaInicialCompeticoesAbertas;