// pages/product/[productId].tsx

import ViewItem from "@/components/ShopFlow/ViewProduct";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

function ItemPage() {
  const router = useRouter();
  const { productId } = router.query;

  //checks if router.query.groupbuyId is a string and assigns it to groupbuyId.
  // If it's not a string, it assigns undefined to groupbuyId
  const groupbuyId =
    typeof router.query.groupbuyId === "string"
      ? router.query.groupbuyId
      : undefined;

  if (!router.isReady) {
    return <Spinner />;
  }

  return (
    <div>
      <ViewItem groupbuyId={groupbuyId} productId={productId as string} />
    </div>
  );
}

export default ItemPage;
