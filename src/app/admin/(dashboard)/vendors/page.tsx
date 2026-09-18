import { prisma } from "@backend/lib/prisma";

export default async function AdminVendorsPage() {
  const applications = await prisma.vendorApplication.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-black">Vendor Applications</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-sand bg-brand-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-brand-sand text-xs uppercase tracking-wide text-brand-black/50">
            <tr>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Products of Interest</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.id} className="border-b border-brand-sand/60 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-brand-black">{a.businessName}</p>
                  <p className="text-xs text-brand-black/50">{a.name}</p>
                </td>
                <td className="px-4 py-3 text-brand-black/70">
                  <p>{a.email}</p>
                  <p className="text-xs text-brand-black/50">{a.phone}</p>
                </td>
                <td className="px-4 py-3 text-brand-black/70">{a.businessType}</td>
                <td className="px-4 py-3 text-brand-black/70">{a.location}</td>
                <td className="px-4 py-3 text-brand-black/70">{a.productsOfInterest}</td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-brand-black/50">
                  No vendor applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
