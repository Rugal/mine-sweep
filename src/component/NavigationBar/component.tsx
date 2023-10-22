import { useState, } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link as RouterLink, } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import PagesIcon from "@mui/icons-material/Pages";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import LinearProgress from "@mui/material/LinearProgress";
import { SvgIconTypeMap } from "@mui/material";
import { useSnapshot } from "valtio";
import { Store, store } from "@store";
import Login from "./Login";
import Logout from "./Logout";
import { Android12Switch } from "./language";

interface Page {
  title: string;
  Component: OverridableComponent<SvgIconTypeMap>;
  handler?: () => void
}

export default function NavigationBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const snap: Store = useSnapshot(store);

  const pages: Page[] = [
    { title: "Post", Component: PagesIcon },
    { title: "Statistic", Component: AutoGraphIcon },
    { title: "Logout", Component: LogoutIcon, handler: () => setShowLogout(true), },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            key="/"
            sx={{ my: 2, color: "white", display: "block", }}
            component={RouterLink}
            to="/"
          >
            <Typography variant="h5">Mine Sweep</Typography>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, flexDirection: "row", justifyContent: "flex-end", }}>
            {snap.token && pages.map((page) => <div key={page.title}>
              <Button
                key={page.title}
                sx={{ my: 2, color: "white", display: "flex" }}
                {...page.handler ? { onClick: page.handler } : { component: RouterLink, to: page.title.toLowerCase() }}
              >
                <page.Component />
                {page.title}
              </Button>
            </div>
            )}

            {!snap.token &&
              <Button
                key="login"
                onClick={() => setShowLogin(true)}
                sx={{ my: 2, color: "white", }}
              >
                Login
              </Button>}
            <Android12Switch
              disabled={true}
              checked={snap.locale === "zhCN"}
              color="default"
              sx={{ my: 2, display: "flex" }}
              onClick={() => store.locale = snap.locale !== "zhCN" ? "zhCN" : "enUS"}
            />
          </Box>
        </Toolbar>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLogin || showLogout}
      >
        {showLogin && <Login close={() => setShowLogin(false)} />}
        {showLogout && <Logout close={() => setShowLogout(false)} />}
      </Backdrop>
      {snap.loading && <Box sx={{ width: "100%" }}><LinearProgress color="secondary" /></Box>}
    </AppBar >
  );
}
