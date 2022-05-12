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

function createData(email, icone, statusConvite) {
  return { email, icone, statusConvite };
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
  const handleCloseModalConvidarUsuario = () =>
    setOpenModalConvidarUsuario(false);

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

  const handleIcone = (status, email) => {
    if (status === "convidado" || status === "aceito") {
      return (
        <i
          onClick={() => {
            removerUsuario(email);
          }}
          className="fa-solid fa-trash-can icone-tabela"
          title="Remover este usuário"
        ></i>
      );
    } else {
      return (
        <i
          onClick={() => {
            convidarUsuario(email);
          }}
          className="fa-solid fa-envelope icone-tabela"
          title="Convidar este usuário"
        ></i>
      );
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
    console.log(usuarioSelecionado.email);
    handleCloseModalConvidarUsuario();
  };

  useEffect(() => {
    if (props.idCompeticao) {
      api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
      api
        .get(`/competicao/${props.idCompeticao}/usuarios-nao-relacionados`)
        .then((response) => {
          const { data } = response;
          setUsuarios(data);
        });
    } else {
      setUsuarios([
        {
          nome: "Nycolas Ramon Alves da Silva",
          email: "nycolas.ramon@academico.ifpb.edu.br",
          id: 1,
        },
        {
          nome: "Antonio de Farias Amorim",
          email: "antonio.amorim@academico.ifpb.edu.br.com",
          id: 2,
        },
        {
          nome: "José Gabriel da Silva Lima",
          email: "ze.lima@gmail.com",
          id: 3,
        },
        {
          nome: "Gabryel Alexandre",
          email: "gabryel.alex@academico.ifpb.edu.br",
          id: 4,
        },
      ]);

      setRows([
        createData("nycolas.ramon@academico.ifpb.edu.br", null, "convidado"),
        createData("antonio@gmail.com", null, "aceito"),
        createData("gabryel@hotmail.com.br", null, ""),
        createData("gabriel.jose@hotmail.com.br", null, ""),
        createData("nunes.mateus@hotmail.com.br", null, "convidado"),
      ]);
    }
  }, [props.idCompeticao, token]);

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
                    {handleIcone(row.statusConvite, row.email)}
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
          </Typography>
          {handleBotoesConvidarUsuario()}
        </Box>
      </Modal>
    </div>
  );
}

export default TabelaAddConsultorAvaliador;
