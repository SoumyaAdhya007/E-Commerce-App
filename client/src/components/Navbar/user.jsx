import {
  Popover,
  PopoverContent,
  Text,
  PopoverTrigger,
} from "@chakra-ui/react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import UserOptions from "./userOptions";
import { useContext } from "react";
import { AccountContext } from "../../context/context";
const User = () => {
  const { isLogedIn, userDetails } = useContext(AccountContext);

  return isLogedIn && Object.keys(userDetails).length !== 0 ? (
    <Popover trigger="hover" placement="bottom" strategy="fixed">
      <PopoverTrigger>
        <PermIdentityOutlinedIcon color="#303030" fontSize="large" />
      </PopoverTrigger>
      <PopoverContent p={6}>
        <Text as="i" textAlign="left" fontSize="xl" color="rgba(0,0,0,.5)">
          Hi{" "}
          {userDetails.name.split(" ")[0]
            ? userDetails.name.split(" ")[0]
            : userDetails.name}
        </Text>
        <UserOptions />
      </PopoverContent>
    </Popover>
  ) : null;
};
export default User;
