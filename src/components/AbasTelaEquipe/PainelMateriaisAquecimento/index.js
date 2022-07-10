import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  List,
  ListItem,
  Modal,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import api from "../../../services/api";
import StoreContext from "../../../store/context";
import { styleModals } from "../../../utils/constantes";
import Botao from "../../Botao";
import { MSG000 } from "../../../utils/mensagens";

import "./styles.css";

function PainelMateriaisAquecimento(props) {
  const [materiais, setMateriais] = useState([]);

  const { token } = useContext(StoreContext);

  const [idMaterial, setIdMaterial] = useState(MSG000);
  const [mudou, setMudou] = useState(true);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = async () => {
    buscarMateriais();
    await setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 2000);
    setOpenModal(false);
  };

  useEffect(() => {
    buscarMateriais();
  }, []);

  const buscarMateriais = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`equipe/${props?.idEquipe}/material-estudo`).then((response) => {
      setMateriais(response.data);
      console.log(response.data);
    });
  };
  const baixarMaterial = (material, tipo) => {
    let descricaoType = "video/mp4;base64";

    if (tipo === "PDF") {
      descricaoType = "application/pdf;base64";
    }

    var byteCharacters = window.atob(material);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: descricaoType });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const abrirLink = (link) => {
    window.open(link);
  };

  const abrirModal = (id) => {
    setIdMaterial(id);
    handleOpenModal();
  };

  const marcarConcluido = async () => {
    console.log(props?.idEquipe);
    console.log(idMaterial);
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`equipe/${props?.idEquipe}/material-estudo/${idMaterial}`)
      .then((response) => {
        console.log("material marcado como concluído");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    await setTimeout(() => {
      handleCloseModal();
    }, 100);
  };

  const IconeMaterial = (props) => {
    const { tipo } = props;

    if (tipo === "PDF") {
      return <i className="fa fa-file-pdf-o fa-4x color-icone"></i>;
    } else if (tipo === "VIDEO") {
      return <i className="fa fa-file-video-o fa-4x color-icone"></i>;
    } else {
      return <i className="fa fa-globe fa-3x color-icone"></i>;
    }
  };

  const IconeExecutavel = (props) => {
    const { tipo, material, link } = props;

    if (tipo === "LINK") {
      return (
        <div className=" pt-1 mt-4">
          <i
            className="fa fa-external-link icone-download-e-link-material cursor-pointer"
            onClick={() => abrirLink(link)}
          ></i>
        </div>
      );
    } else {
      return (
        <div className=" pt-1 mt-4">
          <i
            className="fa-solid fa-download icone-download-e-link-material cursor-pointer"
            onClick={() => baixarMaterial(material, tipo)}
          ></i>
        </div>
      );
    }
  };

  return (
    <div id="painel-materiais-aquecimento">
      <h5 className="mb-5">
        Olá competidor. Aqui estão os materiais de estudo da etapa de
        aquecimento.
      </h5>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 320,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {mudou
          ? materiais.map((material, index) => (
              <li key={index} className="pe-3">
                <ul onClick={null} className="borda-laranja rounded mb-3">
                  <ListItem key={material.id}>
                    <div className="d-flex justify-content-between w-100 pe-3 ps-3">
                      <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center align-self-center me-2">
                          <IconeMaterial tipo={material.tipoMaterialEstudo} />
                        </div>
                        <div className="ms-3">
                          <h6 className="mt-2">{material.nomeMaterial}</h6>
                          <div className="d-flex justify-content-start">
                            <FormControlLabel
                              control={
                                <div
                                  className={
                                    props.papelUsuario === "USUARIO_LIDER"
                                      ? ""
                                      : "cursor-default"
                                  }
                                  title={
                                    props.papelUsuario === "USUARIO_LIDER"
                                      ? ""
                                      : "Só o líder pode marcar como concluído."
                                  }
                                >
                                  {" "}
                                  <Checkbox
                                    className="btn-check btn-outline-warning"
                                    defaultChecked={material.isConcluido}
                                    disabled={
                                      material.isConcluido ||
                                      props.papelUsuario !== "USUARIO_LIDER"
                                    }
                                    onChange={() => abrirModal(material.id)}
                                  />
                                </div>
                              }
                              label="concluído"
                            />
                          </div>
                        </div>
                      </div>
                      <IconeExecutavel
                        tipo={material.tipoMaterialEstudo}
                        material={material.arquivoEstudo}
                        link={material.link}
                      />
                    </div>
                  </ListItem>
                </ul>
              </li>
            ))
          : null}
      </List>
      <Modal
        open={openModal}
        onClose={() => handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals} style={{ width: 600 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Ao marcar como concluído não será possível desmarcar. Deseja
            prosseguir?
          </Typography>

          <div className="botoes-cadastro mt-2">
            <Botao
              titulo="confirmar"
              id="btn-concluir-material-estudo"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={() => marcarConcluido()}
            />

            <Botao
              titulo="cancelar"
              classes="btn btn-secondary botao-menor-personalizado"
              onClick={() => handleCloseModal()}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PainelMateriaisAquecimento;
