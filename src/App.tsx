import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar.tsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Box w={"100%"} h={"60px"}></Box>
      <ToastContainer />
      <Box minHeight={"calc(100vh - 133px)"}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default App;
