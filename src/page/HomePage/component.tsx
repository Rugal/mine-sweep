import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NavigationBar from "@component/NavigationBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return <>
    <NavigationBar />
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </Container>
  </>;
};

export default HomePage;
