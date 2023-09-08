import BuyerDetails from "@/components/ShopFlow/OrderSummary/BuyerDetails";
import FooterPrice from "@/components/ShopFlow/OrderSummary/FooterPrice";
import Header from "@/components/ShopFlow/OrderSummary/Header";
import OrderSummary from "@/components/ShopFlow/OrderSummary/OrderSummary";
import PaymentMethod from "@/components/ShopFlow/OrderSummary/PaymentMethod";
import ProductDetails from "@/components/ShopFlow/OrderSummary/ProductDetails";
import SkeletonBox from "@/components/SkeletonBox";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Payment = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [stock, setStock] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(undefined);
  const shippingPrice = 1;

  const shopId = product?.shopId;
  const [shop, setShop] = useState<Shop | undefined>(undefined);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/product/${productId}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
      console.log("[productId].page.tsx set product as ", data);
    } catch (error) {
      console.error("Error in [productId].page.tsx", error);
    }
  };

  const fetchShop = async (shopId: string) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/shop/${shopId}`);
      const data = await res.json();
      setShop(data);
      console.log(shop);
      setLoading(false);

      if (data.error) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error in ViewShop", error);
    }
  };

  useEffect(() => {
    fetchProduct();

    return () => {
      setProduct(undefined);
    };
  }, [productId]);

  useEffect(() => {
    if (shopId === undefined) {
      return;
    }
    fetchShop(shopId);

    return () => {
      setShop(undefined);
    };
  }, [shopId]);

  if (loading) {
    return <Spinner />;
  }

  function handlePayment(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <SkeletonBox isLoading={loading}>
      <Header />
      <BuyerDetails />
      <ProductDetails
        setStock={setStock}
        shippingPrice={shippingPrice}
        stock={stock}
        remainingStock={product?.stock!}
        productPrice={product?.price!}
        productName={product?.productName!}
        shopName={shop?.storeName!}
      />
      <OrderSummary
        productPrice={product?.price!}
        shippingPrice={shippingPrice}
      />
      <PaymentMethod />
      <FooterPrice productPrice={product?.price!} onPayment={handlePayment} />
    </SkeletonBox>
  );
};

export default Payment;
