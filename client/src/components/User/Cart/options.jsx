import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useBreakpointValue,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

const Options = ({
  optionName,
  selectedOption,
  setSelectedOption,
  options,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Button
        mt={4}
        bg={"transparent"}
        onClick={onOpen}
        border="1px solid #E4E4E4"
        borderRadius="5px"
      >
        <Text>{optionName}</Text> : <Text as={"b"}>{selectedOption}</Text>
        <KeyboardArrowDownSharpIcon fontSize="small" />
      </Button>
      <Modal
        scrollBehavior={"inside"}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select {optionName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {options.map((option, index) => {
              return (
                <Button
                  w={"100%"}
                  mt={1}
                  key={index}
                  onClick={() => {
                    onClose(), setSelectedOption(option);
                  }}
                >
                  {option}
                </Button>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Options;
