import { CheckoutPaymentForm } from "@/components/checkout/CheckoutPaymentForm";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;
  return <CheckoutPaymentForm paymentNotConfirmed={payment === "not-confirmed"} />;
}
