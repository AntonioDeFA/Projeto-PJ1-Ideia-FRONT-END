import React, { useContext, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  TextField,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import api from "../../../services/api";
import Botao from "./../../Botao/index";
import Mensagem from "./../../Mensagem/index";
import StoreContext from "../../../store/context";
import { MSG000, MSG006, MSG041, MSG042 } from "../../../utils/mensagens";
import { StyledTableRow, StyledTableCell } from "./../../../utils/constantes";
import {
  formatarData,
  validarCamposObrigatorios,
} from "../../../services/utils";

import "./styles.css";

function PainelDadosEquipe(props) {
  const [nome, setNome] = useState(MSG000);
  const [tokenEquipe, setTokenEquipe] = useState(MSG000);
  const [dataInscricao, setDataInscricao] = useState(MSG000);

  const [nomeOriginal, setNomeOriginal] = useState(MSG000);
  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(false);

  const [errorNome, setErrorNome] = useState(false);
  const [mensagemNome, setMensagemNome] = useState(MSG000);

  const [flagAlteracao, setFlagAlteracao] = useState(false);

  const [mensagemErro, setMensagemErro] = useState(MSG000);
  const [mensagemSnackBar, setMensagemSnackBar] = useState(MSG000);

  const { token } = useContext(StoreContext);

  const handleAlerta = (mensagem) => {
    setMensagemSnackBar(mensagem);
    setOpen(true);
  };

  const salvarNome = () => {
    setErrorNome(false);
    setMensagemNome(MSG000);

    if (nome !== nomeOriginal) {
      let statusNome = validarCamposObrigatorios(
        nome,
        setErrorNome,
        setMensagemNome
      );

      if (statusNome) {
        api.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
        api
          .patch(`/equipe/${props.id}/salvar-nome`, { nomeEquipe: nome })
          .then((response) => {
            handleAlerta(MSG042);
            setFlagAlteracao(!flagAlteracao);
            props.consultarDadosEquipe();
          })
          .catch((error) => {
            console.log(error.response.data);
            setErrorNome(true);
            setMensagemNome(error.response.data.motivosErros[0]);
          });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removerUsuario = (email) => {
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`/equipe/${props.id}/remover-membro`, { email })
      .then((response) => {
        setMensagemErro(MSG000);
        setFlagAlteracao(!flagAlteracao);
      })
      .catch((error) => {
        setMensagemErro(error.response.data.motivosErros[0]);

        setTimeout(() => {
          setMensagemErro(MSG000);
          console.log("ok");
        }, 10000);
      });
  };

  useEffect(() => {
    let listaAux = [];

    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/equipe/dados/${props.id}`).then((response) => {
      setNome(response.data.nomeEquipe);
      setNomeOriginal(response.data.nomeEquipe);
      setTokenEquipe(response.data.token);
      setDataInscricao(
        formatarData(response.data.dataInscricao).toLocaleDateString()
      );

      response.data.usuarios.forEach((user) => {
        listaAux.push({
          nome: user.nomeUsuario,
          email: user.email,
        });
      });
      setRows(listaAux);
    });
  }, [props.id, flagAlteracao, token]);

  return (
    <div id="id-panel-dados-equipe" className="d-flex justify-content-between">
      <div id="id-dados-da-competicao" className="div-painel-equipe">
        <h5 className="mb-4">Equipe</h5>

        <div className="div-input-dado-equipe d-flex justify-content-between">
          <div id="div-input-dado-equipe-nome">
            <TextField
              id="filled-search-nome-equipe-edit"
              type="text"
              size="small"
              value={nome}
              color="warning"
              error={errorNome}
              label="Nome da equipe *"
              variant="filled"
              className="input-dado-equipe"
              helperText={mensagemNome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
          </div>
          <div
            title={
              props.papelUsuario === "USUARIO_TOKEN"
                ? "Somente o líder pode alterar o nome da equipe."
                : ""
            }
          >
            <Botao
              titulo="salvar"
              onClick={salvarNome}
              disabled={props.papelUsuario === "USUARIO_TOKEN"}
              id="id-btn-salvar-nome-equipe"
              classes="btn btn-warning botao-menor-personalizado class-btn-dado-equipe"
            />
          </div>
        </div>

        <div className="div-input-dado-equipe d-flex justify-content-between">
          <div id="div-input-dado-equipe-token">
            <TextField
              readOnly
              type="text"
              size="small"
              label="Token"
              value={tokenEquipe}
              color="warning"
              variant="filled"
              className="input-dado-equipe"
            />
          </div>
          <div>
            <CopyToClipboard
              text={tokenEquipe}
              onCopy={() => handleAlerta(MSG041)}
            >
              <Botao
                titulo="copiar"
                id="id-btn-copiar-token-equipe"
                classes="btn btn-warning botao-menor-personalizado class-btn-dado-equipe"
              />
            </CopyToClipboard>

            <Snackbar open={open} onClose={handleClose} autoHideDuration={5000}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {mensagemSnackBar}
              </Alert>
            </Snackbar>
          </div>
        </div>

        <div className="div-input-readonly">
          <TextField
            readOnly
            type="text"
            size="small"
            color="warning"
            variant="filled"
            value={dataInscricao}
            label="Data de inscrição"
            className="input-dado-equipe-metade"
          />
        </div>
      </div>

      <div id="id-div-tabela-membros" className="div-painel-equipe">
        <h5 className="mb-4">Membros</h5>

        {mensagemErro !== MSG000 ? (
          <div className="mb-3">
            <Mensagem mensagem={mensagemErro} tipoMensagem={MSG006} />
          </div>
        ) : null}
        <div id="id-tabela-membros">
          <TableContainer component={Paper}>
            <Table
              sx={{ height: 300, overflowY: "scroll" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nome</StyledTableCell>
                  <StyledTableCell align="center">E-mail</StyledTableCell>
                  <StyledTableCell align="center">Remover</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={row.email}>
                    <StyledTableCell align="center">
                      <p className="text-break">{row.nome}</p>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <p className="text-break">{row.email}</p>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {index === 0 ? (
                        <p
                          className="m-0 text-danger fw-bold"
                          title="Não é possível remover o líder."
                        >
                          LIDER
                        </p>
                      ) : props.papelUsuario === "USUARIO_LIDER" ? (
                        <i
                          title="Remover este membro"
                          className="fa-solid fa-trash-can icone-tabela cursor-pointer"
                          onClick={() => {
                            removerUsuario(row.email);
                          }}
                        ></i>
                      ) : (
                        <i
                          title="Somente o líder pode remover membros de equipe"
                          className="fa-solid fa-trash-can icone-cinza"
                        ></i>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default PainelDadosEquipe;
