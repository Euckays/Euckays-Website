const PAYSTACK_BASE_URL = "https://api.paystack.co";

export function isPaystackConfigured() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  return Boolean(key && key.startsWith("sk_"));
}

export async function initializePaystackTransaction(params: {
  email: string;
  amountNaira: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}) {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: Math.round(params.amountNaira * 100),
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata ?? {},
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message ?? "Failed to initialize payment");
  }
  return data.data as { authorization_url: string; access_code: string; reference: string };
}

export async function verifyPaystackTransaction(reference: string) {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message ?? "Failed to verify payment");
  }
  return data.data as { status: string; reference: string; amount: number; currency: string };
}
