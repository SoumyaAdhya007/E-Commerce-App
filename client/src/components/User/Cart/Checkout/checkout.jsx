import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Button,
  useBreakpointValue,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../../../context/cartContext";
import { CheckoutContext } from "../../../../context/checkoutContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddressStep from "./addressStep";
import PaymentStep from "./paymentStep";
import OrderPlacedStep from "./orderPlacedStep";
import PaymentStatus from "./paymentStatus";
import { tostErrorMessage, tostInfoMessage } from "../../../../service/tost";
const Checkout = () => {
  const stepperSize = useBreakpointValue({ base: "sm", md: "lg" }); // You can adjust sizes as needed

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = queryParams.get("step");
  const [activeStep, setActiveStep] = useState(parseInt(step) || null);

  const {
    addressId,
    setAddressId,
    paymentId,
    setPaymentId,
    paymentStatus,
    setPaymentStatus,
    orderPlaced,
    setOrderPlaced,
  } = useContext(CheckoutContext);
  useEffect(() => {
    setActiveStep(parseInt(step));
  }, [step]);
  const steps = [
    { title: "First", description: "Choose Address" },
    { title: "Second", description: "Proceed Payment" },
    { title: "Third", description: "Payment Status" },
  ];
  const activeStepText = steps[activeStep - 1].description;
  console.log(activeStep);
  console.log(activeStepText);
  const next = async () => {
    if (activeStep === 1 && !addressId) {
      return tostInfoMessage("Please choose an address.");
    }
    if (activeStep === 1 && addressId) {
      sessionStorage.setItem("addressId", addressId);
      navigate(`?step=2&addressId=${addressId}`);
      return;
    }
    if (activeStep === 3 && (paymentStatus !== "success" || !orderPlaced)) {
      tostErrorMessage("Order Failed");
      setTimeout(() => {
        navigate("/cart");
      }, 1500);
      return;
    }
    if (activeStep === 3 && paymentStatus === "success" && orderPlaced) {
      return navigate("/account/order");
    }
  };
  return (
    <Box w={"100%"} p={stepperSize !== "sm" ? 5 : 1}>
      <ToastContainer />

      <Stack>
        <Stepper size="sm" index={activeStep} gap="0">
          {steps.map((step, index) => (
            <Step key={index} gap="0">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator _horizontal={{ ml: "0" }} />
            </Step>
          ))}
        </Stepper>
        <Text>
          Step {activeStep}: <b>{activeStepText}</b>
        </Text>
      </Stack>
      {activeStep === 1 ? (
        <AddressStep addressId={addressId} setAddressId={setAddressId} />
      ) : activeStep === 2 ? (
        <PaymentStep addressId={addressId} />
      ) : (
        <PaymentStatus />
      )}
      <Flex w={"100%"} justifyContent={"space-between"}>
        {activeStep !== 3 && (
          <Button
            minw={"49%"}
            w={"100%"}
            colorScheme="blue"
            onClick={() =>
              activeStep !== 1
                ? navigate(`?step=${activeStep - 1}`)
                : navigate(`/cart`)
            }
          >
            {activeStep !== 1 ? "Back" : "Back to cart"}
          </Button>
        )}
        {activeStep !== 2 && (
          <Button minw={"49%"} w={"100%"} onClick={next} colorScheme="whatsapp">
            {activeStep === 1
              ? "Use this address"
              : activeStep === 2
              ? "Proceed to payment"
              : activeStep === 3
              ? "View Orders"
              : ""}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Checkout;
