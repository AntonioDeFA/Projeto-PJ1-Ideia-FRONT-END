import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import { styleModals } from "../../../utils/constantes";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Autocomplete, Modal, TextField, Box, Typography } from "@mui/material";

import api from "./../../../services/api";
import Botao from "./../../Botao/index";
import { MSG000, MSG026 } from "../../../utils/mensagens";
import StoreContext from "./../../../store/context";
import DadosGeraisContext from "../../../utils/context/dadosGeraisContext";

import "./styles.css";
import IdCompeticaoContext from "../../../utils/context/idCompeticaoContext";
import Mensagem from "../../Mensagem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fc7a00",
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(email, statusConvite) {
  return { email, statusConvite };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TabelaAddConsultorAvaliador(props) {
  const dadosGerais = useContext(DadosGeraisContext);
  const idCompeticaoHook = useContext(IdCompeticaoContext);

  const [rows, setRows] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const [openModalConvidarUsuario, setOpenModalConvidarUsuario] =
    React.useState(false);
  const handleOpenModalConvidarUsuario = () =>
    setOpenModalConvidarUsuario(true);
  const handleCloseModalConvidarUsuario = () => {
    setMensagemAlerta(MSG000);
    setOpenModalConvidarUsuario(false);
  };

  const [mensagemAlerta, setMensagemAlerta] = useState(MSG000);
  const [mudou, setMudou] = useState(true);

  const { token } = useContext(StoreContext);

  const defaultProps = {
    options: usuarios,
    getOptionLabel: (usuario) => usuario.nome,
  };

  const handleStatusConvite = (status) => {
    if (status === "convidado") {
      return <p className="text-warning fw-bold m-0">convidado</p>;
    } else if (status === "aceito") {
      return <p className="text-success fw-bold m-0">aceito</p>;
    }
  };

  const removerUsuario = (email) => {
    console.log(email);
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
      console.log(response.data);
      handleCloseModalConvidarUsuario();
    });
  };

  useEffect(() => {
    const tipoUsuario =
      props.tipoUsuario === "consultor" ? "consultores" : "avaliadores";

    if (idCompeticaoHook !== 0) {
      api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
      api
        .get(`/competicao/${idCompeticaoHook}/usuarios-nao-relacionados`)
        .then((response) => {
          setUsuarios(response.data.usuarios);
        });
      api
        .get(`/competicao/${idCompeticaoHook}/${tipoUsuario}`)
        .then((response) => {
          setRows([]);
          response.data.forEach((user) => {
            rows.push({
              email: user.emaiConsultor,
              statusConvite: user.statusConvite.toLowerCase(),
            });
          });
          setMudou(false);

          console.log(rows);
        });
      setMudou(true);
    }
  }, [idCompeticaoHook, token, openModalConvidarUsuario]);

  return (
    <div id="tabela-add-consultor-avaliador">
      <Autocomplete
        {...defaultProps}
        sx={{ width: 503 }}
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
          <Table sx={{ width: 470, height: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Convidar</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.email}>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    <i
                      onClick={() => {
                        removerUsuario(row.email);
                      }}
                      className="fa-solid fa-trash-can icone-tabela"
                      title="Remover este usuário"
                    ></i>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {handleStatusConvite(row.statusConvite)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
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
