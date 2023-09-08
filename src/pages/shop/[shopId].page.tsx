// pages/shop/[shopId]/index.tsx

import ViewShop from "@/components/ShopFlow/ViewShop";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

function ShopPage() {
  const router = useRouter();
  const rawShopId = router.query.shopId;
  const groupbuyId =
    typeof router.query.groupbuyId === "string"
      ? router.query.groupbuyId
      : undefined;

  // Ensure shopId is a string
  const shopId = Array.isArray(rawShopId) ? rawShopId[0] : rawShopId;

  if (!shopId) {
    return <div>Loading...</div>;
  }

  return (
    <Box >
      <ViewShop shopId={shopId} groupbuyId={groupbuyId} />
      {/* Your shop page content here */}
    </Box>
  );
}

export default ShopPage;
