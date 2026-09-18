import { prisma } from "@backend/lib/prisma";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-black">Contact Messages</h1>
      <div className="mt-6 flex flex-col gap-4">
        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl border border-brand-sand bg-brand-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-medium text-brand-black">{m.name}</span>
              <span className="text-brand-black/50">{m.createdAt.toLocaleString("en-NG")}</span>
            </div>
            <p className="mt-1 text-xs text-brand-black/50">
              {m.email} {m.phone ? `· ${m.phone}` : ""}
            </p>
            {m.subject && <p className="mt-2 text-sm font-medium text-brand-emerald">{m.subject}</p>}
            <p className="mt-1 text-sm text-brand-black/70">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="rounded-2xl border border-brand-sand bg-brand-white p-6 text-center text-brand-black/50">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  );
}
