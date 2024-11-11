import Paystack from "paystack-react-native";

const publicKey = process.env.EXPO_PUBLIC_PAYSTACK_API_PUBLIC_KEY;

Paystack.initSdk(publicKey);

export const handlePayment = async () => {
  const paymentData = {
    email: "customer@example.com",
    amount: 10000,
  };

  const response = await Paystack.initPayment(paymentData);
  if (response.status) {
    console.log("Payment successful:", response);
  } else {
    console.log("Payment failed:", response);
  }
};
