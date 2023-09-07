// pages/item/[itemId].tsx

import ViewItem from "@/components/ShopFlow/ViewItem";
import {
  FOOD_ITEM_IMAGE_URL,
  FOOD_ITEM_TITLE,
  FOOD_ITEM_PRICE,
  FOOD_ITEM_DESC,
} from "@/components/VideoCard";
import { useRouter } from "next/router";
import ShopPage from "../shop/[shopId].page";

function ItemPage() {
  return (
    <div>
      <h1>Item Page default</h1>
      {/* {groupbuyId && ( */}
      <ViewItem
        imageUrl={FOOD_ITEM_IMAGE_URL}
        title={FOOD_ITEM_TITLE}
        price={FOOD_ITEM_PRICE}
        description={FOOD_ITEM_DESC}
      />
      {/* )} */}
    </div>
  );
}

export default ItemPage;
