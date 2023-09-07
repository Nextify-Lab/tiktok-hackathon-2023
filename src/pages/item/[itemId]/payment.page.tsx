import BuyerDetails from "@/components/ShopFlow/OrderSummary/BuyerDetails";
import FooterPrice from "@/components/ShopFlow/OrderSummary/FooterPrice";
import Header from "@/components/ShopFlow/OrderSummary/Header";
import OrderSummary from "@/components/ShopFlow/OrderSummary/OrderSummary";
import PaymentMethod from "@/components/ShopFlow/OrderSummary/PaymentMethod";
import ProductDetails from "@/components/ShopFlow/OrderSummary/ProductDetails";
import { Box } from "@chakra-ui/react";
import React from "react";

const Payment = () => {
  return (
    <>
      <Header />
      <BuyerDetails />
      <ProductDetails />
      <OrderSummary />
      <PaymentMethod />
      <FooterPrice />
    </>
  );
};

export default Payment;
