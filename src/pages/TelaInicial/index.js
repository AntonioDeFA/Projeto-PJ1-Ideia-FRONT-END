import React, { useState } from "react";

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from "../../components/AsideFiltragem";
import { FiltrosProvider } from "../../utils/filtrosContext";

import ListaCardsCompeticoesAbertas from "../../components/ListaCardsCompeticoesAbertas";
import ListaCardsMinhasCompeticoes from "../../components/ListaCardsMinhasCompeticoes";

function TelaInicial() {
  const [isCompeticoesAbertas, setCompeticoesAbertas] = useState(true);

  const [filtros, setFiltros] = useState({
    nomeCompeticao: "",
    mes: 0,
    ano: 0,
  });

  const verificarTipoCompeticoes = (isCompeticoesAbertas) => {
    setCompeticoesAbertas(isCompeticoesAbertas);
  };

  const realizarFiltragem = (nomeCompeticao, mes, ano) => {
    setFiltros({
      nomeCompeticao,
      mes,
      ano,
    });
  };

  return (
    <div id="minhas-competicoes">
      <DefaultHeader />
      <div className="row">
        <div className="col-3">
          <AsideFiltragem
            verificarTipoCompeticoes={verificarTipoCompeticoes}
            realizarFiltragem={realizarFiltragem}
          />
        </div>
        <div className="col-9 p-0">
          <FiltrosProvider value={filtros}>
            {isCompeticoesAbertas ? (
              <ListaCardsCompeticoesAbertas />
            ) : (
              <ListaCardsMinhasCompeticoes />
            )}
          </FiltrosProvider>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
