const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function WhatsAppButton() {
  if (!WHATSAPP_NUMBER) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Euckays! I have a question about your products."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-brand-white/40 bg-brand-emerald text-brand-white shadow-[0_8px_24px_rgba(40,52,45,.18)] transition hover:-translate-y-1 hover:bg-brand-black"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 fill-white">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.31.657 4.464 1.797 6.296L4 29l7.906-1.751A11.93 11.93 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.357l-.355-.21-4.691 1.04 1.006-4.573-.232-.372A9.69 9.69 0 0 1 5.25 15c0-5.93 4.822-10.75 10.751-10.75S26.75 9.07 26.75 15 21.93 24.75 16.001 24.75Zm5.596-7.868c-.306-.153-1.81-.893-2.09-.994-.28-.102-.484-.153-.688.153-.204.306-.79.994-.968 1.198-.178.204-.357.23-.663.077-.306-.153-1.29-.475-2.457-1.516-.908-.81-1.522-1.812-1.7-2.118-.179-.306-.019-.472.134-.624.137-.137.306-.357.459-.535.153-.179.204-.306.306-.51.102-.204.051-.383-.026-.536-.077-.153-.688-1.658-.943-2.27-.248-.596-.5-.516-.688-.526l-.586-.01a1.126 1.126 0 0 0-.816.383c-.28.306-1.069 1.045-1.069 2.55 0 1.505 1.094 2.96 1.247 3.164.153.204 2.153 3.29 5.217 4.613.729.315 1.298.503 1.741.643.732.233 1.398.2 1.925.121.587-.088 1.81-.74 2.065-1.454.255-.714.255-1.326.179-1.454-.076-.128-.28-.204-.586-.357Z" />
      </svg>
    </a>
  );
}
