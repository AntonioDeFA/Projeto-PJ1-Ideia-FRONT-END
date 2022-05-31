import { Box } from "@mui/material";

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
