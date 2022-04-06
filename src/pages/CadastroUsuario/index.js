import React from "react";

import "./styles.css";
import DadosUsuario from "../../components/DadosUsuario";

function CadastroUsuario() {
  return (
    <div id="pagina-cadastro" className="tamanho-maximo fundo-amarelo">
      <div className="elementos-centralizados tamanho-maximo">
        <DadosUsuario />
      </div>
    </div>
  );
}

export default CadastroUsuario;
