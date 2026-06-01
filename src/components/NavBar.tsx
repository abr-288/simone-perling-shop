import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "À propos" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.jpeg"
            alt="Simone Perling"
            className="h-9 w-auto rounded"
          />
          <span className="hidden font-serif text-lg font-bold text-primary sm:inline">
            Simone Perling
          </span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-sm text-primary font-semibold" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/30 bg-background px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-primary"
              activeProps={{ className: "rounded-md px-2 py-2 text-sm text-primary font-semibold" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/30 py-12 text-center text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-serif text-lg font-bold text-primary">Simone Perling</p>
        <p className="mt-3">+228 90 08 19 98</p>
        <p className="mt-6 text-xs text-muted-foreground/70">
          <Link to="/admin" className="hover:text-primary transition-colors">
            Administration
          </Link>
        </p>
      </div>
    </footer>
  );
}
