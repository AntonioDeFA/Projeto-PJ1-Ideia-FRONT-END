import React from "react";
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


import "./styles.css";

function PainelMateriaisAquecimento(props) {

  //${props?.id} - usar isso aqui na chamada da api

  let materiais = [
    {
      id: 3,
      nome: "material.pdf",
      tipo: "PDF",
      tempo: 120
    },
    {
      id: 4,
      nome: "material.mp4",
      tipo: "VIDEO",
      tempo: 120
    },
    {
      id: 5,
      nome: "material.link",
      tipo: "LINK",
      tempo: 120
    },
    {
      id: 6,
      nome: "eu",
      tipo: "LINK",
      tempo: 120
    },
    {
      id: 7,
      nome: "eu",
      tipo: "LINK",
      tempo: 120
    },
    {
      id: 8,
      nome: "eu",
      tipo: "LINK",
      tempo: 120
    }
  ]

  const baixarMaterial = (index) => {
    console.log("Baixando material");
  }

  const IconeMaterial = (props) => {

    const { tipo } = props;

    if (tipo === "PDF") {
      return <i className="fa fa-file-pdf-o fa-2x me-3 mt-4"></i>;
    } else if (tipo === "VIDEO") {
      return <i className="fa fa-file-video-o fa-2x me-3 mt-4"></i>;
    } else {
      return <i className="fa fa-globe fa-2x me-3 mt-4"></i>;
    }
  }

  const IconeExecutavel = (props) => {

    const { tipo, index } = props;

    if (tipo === "LINK") {
      return <i className="fa fa-external-link pt-1 mt-4"></i>;
    } else {
      return <i className="fa-solid fa-download pt-1 mt-4" onClick={() => baixarMaterial(index)}></i>;
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
                    <IconeMaterial tipo={material.tipo} />
                    <div className="ms-3">
                      <h6 className="mt-2">{material.nome}</h6>
                      <div className="d-flex justify-content-center">
                        <FormControlLabel control={<Checkbox defaultChecked={false} />} label="concluído" />
                        <h6 className="mt-1 pt-2">{material.tempo} min</h6>
                      </div>
                    </div>
                  </div>
                  <IconeExecutavel tipo={material.tipo} index={index} />
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
