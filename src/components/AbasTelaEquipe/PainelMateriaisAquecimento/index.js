import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel
} from "@mui/material";

import api from "../../../services/api";
import StoreContext from "../../../store/context";


import "./styles.css";

function PainelMateriaisAquecimento(props) {

  const [materiais, setMateriais] = useState([]);

  const { token } = useContext(StoreContext);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/${props?.id}/materiais-estudo`).then((response) => {
      setMateriais(response.data);
    });
  }, []);

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
  }

  const abrirLink = (link) => {
    window.open(link);
  }

  const IconeMaterial = (props) => {

    const { tipo } = props;

    if (tipo === "PDF") {
      return <i className="fa fa-file-pdf-o fa-2x me-3 mt-4"></i>;
    } else if (tipo === "VIDEO") {
      return <i className="fa fa-file-video-o fa-2x me-3 mt-4"></i>;
    } else {
      return <i className="fa fa-globe fa-xl me-3 mt-4 pt-3"></i>;
    }
  }

  const IconeExecutavel = (props) => {

    const { tipo, material, link } = props;

    if (tipo === "LINK") {
      return (
        <div className=" pt-1 mt-4">
          <i className="fa fa-external-link icone-download-e-link-material"
            onClick={() => abrirLink(link)}></i>
        </div>
      );
    } else {
      return (
        <div className=" pt-1 mt-4">
          <i className="fa-solid fa-download icone-download-e-link-material"
            onClick={() => baixarMaterial(material, tipo)}>
          </i>
        </div>
      );
    }

  }

  return (
    <div id="painel-materiais-aquecimento">
      <h5 className="mb-5">Olá competidor, aqui estão os materiais de estudo da etapa de aquecimento</h5>
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
        {materiais.map((material, index) => (
          <li
            key={index}
            className="pe-3"
          >
            <ul onClick={null} className="border border-dark rounded mb-3">
              <ListItem key={material.id} >
                <div className="d-flex justify-content-between w-100 pe-3 ps-3">
                  <div className="d-flex justify-content-center">
                    <IconeMaterial tipo={material.tipoMaterialEstudo} />
                    <div className="ms-3">
                      <h6 className="mt-2">{"material.nome"}</h6>
                      <div className="d-flex justify-content-center">
                        <FormControlLabel control={<Checkbox defaultChecked={false} />} label="concluído" />
                        <h6 className="mt-1 pt-2">{material.tempo} min</h6>
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
        ))}
      </List>
    </div>
  );
}

export default PainelMateriaisAquecimento;
