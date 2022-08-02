import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Modal,
  TextField,
  TextareaAutosize,
  Tabs,
  Tab,
  List
} from "@mui/material";

import DefaultHeader from "../../components/DefaultHeader";
import Botao from "../../components/Botao";
import { styleModals, TabPanel, valueProps } from "../../utils/constantes";

import "./styles.css";

function CriacaoAvaliacao() {

  const [value, setValue] = React.useState(0);
  const [questoesAdaptabilidade, setQuestoesAdaptabilidade] = useState([]);
  const [questoesInovacao, setQuestoesInovacao] = useState([]);
  const [questoesUtilidade, setQuestoesUtilidade] = useState([]);
  const [questoesSustentabilidade, setQuestoesSustentabilidade] = useState([]);

  const ListaQuestao = (opcao) => {

    let questoes = questoesAdaptabilidade;

    if (opcao === "INOVACAO") {
      questoes = questoesInovacao;
    } else if (opcao === "UTILIDADE") {
      questoes = questoesUtilidade;
    } else if (opcao === "SUSTENTABILIDADE") {
      questoes = questoesSustentabilidade;
    }

    let lista = [
      {
        id: 1,
        nota: 0,
        questao: "Como você avalia o pitch em questão de adaptabilidade? Como você avalia o pitch em questão de adaptabilidade? Como você avalia o pitch em questão de adaptabilidade? Como você avalia o pitch em questão de adaptabilidade? Como você avalia o pitch em questão de adaptabilidade? Como você avalia o pitch em questão de adaptabilidade? ",
        pontuacaoMax: 10,
        tipo: "ADAPTABILIDADE"
      },
      {
        id: 2,
        nota: 0,
        questao: "Essa adaptabilidade está bem argumentada? ",
        pontuacaoMax: 15,
        tipo: "SUSTENTABILIDADE"
      },
      {
        id: 3,
        nota: 0,
        questao: "Essa adaptabilidade está bem argumentada? Essa adaptabilidade está bem argumentada? Como você avalia o pitch em questão de adaptabilidade?Como você avalia o pitch em questão de adaptabilidade?Como você avalia o pitch em questão de adaptabilidade?Como você avalia o pitch em questão de adaptabilidade?Como você avalia o pitch em questão de adaptabilidade?Como você avalia o pitch em questão de adaptabilidade?Como você avalia o pitch em questão de adaptabilidade?Como você avalia o pitch em questão de adaptabilidade?",
        pontuacaoMax: 15,
        tipo: "INOVACAO"
      }
    ]

    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 390,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {lista.map((questao, index) => (
          <div key={index} className="borda-laranja rounded p-3 m-3">
            <div className="d-flex justify-content-between">
              <h5 className="text-break w-75 ms-2 mb-0 align-self-center">{questao.questao}</h5>
              <div className="align-self-center d-flex justify-content-between">
                <TextField
                  id="input-nota-questao"
                  onChange={(e) => {
                    questao.nota = e.target.value;
                    console.log(questao.nota)
                  }}
                  label="Sua nota"
                  type="number"
                  variant="filled"
                  color="warning"
                  size="small"
                  max={10}
                  style={{ width: "140px" }}
                  InputProps={{ inputProps: { min: 0, max: questao.pontuacaoMax } }}
                />
                <div className="div-movimentar-nota-maxima border-bottom border-secondary">
                  <h6 className="m-0 mt-1">máx.</h6>
                  <h6 className="m-0">
                    {questao.pontuacaoMax}
                  </h6>
                </div>
              </div>
            </div>
            <TextareaAutosize
              id="textarea-nota-questao-avaliativa"
              className="border rounded mt-4 p-3 w-100"
              aria-label="minimum height"
              minRows={2}
              placeholder="Digite aqui sua observação"
              style={{ width: 200, height: 150, resize: "none" }}
            />
          </div>
        ))
        }
      </List >
    );
  }

  return (
    <div id="pagina-avaliar-equipe">
      <DefaultHeader iconeDestaque="avaliador" />
      <div id="id-criar-avaliacao-equipe">
        <div className="d-flex justify-content-between mb-4">
          <div className="titulos-principais">Nome Competição / Nome Equipe</div>
          <div>
            <Botao
              titulo="lean canvas"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-lean-canvas-avaliacao"
              onClick={null}
            />
            <Botao
              titulo="pitch"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-pitch-avaliacao"
              onClick={null}
            />
            <Botao
              titulo="enviar"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-enviar-avaliacao"
              onClick={null}
            />
            <Botao
              titulo="voltar"
              classes="btn btn-secondary botao-menor-personalizado"
              id="btn-voltar-avaliacao"
              onClick={null}
            />
          </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            textColor="inherit"
            indicatorColor="inherit"
            aria-label="basic tabs example"
          >
            <Tab
              label={`Adaptabilidade`}
              {...valueProps(0)}
            />
            <Tab
              label={`Inovação`}
              {...valueProps(1)}
            />
            <Tab
              label={`Utilidade`}
              {...valueProps(2)}
            />
            <Tab
              label={`Sustentabilidade`}
              {...valueProps(3)}
            />
          </Tabs>
        </Box>

        <TabPanel color="warning" value={value} index={0}>
          <ListaQuestao opcao="ADAPTABILIDADE" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListaQuestao opcao="INOVACAO" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ListaQuestao opcao="UTILIDADE" />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ListaQuestao opcao="SUSTENTABILIDADE" />
        </TabPanel>
      </div>
    </div>
  );
}

export default CriacaoAvaliacao;