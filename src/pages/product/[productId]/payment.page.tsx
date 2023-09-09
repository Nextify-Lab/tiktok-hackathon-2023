import BuyerDetails from "@/components/ShopFlow/OrderSummary/BuyerDetails";
import FooterPrice from "@/components/ShopFlow/OrderSummary/FooterPrice";
import Header from "@/components/ShopFlow/OrderSummary/Header";
import OrderSummary from "@/components/ShopFlow/OrderSummary/OrderSummary";
import PaymentMethod from "@/components/ShopFlow/OrderSummary/PaymentMethod";
import ProductDetails from "@/components/ShopFlow/OrderSummary/ProductDetails";
import SkeletonBox from "@/components/SkeletonBox";
import { useUser } from "@/components/userContext";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Payment = () => {
  const router = useRouter();
  const { productId, groupbuyId } = router.query;

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [stock, setStock] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(undefined);
  const shippingPrice = 3;

  const shopId = product?.shopId;
  const [shop, setShop] = useState<Shop | undefined>(undefined);

  const { userId, setUserId } = useUser();

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

  async function handlePayment() {
    if (userId === null) {
      router.push("/login");
      return;
    }
    if (typeof productId !== "string") {
      console.error("productId is not a string");
      return;
    }
    if (typeof groupbuyId !== "string" && groupbuyId !== undefined) {
      console.error("groupbuyId is not a string");
      return;
    }
    console.log("groupbuyId", groupbuyId);

    try {
      if (groupbuyId === undefined) {
        const input: TransactionInput = {
          buyerId: userId,
          purchases: {
            [productId]: stock,
          },
        };
        const individualTransactionResult = createTransaction(input);
        console.log("Transaction created", individualTransactionResult);
        router.push(`/product/${productId}/paymentResult?status=success`);
      } else {
        const input: GroupBuyUpdateInput = {
          buyerId: userId,
          productId: productId,
          quantity: stock,
        };
        const result = await updateGroupbuy(groupbuyId, input);
        console.log("Groupbuy updated", result);
        router.push(
          `/product/${productId}/paymentResult?status=success&groupbuyId=${groupbuyId}`
        );
      }
    } catch (error) {
      console.error("Error in [productId].page.tsx", error);
      router.push(`/product/${productId}/paymentResult?status=${error}`);
    }
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
        // shippingPrice={0.75}
      />
      <PaymentMethod />
      <FooterPrice
        productPrice={product?.price! + shippingPrice}
        // productPrice={product?.price! + 0.75}
        onPayment={handlePayment}
      />
    </SkeletonBox>
  );
};

export default Payment;
interface GroupBuyUpdateInput {
  buyerId: string;
  productId: string;
  quantity: number;
}

interface GroupBuyUpdateResponse {
  message: string;
}

const updateGroupbuy = async (
  groupbuyId: string,
  input: GroupBuyUpdateInput
): Promise<GroupBuyUpdateResponse> => {
  try {
    console.log("Creating groupbuy", input, groupbuyId);
    const response = await fetch(`/api/groupBuy/${groupbuyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Failed to update group buy selection");
    }

    const data: GroupBuyUpdateResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating group buy:", error);
    throw error;
  }
};

interface TransactionInput {
  buyerId: string;
  purchases: Record<string, number>;
  groupbuyId?: string;
}

interface TransactionResponse {
  id: string;
  buyerId: string;
  purchases: Record<string, number>;
  groupbuyId?: string;
}

const createTransaction = async (
  input: TransactionInput
): Promise<TransactionResponse> => {
  try {
    console.log("Creating transaction", input);
    const response = await fetch("/api/transaction/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Failed to create transaction");
    }

    const data: TransactionResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
