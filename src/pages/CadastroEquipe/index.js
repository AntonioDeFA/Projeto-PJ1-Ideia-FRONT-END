import { Box, TextField, Typography, Modal } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import StoreContext from "../../store/context";

import DefaultHeader from "../../components/DefaultHeader";
import { styleModals } from "../../utils/constantes";

import Botao from "./../../components/Botao/index";
import {
  MSG000,
  MSG003,
  MSG006,
  MSG007,
  MSG014,
} from "./../../utils/mensagens";

import "./styles.css";
import {
  validarCamposObrigatorios,
  validarEmail,
} from "./../../services/utils";
import CardMembro from "../../components/CardMembro";
import api from "../../services/api";
import Mensagem from "../../components/Mensagem";

function CadastroEquipe() {
  const [nomeEquipe, setNomeEquipe] = useState(MSG000);
  const [errorInputNomeEquipe, setErrorInputNomeEquipe] = useState(false);
  const [
    mensagemCampoObrigatorioNomeEquipe,
    setMensagemCampoObrigatorioNomeEquipe,
  ] = useState(MSG000);

  const [nomeMembro, setNomeMembro] = useState(MSG000);
  const [errorInputNomeMembro, setErrorInputNomeMembro] = useState(false);
  const [
    mensagemCampoObrigatorioNomeMembro,
    setMensagemCampoObrigatorioNomeMembro,
  ] = useState(MSG000);

  const [mensagem, setMensagem] = useState(MSG000);

  const [emailMembro, setEmailMembro] = useState(MSG000);
  const [errorInputEmailMembro, setErrorInputEmailMembro] = useState(false);
  const [
    mensagemCampoObrigatorioEmailMembro,
    setMensagemCampoObrigatorioEmailMembro,
  ] = useState(MSG000);

  const [openModalCriarMembro, setOpenModalCriarMembro] = React.useState(false);
  const handleOpenModalCriarMembro = () => setOpenModalCriarMembro(true);
  const handleCloseModalCriarMembro = () => setOpenModalCriarMembro(false);

  const [openModalConfirmarInscricao, setOpenModalConfirmarInscricao] =
    React.useState(false);
  const handleOpenModalConfirmarInscricao = () =>
    setOpenModalConfirmarInscricao(true);
  const handleCloseModalConfirmarInscricao = () =>
    setOpenModalConfirmarInscricao(false);

  const [, setUsuarioLogado] = useState(null);
  const [competicao, setCompeticao] = useState(null);

  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [membros, setMembros] = useState([]);
  const { idCompeticao } = useParams();

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get("/usuario-logado").then((response) => {
      const { data } = response;
      setUsuarioLogado(data);
      setMembros([
        {
          nomeMembro: data.nomeUsuario,
          emailMembro: data.email,
          isLider: true,
        },
      ]);
    });

    api.get(`/competicao/${idCompeticao}`).then((response) => {
      const { data } = response;
      setCompeticao(data);
    });
  }, [token, idCompeticao]);

  const confirmarCriacaoEquipe = () => {
    if (
      validarCamposObrigatorios(
        nomeEquipe,
        setErrorInputNomeEquipe,
        setMensagemCampoObrigatorioNomeEquipe
      )
    ) {
      if (
        membros.length < competicao.qntdMinimaMembrosPorEquipe ||
        membros.length > competicao.qntdMaximaMembrosPorEquipe
      ) {
        setMensagem(
          `Esta competição exige um mínimo de ${competicao.qntdMinimaMembrosPorEquipe} e um máximo de ${competicao.qntdMaximaMembrosPorEquipe} membros por equipe.`
        );
      } else {
        setMensagem(MSG000);
        handleOpenModalConfirmarInscricao();
      }
    }
  };

  const finalizarInscricao = () => {
    let membrosFormatados = membros.map((membro) => {
      return {
        nomeUsuario: membro.nomeMembro,
        email: membro.emailMembro,
      };
    });

    membrosFormatados.splice(0, 1);

    let dadosEquipe = {
      nomeEquipe,
      idCompeticao: competicao.id,
      usuarios: membrosFormatados,
    };
    console.log(dadosEquipe);

    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post("/equipe", dadosEquipe)
      .then((response) => {
        return navigate("/inicio");
      })
      .catch((error) => {
        setMensagem(error.response.data.motivosErros.join("\n"));
        handleCloseModalConfirmarInscricao();
      });
  };

  const adicionarMembro = () => {
    let statusNomeMembro = validarCamposObrigatorios(
      nomeMembro,
      setErrorInputNomeMembro,
      setMensagemCampoObrigatorioNomeMembro
    );
    let statusEmailMembro = validarCamposObrigatorios(
      emailMembro,
      setErrorInputEmailMembro,
      setMensagemCampoObrigatorioEmailMembro
    );
    if (statusNomeMembro && statusEmailMembro) {
      if (validarEmail(emailMembro)) {
        if (confirmarUnicidadeEmail()) {
          if (emailPossuiDominioCorreto()) {
            let membro = {
              nomeMembro,
              emailMembro,
              isLider: false,
            };
            membros.push(membro);
            cancelarCriacaoMembro();
          } else {
            setErrorInputEmailMembro(true);
            setMensagemCampoObrigatorioEmailMembro(MSG014);
          }
        } else {
          setErrorInputEmailMembro(true);
          setMensagemCampoObrigatorioEmailMembro(MSG007);
        }
      } else {
        setErrorInputEmailMembro(true);
        setMensagemCampoObrigatorioEmailMembro(MSG003);
      }
    }
  };

  const cancelarCriacaoMembro = () => {
    setEmailMembro(MSG000);
    setNomeMembro(MSG000);
    handleCloseModalCriarMembro();
  };

  const baixarRegulamento = async () => {

    const fs = require('fs').promises;
    let arquivoPdf = await fs.readdir('c:/arquivo.pdf');

    console.log(arquivoPdf)

    // api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    // api.get(`/competicao/7/regulamento`).then((response) => {
    //   console.log(response);

    //   var file = new Blob([response.data], { type: 'application/pdf' });
    //   console.log(file);
    //   var fileURL = URL.createObjectURL(file);
    //   console.log(fileURL);
    //   window.open(fileURL);
    // });

    console.log("Baixando regulamento...");
  };

  const confirmarUnicidadeEmail = () => {
    let res = membros.find((membro) => {
      return membro.emailMembro === emailMembro;
    });

    return !res;
  };

  const emailPossuiDominioCorreto = () => {
    let dominioCompeticao = competicao.dominioCompeticao;
    if (dominioCompeticao !== "") {
      return emailMembro.split("@")[1] === dominioCompeticao;
    }
    return true;
  };

  const [mudou, setMudou] = useState(true);

  const removerMembro = async (index) => {
    membros.splice(index - 1, 1);
    let membrosAtt = membros;

    await setTimeout(() => {
      setMembros(membrosAtt);
    }, 400);

    setMudou(false);
    setMudou(true);
  };

  return (
    <div id="cadastro-equipe">
      <DefaultHeader />
      <div className="elementos-centralizados">
        <div id="dados-equipe">
          <div id="nome-botoes">
            <h2 id="nome-pagina">
              Nova Inscrição - Competição {competicao?.nomeCompeticao}
            </h2>

            <div id="botoes" className="botoes">
              <div id="btn-confirmar">
                <Botao
                  titulo="confirmar"
                  id="btn-confirmar-para-teste"
                  classes="btn btn-warning botao-menor-personalizado"
                  onClick={confirmarCriacaoEquipe}
                />
              </div>
              <div id="btn-voltar">
                <Link to={"/inicio"}>
                  <Botao
                    titulo="voltar"
                    id="btn-voltar-para-teste"
                    classes="btn btn-secondary botao-menor-personalizado"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div id="nome-equipe">
            <Box component="form" noValidate autoComplete="off">
              <div className="input">
                <TextField
                  error={errorInputNomeEquipe}
                  helperText={mensagemCampoObrigatorioNomeEquipe}
                  id="filled-search-nomeEquipe"
                  value={nomeEquipe}
                  onChange={(e) => {
                    setNomeEquipe(e.target.value);
                    validarCamposObrigatorios(
                      e.target.value,
                      setErrorInputNomeEquipe,
                      setMensagemCampoObrigatorioNomeEquipe
                    );
                  }}
                  label="Nome da equipe *"
                  type="text"
                  variant="filled"
                  color="warning"
                  size="small"
                />
              </div>
            </Box>
          </div>

          <div style={{ width: "52%", marginBottom: "2%" }}>
            {mensagem !== "" ? (
              <Mensagem mensagem={mensagem} tipoMensagem={MSG006} />
            ) : null}
          </div>

          <div id="btn-add-membro">
            <Botao
              titulo="adicionar membro"
              id="btn-add-membro-para-teste"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={handleOpenModalCriarMembro}
            />
          </div>

          <div id="membros">
            <ul id="lista-membros">
              {mudou
                ? membros.map((membro, index) => {
                  return (
                    <li key={index}>
                      <CardMembro
                        nome={membro.nomeMembro}
                        email={membro.emailMembro}
                        isLider={membro.isLider}
                        sequencial={index + 1}
                        removerMembro={removerMembro}
                      />
                    </li>
                  );
                })
                : null}
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={openModalCriarMembro}
        onClose={cancelarCriacaoMembro}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Informe os dados do novo membro
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 0, width: "500px" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="input">
              <TextField
                error={errorInputNomeMembro}
                helperText={mensagemCampoObrigatorioNomeMembro}
                id="filled-search-nome-membro"
                value={nomeMembro}
                onChange={(e) => {
                  setNomeMembro(e.target.value);
                  validarCamposObrigatorios(
                    e.target.value,
                    setErrorInputNomeMembro,
                    setMensagemCampoObrigatorioNomeMembro
                  );
                }}
                label="Nome *"
                type="text"
                variant="filled"
                color="warning"
                size="small"
              />
            </div>

            <div className="input">
              <TextField
                error={errorInputEmailMembro}
                helperText={mensagemCampoObrigatorioEmailMembro}
                id="filled-search-email"
                value={emailMembro}
                onChange={(e) => {
                  setEmailMembro(e.target.value);
                  validarCamposObrigatorios(
                    e.target.value,
                    setErrorInputEmailMembro,
                    setMensagemCampoObrigatorioEmailMembro
                  );
                }}
                label={
                  competicao?.dominioCompeticao === ""
                    ? "E-mail *"
                    : `E-mail * (deve possuir o domínio ${competicao?.dominioCompeticao})`
                }
                type="email"
                variant="filled"
                color="warning"
                size="small"
              />
            </div>
          </Box>
          <div className="botoes-cadastro">
            <Botao
              titulo="adicionar"
              classes="btn btn-warning botao-menor-personalizado"
              id="btn-adicionar-membro"
              onClick={adicionarMembro}
            />
            <Botao
              titulo="cancelar"
              classes="btn btn-secondary botao-menor-personalizado"
              id="btn-cancelar"
              onClick={cancelarCriacaoMembro}
            />
          </div>
        </Box>
      </Modal>

      <Modal
        open={openModalConfirmarInscricao}
        onClose={handleCloseModalConfirmarInscricao}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px", textAlign: "center" }}
          >
            Ao confirmar, você aceita os termos e condições atribuidos a cada
            membro da equipe.
          </Typography>
          <div id="regulamento">
            <Botao
              id="btn-regulamento-para-teste"
              classes="btn btn-warning botao-menor-personalizado"
              titulo="Regulamento da competição"
              onClick={baixarRegulamento}
            >
              <i className="fa-solid fa-download"></i>
            </Botao>
          </div>
          <div className="botoes">
            <div id="btn-confirmar">
              <Botao
                id="btn-confirmar-inscricao-para-teste"
                titulo="confirmar inscrição"
                classes="btn btn-warning botao-menor-personalizado"
                onClick={finalizarInscricao}
              />
            </div>
            <div id="btn-cancelar-confirmacao">
              <Botao
                titulo="cancelar"
                id="btn-cancelar-confirmacao-inscricao-para-teste"
                classes="btn btn-secondary botao-menor-personalizado"
                onClick={handleCloseModalConfirmarInscricao}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CadastroEquipe;
