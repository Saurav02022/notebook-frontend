import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <Flex justifyContent={"space-evenly"} paddingY="5">
      <Link to={"/signup"}>
        {" "}
        <Box>Register</Box>
      </Link>
      <Link to={"/login"}>
        {" "}
        <Box>Login</Box>
      </Link>

      <Link to={"/createnote"}>
        <Box>createnote</Box>
      </Link>
      <Link to={"/"}>
        <Box>Home</Box>
      </Link>
      {token && (
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Signout
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
