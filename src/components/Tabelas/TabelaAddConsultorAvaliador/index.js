import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

import TableContainer from "@mui/material/TableContainer";
import {
  StyledTableCell,
  StyledTableRow,
  styleModals,
} from "../../../utils/constantes";

import { Autocomplete, Modal, TextField, Box, Typography } from "@mui/material";

import api from "./../../../services/api";
import Botao from "./../../Botao/index";
import Mensagem from "../../Mensagem";
import StoreContext from "./../../../store/context";
import { MSG000, MSG026 } from "../../../utils/mensagens";
import DadosGeraisContext from "../../../utils/context/dadosGeraisContext";
import IdCompeticaoContext from "../../../utils/context/idCompeticaoContext";
import ExpandedAccordionContext from "../../../utils/context/expandedAccordionContext";

import "./styles.css";

function TabelaAddConsultorAvaliador(props) {
  const dadosGerais = useContext(DadosGeraisContext);
  const idCompeticaoHook = useContext(IdCompeticaoContext);
  const expanded = useContext(ExpandedAccordionContext);

  const [rows, setRows] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const [openModalConvidarUsuario, setOpenModalConvidarUsuario] =
    React.useState(false);
  const handleOpenModalConvidarUsuario = () =>
    setOpenModalConvidarUsuario(true);
  const handleCloseModalConvidarUsuario = () => {
    setMensagemAlerta(MSG000);
    setUsuarioSelecionado(null);
    setOpenModalConvidarUsuario(false);
  };

  const [mensagemAlerta, setMensagemAlerta] = useState(MSG000);

  const { token } = useContext(StoreContext);

  const defaultProps = {
    options: usuarios,
    getOptionLabel: (usuario) => usuario.email,
  };

  const handleStatusConvite = (status) => {
    if (status === "aceito") {
      return <p className="text-success fw-bold m-0">aceito</p>;
    }
    return <p className="text-warning fw-bold m-0">convidado</p>;
  };

  const removerUsuario = (email) => {
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`/${idCompeticaoHook}/remover-usuario-convidado`, { email })
      .then((response) => {
        console.log(response.data);
        getConvites();
        getUsuariosNaoRelacionados();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleMensagemConvidarUsuario = () => {
    let tipoUsuario = props.tipoUsuario;

    if (
      dadosGerais &&
      dadosGerais?.dominio &&
      dadosGerais?.dominio !== MSG000
    ) {
      let dominioCompeticao = dadosGerais?.dominio;

      if (
        dominioCompeticao &&
        dominioCompeticao !== MSG000 &&
        usuarioSelecionado?.email?.split("@")[1] !== dominioCompeticao
      ) {
        return MSG026;
      }
    }

    return `Deseja convidar o usuário ${usuarioSelecionado?.nome} <${usuarioSelecionado?.email}> para participar da competição como ${tipoUsuario}?`;
  };

  const handleBotoesConvidarUsuario = () => {
    if (
      dadosGerais &&
      dadosGerais?.dominio &&
      dadosGerais?.dominio !== MSG000
    ) {
      let dominioCompeticao = dadosGerais?.dominio;

      if (
        dominioCompeticao &&
        dominioCompeticao !== MSG000 &&
        usuarioSelecionado?.email?.split("@")[1] !== dominioCompeticao
      ) {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <div>
                <Botao
                  titulo="ok"
                  classes="btn btn-warning botao-menor-personalizado"
                  onClick={handleCloseModalConvidarUsuario}
                />
              </div>
            </div>
          </div>
        );
      }
    }
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Botao
            titulo="convidar"
            id="btn-convidar-usuarios-tabela"
            classes="btn btn-warning botao-menor-personalizado"
            onClick={convidarUsuario}
          />
        </div>
        <div>
          <Botao
            titulo="cancelar"
            classes="btn btn-secondary botao-menor-personalizado"
            onClick={handleCloseModalConvidarUsuario}
          />
        </div>
      </div>
    );
  };

  const convidarUsuario = () => {
    const convite = {
      emailDoUsuario: usuarioSelecionado.email,
      idCompeticao: idCompeticaoHook,
      tipoConvite: props.tipoUsuario.toUpperCase(),
    };

    setMensagemAlerta(
      `Estamos enviando um e-mail convidando o usuário ${usuarioSelecionado.nome}`
    );
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api.post("/competicao/convidar-usuario", convite).then((response) => {
      getUsuariosNaoRelacionados();
      handleCloseModalConvidarUsuario();
      setUsuarioSelecionado(null);
    });
  };

  const getUsuariosNaoRelacionados = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/competicao/${idCompeticaoHook}/usuarios-nao-relacionados`)
      .then((response) => {
        setUsuarios(response.data.usuarios);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getConvites = () => {
    let listaAux = [];
    const tipoUsuario =
      props.tipoUsuario === "consultor" ? "consultores" : "avaliadores";

    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/competicao/${idCompeticaoHook}/${tipoUsuario}`)
      .then((response) => {
        response.data.forEach((user) => {
          listaAux.push({
            email: user.email,
            statusConvite: user.statusConvite.toLowerCase(),
          });
        });

        setRows(listaAux);
        setTimeout(() => {
          props.handleQntdUsuarios(listaAux.length);
        }, 500);
      });
  };

  useEffect(() => {
    props.handleQntdUsuarios(rows.length);
  }, [rows]);

  useEffect(() => {
    if (idCompeticaoHook !== 0) {
      getUsuariosNaoRelacionados();
      getConvites();
    }
  }, [idCompeticaoHook, token, openModalConvidarUsuario, expanded]);

  return (
    <div id="tabela-add-consultor-avaliador">
      <Autocomplete
        {...defaultProps}
        sx={{ width: 470 }}
        id="controlled-demo"
        value={usuarioSelecionado}
        isOptionEqualToValue={(usuario, value) => usuario.email === value.email}
        onChange={(event, novoUsuario) => {
          setUsuarioSelecionado(novoUsuario);
          if (novoUsuario) {
            handleOpenModalConvidarUsuario();
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar usuários"
            color="warning"
            variant="filled"
          />
        )}
      />

      <div id="tabela-usuarios" className="mt-3">
        <TableContainer component={Paper}>
          <Table sx={{ height: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Convidar</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>

            {rows.length > 0 ? (
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.email}>
                    <StyledTableCell align="center">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <i
                        onClick={() => {
                          removerUsuario(row.email);
                        }}
                        className="fa-solid fa-trash-can cursor-pointer"
                        title="Remover este usuário"
                      ></i>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {handleStatusConvite(row.statusConvite)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
              <div className="m-3">
                <p>Não há {props.tipoUsuario}es convidados.</p>
              </div>
            )}
          </Table>
        </TableContainer>
      </div>

      <Modal
        open={openModalConvidarUsuario}
        onClose={handleCloseModalConvidarUsuario}
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
            {handleMensagemConvidarUsuario()}
            <div>
              <div className="elementos-centralizados mt-2 mb-2">
                {mensagemAlerta !== "" ? (
                  <Mensagem mensagem={mensagemAlerta} tipoMensagem={"info"} />
                ) : null}
              </div>
            </div>
          </Typography>
          {handleBotoesConvidarUsuario()}
        </Box>
      </Modal>
    </div>
  );
}

export default TabelaAddConsultorAvaliador;
