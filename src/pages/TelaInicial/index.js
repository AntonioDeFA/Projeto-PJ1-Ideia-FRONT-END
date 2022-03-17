import React, { useState } from "react";

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from '../../components/AsideFiltragem';

import ListaCardsCompeticoesAbertas from '../../components/ListaCardsCompeticoesAbertas';
import ListaCardsMinhasCompeticoes from '../../components/ListaCardsMinhasCompeticoes';

function TelaInicial() {
  const [isCompeticoesAbertas, setCompeticoesAbertas] = useState(true);

  const verificarTipoCompeticoes = (isCompeticoesAbertas) => {
    setCompeticoesAbertas(isCompeticoesAbertas);
  }

  return (
    <div id="minhas-competicoes">
      <DefaultHeader />
      <div className="row">
        <div className="col-3">
          <AsideFiltragem verificarTipoCompeticoes={verificarTipoCompeticoes} />
        </div>
        <div className="col p-0">
          { isCompeticoesAbertas ? <ListaCardsCompeticoesAbertas /> : <ListaCardsMinhasCompeticoes /> }
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;