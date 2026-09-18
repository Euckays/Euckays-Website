import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, destroyAdminSession } from "@backend/lib/admin-auth";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/vendors", label: "Vendor Applications" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  async function logout() {
    "use server";
    await destroyAdminSession();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-[80vh] bg-brand-cream">
      <div className="border-b border-brand-sand bg-brand-black text-brand-white">
        <div className="container-brand flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg">Euckays Admin</span>
            <nav className="flex flex-wrap gap-4 text-sm text-brand-white/75">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-brand-gold-light">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-brand-white/70 hover:text-brand-white"
            >
              {session.email} &middot; Sign Out
            </button>
          </form>
        </div>
      </div>
      <div className="container-brand py-10">{children}</div>
    </div>
  );
}
