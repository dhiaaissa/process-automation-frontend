"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Accueil", icon: "🏠" },
  { href: "/processes", label: "Processus", icon: "📋" },
  { href: "/processes/new", label: "Nouveau", icon: "➕" },
  { href: "/dashboard", label: "Tableau de bord", icon: "📊" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card hidden md:block">
      <div className="p-6">
        <h1 className="text-lg font-bold text-primary">Automatisation des Processus</h1>
        <p className="text-xs text-muted-foreground mt-1">Plateforme d'analyse</p>
      </div>
      <nav className="px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}