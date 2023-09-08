// hooks/useShop.ts

import { useState, useEffect } from "react";

const useShop = (shopId: string, withProducts: boolean) => {
  const [shop, setShop] = useState<Shop | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchShop = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/shop/${shopId}?getProducts=${withProducts}`
      );
      const data = await res.json();
      setShop(data);
      setLoading(false);

      if (data.error) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error in useShop", error);
    }
  };

  useEffect(() => {
    fetchShop();

    return () => {
      setShop(undefined);
    };
  }, [shopId]);

  return { shop, loading };
};

export default useShop;
