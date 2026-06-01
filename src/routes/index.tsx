import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, GraduationCap, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Accueil | Simone Perling — Sacs en perles & formations" },
      { name: "description", content: "Découvrez nos sacs en perles faits main et formations en perlage. Formation complète à 50 000 FCFA avec matériaux inclus. Contactez-nous : +228 90 08 19 98" },
      { property: "og:title", content: "Simone Perling — Sacs en perles & formations" },
      { property: "og:description", content: "Sacs en perles uniques et formations en perlage au Togo. Devenez experte." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url(/formation.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/85" />
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-primary/60">Atelier de perles</p>
            <h1 className="mt-4 font-serif text-5xl font-bold text-primary md:text-7xl leading-tight">
              L'élégance tissée à la main
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg leading-relaxed">
              Sacs en perles uniques, formations en perlage et accompagnement personnalisé.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/collection">
                <Button className="gap-2">
                  Voir la collection <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/22890081998" target="_blank" rel="noreferrer">
                <Button variant="secondary" className="gap-2">
                  <MessageCircle className="h-4 w-4" /> +228 90 08 19 98
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Formation complète</p>
              <h2 className="font-serif text-5xl font-bold text-primary">50 000 FCFA</h2>
              <p className="text-sm text-muted-foreground">Matériaux offerts</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-3xl font-bold text-primary">Devenez experte en perlage</h3>
              <p className="text-sm uppercase tracking-[0.25em] text-primary/60">Créez • Entreprenez • Rayonnez</p>
              <p className="text-muted-foreground leading-relaxed">
                Une formation complète et pratique pour transformer votre passion en source de revenus.
                Apprenez à créer des sacs à main, sacs cravate, porte-mouchoirs et accessoires de luxe.
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-primary text-sm uppercase tracking-[0.2em]\">Vous allez apprendre :</p>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">•</span> Les techniques de base du perlage
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">•</span> Réalisation de plusieurs modèles de sacs et accessoires
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">•</span> Choix des perles et associations de couleurs
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">•</span> Finitions professionnelles
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">•</span> Gestion et développement de votre activité
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <p className="text-xs text-muted-foreground">Formation pratique • Accessible à toutes • Attestation</p>
            </div>

            <a href="https://wa.me/22890081998" target="_blank" rel="noreferrer" className="inline-block">
              <Button size="lg" className="gap-2">
                <MessageCircle className="h-4 w-4" /> Réserver (2 000 FCFA)
              </Button>
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="/formation.jpeg"
              alt="Formation complète en perlage - 50 000 FCFA"
              loading="lazy"
              className="rounded-lg shadow-sm w-full max-w-md"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Nos formations</p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-primary md:text-5xl">Apprenez l'art du perlage</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Trois parcours adaptés à votre niveau pour maîtriser l'art du perlage et créer vos propres pièces uniques.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
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
            <div key={f.title} className="p-6 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-border/40 text-center">
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">Inscriptions & renseignements</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Pour connaître les dates des prochaines sessions et réserver votre place, contactez-nous par WhatsApp.
          </p>
          <a href="https://wa.me/22890081998" target="_blank" rel="noreferrer">
            <Button className="gap-2">
              <MessageCircle className="h-4 w-4" /> +228 90 08 19 98
            </Button>
          </a>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Notre collection</p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-primary md:text-5xl">Découvrez nos créations</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Chaque sac est unique, perlé à la main avec soin et patience.
          </p>
          <Link to="/collection" className="mt-8 inline-block">
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
