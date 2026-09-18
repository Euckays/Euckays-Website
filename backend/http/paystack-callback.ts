import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@backend/lib/prisma";
import { verifyPaystackTransaction } from "@backend/lib/paystack";

export async function handlePaystackCallback(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const retryUrl = new URL("/checkout?payment=not-confirmed", siteUrl);

  if (!reference) {
    return NextResponse.redirect(retryUrl);
  }

  try {
    const order = await prisma.order.findUnique({ where: { orderNumber: reference } });
    if (!order) {
      return NextResponse.redirect(retryUrl);
    }
    const transaction = await verifyPaystackTransaction(reference);

    // The return URL is only a signal to verify the transaction, never proof of payment.
    if (
      transaction.status !== "success" ||
      transaction.reference !== order.orderNumber ||
      transaction.amount !== Math.round(Number(order.total) * 100) ||
      transaction.currency !== "NGN"
    ) {
      return NextResponse.redirect(retryUrl);
    }

    if (order.status === "PENDING_PAYMENT") {
      await prisma.order.update({
        where: { orderNumber: reference },
        data: { status: "PAID", paymentReference: transaction.reference },
      });
    }

    return NextResponse.redirect(`${siteUrl}/order-confirmation/${reference}`);
  } catch {
    return NextResponse.redirect(retryUrl);
  }
}
