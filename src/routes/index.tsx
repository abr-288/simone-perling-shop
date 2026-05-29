import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Phone, Sparkles, GraduationCap, Heart, ArrowRight } from "lucide-react";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Simone Perling — Sacs en perles & formations" },
      { name: "description", content: "Découvrez les sacs en perles faits main de Simone Perling et nos formations en perlage. Contact : +228 90 08 19 98." },
      { property: "og:title", content: "Simone Perling — Sacs en perles & formations" },
      { property: "og:description", content: "Sacs en perles faits main et formations en perlage au Togo." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <section className="border-b border-border/60 bg-gradient-to-b from-secondary/40 to-transparent">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Atelier de perles</p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-primary md:text-6xl">
              L'élégance tissée à la main
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground md:text-lg">
              Sacs en perles uniques, formations en perlage et accompagnement personnalisé.
              Bienvenue dans l'univers de Simone Perling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/collection">
                <Button className="gap-2">
                  Voir la collection <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+22890081998">
                <Button variant="secondary" className="gap-2">
                  <Phone className="h-4 w-4" /> +228 90 08 19 98
                </Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={founder}
              alt="Simone, fondatrice de Simone Perling"
              className="mx-auto aspect-[3/4] w-full max-w-sm rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Nos formations</p>
          <h2 className="mt-2 font-serif text-3xl text-primary md:text-4xl">Apprenez l'art du perlage</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Simone Perling organise régulièrement des formations pour transmettre son savoir-faire :
            techniques de tissage de perles, création de sacs et accessoires uniques.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Initiation au perlage",
              text: "Découvrez les bases du tissage de perles et créez votre première pièce en quelques jours.",
            },
            {
              icon: Sparkles,
              title: "Perfectionnement",
              text: "Approfondissez les techniques avancées pour réaliser des sacs élaborés et originaux.",
            },
            {
              icon: Heart,
              title: "Ateliers privés",
              text: "Sessions personnalisées en petit groupe ou en individuel selon votre rythme.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 text-center md:p-8">
          <h3 className="font-serif text-2xl text-primary">Inscriptions & renseignements</h3>
          <p className="mt-2 text-muted-foreground">
            Pour connaître les dates des prochaines sessions, les tarifs et réserver votre place,
            contactez-nous directement par téléphone ou WhatsApp.
          </p>
          <a href="tel:+22890081998" className="mt-4 inline-block">
            <Button className="gap-2">
              <Phone className="h-4 w-4" /> Appeler le +228 90 08 19 98
            </Button>
          </a>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center">
          <h2 className="font-serif text-3xl text-primary md:text-4xl">Découvrez nos créations</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Chaque sac est unique, perlé à la main avec soin et patience.
            Parcourez la collection et téléchargez notre catalogue.
          </p>
          <Link to="/collection" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">
              Voir la collection <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
