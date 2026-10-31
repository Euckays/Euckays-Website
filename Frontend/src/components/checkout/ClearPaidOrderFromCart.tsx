"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { PENDING_CHECKOUT_ORDER_KEY } from "@/lib/checkout-session";

export function ClearPaidOrderFromCart({
  orderNumber,
  productIds,
}: {
  orderNumber: string;
  productIds: string[];
}) {
  const { hydrated, removeItem } = useCart();
  const completed = useRef(false);

  useEffect(() => {
    if (!hydrated || completed.current) return;

    try {
      if (window.sessionStorage.getItem(PENDING_CHECKOUT_ORDER_KEY) !== orderNumber) return;
      completed.current = true;
      productIds.forEach((id) => removeItem(id));
      window.sessionStorage.removeItem(PENDING_CHECKOUT_ORDER_KEY);
    } catch {
      // Keep the bag untouched when session storage is unavailable.
    }
  }, [hydrated, orderNumber, productIds, removeItem]);

  return null;
}
