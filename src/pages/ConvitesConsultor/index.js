import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import StoreContext from "../../store/context";
import DefaultHeader from "../../components/DefaultHeader";

function ConvitesConsultor() {
  const { token } = useContext(StoreContext);

  const [convites, setConvites] = useState([]);
  const [mudou, setMudou] = useState(true);

  const responderConvite = (convite, aceito) => {
    let resposta = {
      idCompeticao: convite.idCompeticao,
      aceito,
      tipoConvite: "CONSULTOR",
    };

    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api.post("/responder-convite", resposta).then((response) => {
      obterConvites();
    });
  };

  const obterConvites = () => {
    setMudou(false);
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/convites-consultor`)
      .then((response) => {
        setConvites(response.data);
        setMudou(true);
      })
      .catch((error) => {
        setConvites([]);
        setMudou(true);
        console.log(error);
      });
  };

  useEffect(() => {
    obterConvites();
  }, []);

  return (
    <div id="cadastro-equipe">
      <DefaultHeader iconeDestaque="convites-consultor" />
      <div className="elementos-centralizados">
        <div id="dados-equipe">
          <div className="mb-4">
            <h2 id="nome-pagina">Olá, consultor!</h2>
          </div>
          <div>
            {mudou ? (
              convites.length > 0 ? (
                <h5 className="mb-5" id="saudacao-parte-1">
                  Lhe foram feitos estes convites para participar destas
                  competições como consultor.
                  <br />
                  Dê uma olhada e responda se deseja ou não participar da
                  competição!
                </h5>
              ) : (
                <h5 className="mb-5">
                  Você ainda não possui convites. Quando receber, será
                  notificado por e-mail e poderá visualizar os convites aqui!
                </h5>
              )
            ) : null}
          </div>

          <div id="lista-convites-div" className="elementos-centralizados">
            <ul className="lista-convites mb-5">
              {mudou
                ? convites.map((convite, index) => {
                    return (
                      <li key={convite.id} className="item-list-convite">
                        <div className="convite">
                          <div id="nome-competicao-convite">
                            <h4 className="nome-competicao-convite-h4">
                              <Link
                                className="link-competicao"
                                to={`/dados-competicao/${convite.idCompeticao}/CONSULTOR`}
                              >
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                {"  " + convite.nomeCompeticao}
                              </Link>
                            </h4>
                          </div>
                          <div className="botoes-aceitar-recusar-convite">
                            <div
                              className="btn-aceitar-convite elementos-centralizados"
                              id={"btn-aceitar-convite-consultor" + index}
                              onClick={() => {
                                responderConvite(convite, true);
                              }}
                            >
                              <i className="icone-convite fa-solid fa-check"></i>
                            </div>
                            <div
                              className="btn-recusar-convite elementos-centralizados"
                              id={"btn-recusar-convite-consultor" + index}
                              onClick={() => {
                                responderConvite(convite, false);
                              }}
                            >
                              <i className="icone-convite fa-solid fa-x"></i>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvitesConsultor;
