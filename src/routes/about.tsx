import { createFileRoute } from "@tanstack/react-router";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos | Simone Perling — Histoire & Passion" },
      { name: "description", content: "Découvrez l'histoire de Simone Perling, son atelier de perlage artisanal au Togo et sa passion pour la création de sacs uniques." },
      { property: "og:title", content: "À propos — Simone Perling" },
      { property: "og:description", content: "L'histoire et la vision de Simone Perling, fondatrice d'un atelier de perlage artisanal." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src={founder}
            alt="Simone Perling, fondatrice de l'atelier"
            loading="lazy"
            className="aspect-[3/4] w-full max-w-md rounded-lg object-cover shadow-sm"
          />
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary/60">À propos</p>
              <h1 className="mt-3 font-serif text-5xl font-bold text-primary md:text-6xl">
                L'histoire de Simone Perling
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed md:text-lg">
              Simone Perling est née d'une passion pour l'artisanat et le travail délicat des perles.
              Chaque sac est conçu et tissé à la main dans notre atelier, avec une attention particulière
              portée aux détails, aux couleurs et à la finition.
            </p>
            <p className="text-muted-foreground leading-relaxed md:text-lg">
              Au-delà de la création, notre mission est aussi de transmettre. Nous formons des passionnés
              et des amateurs à l'art du perlage à travers des ateliers réguliers, pour faire vivre ce
              savoir-faire et offrir à chacun la possibilité d'exprimer sa créativité.
            </p>
            <a href="https://wa.me/22890081998" target="_blank" rel="noreferrer">
              <Button className="gap-2">
                <MessageCircle className="h-4 w-4" /> +228 90 08 19 98
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3 pt-12 border-t border-border/40">
          {[
            { title: "Fait main", text: "Chaque pièce est tissée à la main, sans production en série." },
            { title: "Pièces uniques", text: "Des modèles originaux qui mettent en valeur votre personnalité." },
            { title: "Transmission", text: "Des formations pour partager notre savoir-faire artisanal." },
          ].map((v) => (
            <div key={v.title} className="space-y-3">
              <h3 className="font-serif text-xl font-semibold text-primary">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
