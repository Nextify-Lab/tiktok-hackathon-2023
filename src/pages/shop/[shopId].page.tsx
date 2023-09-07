// pages/shop/[shopId]/index.tsx

import ViewShop from "@/components/ShopFlow/ViewShop";
import { useRouter } from "next/router";

function ShopPage() {
  const router = useRouter();
  const { shopId } = router.query;
  const groupbuyId =
    typeof router.query.groupbuyId === "string"
      ? router.query.groupbuyId
      : undefined;

  if (!shopId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ViewShop shopId={shopId} groupbuyId={groupbuyId} />
      {/* Your shop page content here */}
    </div>
  );
}

export default ShopPage;
