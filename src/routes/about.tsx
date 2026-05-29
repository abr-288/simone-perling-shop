import { createFileRoute } from "@tanstack/react-router";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — Simone Perling" },
      { name: "description", content: "Découvrez l'histoire de Simone Perling, son atelier et sa passion pour le perlage artisanal." },
      { property: "og:title", content: "À propos — Simone Perling" },
      { property: "og:description", content: "L'histoire et la vision de Simone Perling." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <img
            src={founder}
            alt="Fondatrice de Simone Perling"
            className="aspect-[3/4] w-full max-w-md rounded-3xl object-cover shadow-xl"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">À propos</p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-primary md:text-5xl">
              L'histoire de Simone Perling
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Simone Perling est née d'une passion pour l'artisanat et le travail délicat des perles.
              Chaque sac est conçu et tissé à la main dans notre atelier, avec une attention particulière
              portée aux détails, aux couleurs et à la finition.
            </p>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Au-delà de la création, notre mission est aussi de transmettre. Nous formons des passionnés
              et des amateurs à l'art du perlage à travers des ateliers réguliers, pour faire vivre ce
              savoir-faire et offrir à chacun la possibilité d'exprimer sa créativité.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+22890081998">
                <Button className="gap-2">
                  <Phone className="h-4 w-4" /> +228 90 08 19 98
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { title: "Fait main", text: "Chaque pièce est tissée à la main, sans production en série." },
            { title: "Pièces uniques", text: "Des modèles originaux qui mettent en valeur votre personnalité." },
            { title: "Transmission", text: "Des formations pour partager notre savoir-faire artisanal." },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-serif text-xl text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
