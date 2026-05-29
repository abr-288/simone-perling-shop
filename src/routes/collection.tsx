import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bag, getBags } from "@/lib/bags-store";
import { downloadCatalogPDF } from "@/lib/catalog-pdf";
import { Button } from "@/components/ui/button";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { Download, Phone } from "lucide-react";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Simone Perling" },
      { name: "description", content: "Découvrez tous les sacs en perles faits main disponibles et téléchargez le catalogue." },
      { property: "og:title", content: "Collection — Simone Perling" },
      { property: "og:description", content: "Sacs en perles faits main disponibles en stock." },
    ],
  }),
  component: Collection,
});

function Collection() {
  const [bags, setBags] = useState<Bag[]>([]);
  useEffect(() => setBags(getBags()), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <header className="border-b border-border/60 bg-gradient-to-b from-secondary/40 to-transparent">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">En stock</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-primary md:text-5xl">Notre collection</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Chaque pièce est unique. Téléchargez le catalogue complet ou contactez-nous pour commander.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="default"
              className="gap-2"
              disabled={bags.length === 0}
              onClick={() => downloadCatalogPDF(bags)}
            >
              <Download className="h-4 w-4" /> Télécharger le catalogue
            </Button>
            <a href="tel:+22890081998">
              <Button variant="secondary" className="gap-2">
                <Phone className="h-4 w-4" /> Commander
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        {bags.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <p className="text-muted-foreground">La collection sera bientôt mise en ligne.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Contactez-nous au +228 90 08 19 98 pour découvrir les pièces disponibles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bags.map((b) => (
              <article key={b.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
                <div className="aspect-square overflow-hidden bg-secondary">
                  {b.image ? (
                    <img src={b.image} alt={b.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">Pas d'image</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-primary">{b.name || "Sans nom"}</h3>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">{b.price}</span>
                  </div>
                  {b.comment && <p className="mt-2 text-sm text-muted-foreground">{b.comment}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
