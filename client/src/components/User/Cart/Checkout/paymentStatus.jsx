import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CheckoutContext } from "../../../../context/checkoutContext";
import { checkPaymentStatus, placeOrder } from "../../../../service/api";
import { CheckCircleIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
import { ToastContainer, toast } from "react-toastify";

const PaymentStatus = () => {
  const [loading, setLoading] = useState(false);
  const {
    addressId,
    setAddressId,
    orderPlaced,
    setOrderPlaced,
    paymentStatus,
    setPaymentStatus,
  } = useContext(CheckoutContext);
  // http://localhost:5173/checkout?
  // razorpay_payment_id=pay_MiSG3pUmbCwyBo&
  // razorpay_payment_link_id=plink_MiSFVbSQrL4vbL&
  // razorpay_payment_link_reference_id=&
  // razorpay_payment_link_status=paid&
  // razorpay_signature=679e95251fb278ad7dc46260f0213f1f2d6c9e7e45d937e29c3fc36ca320baca&
  // step=3
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("razorpay_payment_id");
  const address_id = addressId || sessionStorage.getItem("addressId");
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      setLoading(true);
      const response = await checkPaymentStatus(paymentId);

      if (response.status === 200) {
        setPaymentStatus("success");
        const orderResponse = await placeOrder({
          paymentId: paymentId,
          addressId: address_id,
        });
        setLoading(false);
        if (orderResponse.status === 200) {
          setOrderPlaced(true);
          sessionStorage.clear();
        }
        if (orderResponse.status !== 200) {
          toast.error(response.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else {
        setPaymentStatus("failed");
        setLoading(false);
      }
    };
    fetchPaymentStatus();
  }, []);
  return loading ? (
    <Flex h={"500px"} justifyContent={"center"} alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      m={5}
      h={"200px"}
      bg={
        paymentStatus === "success"
          ? "#A2FF86"
          : paymentStatus === "failed"
          ? "#F45050"
          : "#5C5470"
      }
      borderRadius="20px"
    >
      <ToastContainer />
      {paymentStatus === "success" ? (
        <CheckCircleIcon fontSize={"50px"} color={"white"} />
      ) : paymentStatus === "failed" ? (
        <CloseIcon fontSize={"50px"} color={"white"} />
      ) : (
        <InfoIcon fontSize={"50px"} color={"white"} />
      )}
      <Text as="b" fontSize="2xl" color="#272829" mt={2}>
        Payment{" "}
        {paymentStatus === "success"
          ? "Successfull"
          : paymentStatus === "failed"
          ? "Failed"
          : "Invalid"}
      </Text>
    </Flex>
  );
};

export default PaymentStatus;
