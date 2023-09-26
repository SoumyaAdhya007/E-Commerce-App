import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../context/context";
const UserOptions = () => {
  const { setIsLogedIn } = useContext(AccountContext);

  return (
    <>
      <Link to={"/account"}>
        <Button w={"100%"} bg="transparent" mt={1}>
          My Account
        </Button>
      </Link>
      <Link to={"/account"}>
        <Button w={"100%"} bg="transparent" mt={1}>
          My Orders
        </Button>
      </Link>
      <Button
        w={"100%"}
        bg="transparent"
        mt={1}
        onClick={() => setIsLogedIn(false)}
      >
        Logout
      </Button>
    </>
  );
};
export default UserOptions;
