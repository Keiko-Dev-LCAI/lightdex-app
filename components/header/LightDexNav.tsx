"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Swap", href: "/" },
  { label: "Pools", href: "/pools" },
  { label: "Add", href: "/add" },
  { label: "Find", href: "/find" },
  { label: "Lock", href: "/lock" },
];

export default function LightDexNav() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6 text-sm font-semibold">
      {LINKS.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={active ? "text-[#00d4ff]" : "text-slate-300 hover:text-white"}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}