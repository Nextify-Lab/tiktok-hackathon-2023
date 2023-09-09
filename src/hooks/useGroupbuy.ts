import { useState, useEffect } from "react";

const useGroupbuy = (productId: string) => {
  const [groupbuy, setGroupbuy] = useState<GroupBuy | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroupbuy = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/groupBuy/route?productId=${productId}`);
        const data: GroupBuy = await res.json();
        setGroupbuy(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching groupbuy", error);
      }
    };

    fetchGroupbuy();

    return () => {
      setGroupbuy(undefined);
    };
  }, [productId]);

  return { groupbuy, loading };
};

export default useGroupbuy;
