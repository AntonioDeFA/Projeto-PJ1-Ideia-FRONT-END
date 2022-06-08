import { MSG000, MSG004 } from "../utils/mensagens";

export function validarEmail(email) {
  var re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  return re.test(email);
}

export function handleDatas(
  dataInicio,
  dataTermino,
  elaboracao = false,
  naoIniciada = false,
  etapaIncricao = null
) {
  if (!elaboracao) {
    if (naoIniciada) {
      return `Inicia em ${adicionarZero(
        etapaIncricao.dataInicio[2]
      )}/${adicionarZero(etapaIncricao.dataInicio[1])}/${
        etapaIncricao.dataInicio[0]
      }`;
    } else if (
      dataInicio &&
      dataInicio.length > 0 &&
      dataTermino &&
      dataTermino.length > 0
    ) {
      return `${adicionarZero(dataInicio[2])}/${adicionarZero(dataInicio[1])}/${
        dataInicio[0]
      } - ${adicionarZero(dataTermino[2])}/${adicionarZero(dataTermino[1])}/${
        dataTermino[0]
      }`;
    }
  }
}

const adicionarZero = (numero) => {
  return Number(numero) < 10 ? `0${numero}` : numero;
};

export const competicaoNaoIniciada = (card) => {
  let dataInicio = obterDatas(card.etapas, "INSCRICAO");

  let dia = dataInicio.dataInicio[2];
  let mes = dataInicio.dataInicio[1];
  let ano = dataInicio.dataInicio[0];

  let dataInicioFormatada = new Date(ano, mes - 1, dia);
  return new Date() < dataInicioFormatada;
};

export const validarCamposObrigatorios = (
  value,
  functionSetError,
  functionSetMensagem = null
) => {
  if (value === null || value?.length === 0) {
    functionSetError(true);

    if (functionSetMensagem) {
      functionSetMensagem(MSG004);
    }
    return false;
  } else {
    functionSetError(false);

    if (functionSetMensagem) {
      functionSetMensagem(MSG000);
    }
    return true;
  }
};

export const saoDuasDatasIguais = (data1, data2) => {
  return (
    data1.getDate() === data2.getDate() &&
    data1.getMonth() === data2.getMonth() &&
    data1.getYear() === data2.getYear()
  );
};

export const isDataDefault = (dia, mes, ano) => {
  if (dia === undefined || mes === undefined || ano === undefined) {
    return true;
  }
  return dia === 1 && mes === 1 && ano === 2000;
};

export const formatarEtapasParaPatch = (etapas) => {
  return [
    {
      dataInicio: [
        etapas[0].dataInicio[0],
        etapas[0].dataInicio[1],
        etapas[0].dataInicio[2],
      ],
      dataTermino: [
        etapas[0].dataTermino[0],
        etapas[0].dataTermino[1],
        etapas[0].dataTermino[2],
      ],
      tipoEtapa: etapas[0].tipoEtapa,
    },
    {
      dataInicio: [
        etapas[1].dataInicio[0],
        etapas[1].dataInicio[1],
        etapas[1].dataInicio[2],
      ],
      dataTermino: [
        etapas[1].dataTermino[0],
        etapas[1].dataTermino[1],
        etapas[1].dataTermino[2],
      ],
      tipoEtapa: etapas[1].tipoEtapa,
    },
    {
      dataInicio: [
        etapas[2].dataInicio[0],
        etapas[2].dataInicio[1],
        etapas[2].dataInicio[2],
      ],
      dataTermino: [
        etapas[2].dataTermino[0],
        etapas[2].dataTermino[1],
        etapas[2].dataTermino[2],
      ],
      tipoEtapa: etapas[2].tipoEtapa,
    },
    {
      dataInicio: [
        etapas[3].dataInicio[0],
        etapas[3].dataInicio[1],
        etapas[3].dataInicio[2],
      ],
      dataTermino: [
        etapas[3].dataTermino[0],
        etapas[3].dataTermino[1],
        etapas[3].dataTermino[2],
      ],
      tipoEtapa: etapas[3].tipoEtapa,
    },
  ];
};

export const obterDatas = (datasArr, etapa) => {
  let data = datasArr.find((data) => data.tipoEtapa === etapa);
  return data;
};

export const formatarData = (data) => {
  let dataFormatada = new Date();
  dataFormatada.setDate(data[2]);
  dataFormatada.setMonth(data[1] - 1);
  dataFormatada.setFullYear(data[0]);

  return dataFormatada;
};
