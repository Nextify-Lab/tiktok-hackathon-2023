// pages/item/[itemId].tsx

import ViewItem from "@/components/ShopFlow/ViewItem";
import {
  FOOD_ITEM_IMAGE_URL,
  FOOD_ITEM_TITLE,
  FOOD_ITEM_PRICE,
  FOOD_ITEM_DESC,
} from "@/components/VideoCard";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

function ItemPage() {
  const router = useRouter();
  const { itemId } = router.query;

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
      <ViewItem
        imageUrl={FOOD_ITEM_IMAGE_URL}
        title={FOOD_ITEM_TITLE}
        price={FOOD_ITEM_PRICE}
        description={FOOD_ITEM_DESC}
        groupbuyId={groupbuyId}
        itemId={itemId as string}
      />
    </div>
  );
}

export default ItemPage;
