// TODO for nathan
// 1. Add a payment form
// make a component called ViewOrderSummary.tsx in components/ShopFlow

// [itemId].tsx: This file will handle routes like <url>/item/1 or <url>/item/2.
// payment.tsx inside the [itemId] folder: This file will handle routes like <url>/item/1/payment.

import { useRouter } from "next/router";

function PaymentPage() {
  const router = useRouter();
  const { itemId } = router.query;
  const groupbuyId = router.query.groupbuyId;

  return (
    <div>
      <h1>Payment Page for ItemId: {itemId}</h1>
      {groupbuyId && <p>Group Buy ID: {groupbuyId}</p>}
      {/* Your payment page content here */}
    </div>
  );
}

export default PaymentPage;
