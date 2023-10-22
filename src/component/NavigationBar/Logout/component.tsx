import { useState, } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import { store } from "@store";

interface Props {
  close: () => void;
}

export default function Logout(p: Props) {
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const backToIndex = () => navigate("/");

  const logoutHandler = () => {
    setProcessing(true);
    setTimeout(() => {
      store.token = undefined;
      p.close();
      setProcessing(false);
      backToIndex();
    }, 1000);
  };

  return <Container maxWidth="xs">
    <Paper sx={{
      display: "flex",
      flexDirection: "column",
    }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "16px" }}>
        <IconButton color="primary">
          <LogoutIcon />
        </IconButton>
        <Typography variant="h4" color="#1976d2">
          Logout
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          "& > :not(style)": { m: 1, },
        }}
      >
        <Button disabled={processing} variant="outlined" onClick={() => p.close()}><CloseIcon /></Button>
        <Button disabled={processing} variant="contained" color="error" onClick={logoutHandler}>
          {processing && <CircularProgress size={24} />}
          {!processing && <CheckIcon />}
        </Button>
      </Box>
    </Paper>
  </Container >;
}
