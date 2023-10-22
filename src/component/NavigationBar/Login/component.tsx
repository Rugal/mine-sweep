import { useState, useRef, } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  close: () => void;
}

export default function Login(p: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  return <Container maxWidth="xs">
    <Paper sx={{
      display: "flex",
      flexDirection: "column",
    }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "16px" }}>
        <IconButton color="primary">
          <AddReactionIcon />
        </IconButton>
        <Typography variant="h4" color="#1976d2">
          Login
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
        <TextField
          autoFocus={true}
          inputRef={emailInput}
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          inputRef={passwordInput}
          label="password"
          variant="outlined"
          value={password || ""}
          type="password"
          autoComplete="false"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" ><LoginIcon /></Button>
        <Button onClick={() => p.close()} variant="outlined"><ClearIcon /></Button>
      </Box>
    </Paper>
  </Container >;
}
