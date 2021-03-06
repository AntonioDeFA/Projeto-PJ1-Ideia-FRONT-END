import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const styleModals = {
  p: 4,
  top: "50%",
  left: "50%",
  boxShadow: 24,
  position: "absolute",
  border: "2px solid #ffc107",
  bgcolor: "background.paper",
  transform: "translate(-50%, -50%)",
};

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: "20px" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

export const valueProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const mesesDoAno = [
  {
    value: 1,
    label: "Janeiro",
  },
  {
    value: 2,
    label: "Fevereiro",
  },
  {
    value: 3,
    label: "Março",
  },
  {
    value: 4,
    label: "Abril",
  },
  {
    value: 5,
    label: "Maio",
  },
  {
    value: 6,
    label: "Junho",
  },
  {
    value: 7,
    label: "Julho",
  },
  {
    value: 8,
    label: "Agosto",
  },
  {
    value: 9,
    label: "Setembro",
  },
  {
    value: 10,
    label: "Outubro",
  },
  {
    value: 11,
    label: "Novembro",
  },
  {
    value: 12,
    label: "Dezembro",
  },
];
