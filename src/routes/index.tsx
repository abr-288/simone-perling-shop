import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bag, addBag, getBags, removeBag } from "@/lib/bags-store";
import { downloadCatalogPDF } from "@/lib/catalog-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Phone, Plus, Trash2, ImagePlus, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Simone Perling — Sacs en perles faits main" },
      { name: "description", content: "Découvrez la collection unique de sacs en perles de Simone Perling. Téléchargez le catalogue complet." },
      { property: "og:title", content: "Simone Perling — Sacs en perles" },
      { property: "og:description", content: "Sacs en perles faits main. Contact : +228 90 08 19 98" },
    ],
  }),
  component: Index,
});

function Index() {
  const [bags, setBags] = useState<Bag[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBags(getBags());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-gradient-to-b from-secondary/40 to-transparent">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Atelier de perles</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary md:text-6xl">Simone Perling</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Sacs en perles faits main, pièces uniques tissées avec soin.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="tel:+22890081998">
              <Button variant="default" className="gap-2">
                <Phone className="h-4 w-4" /> +228 90 08 19 98
              </Button>
            </a>
            <Button
              variant="secondary"
              className="gap-2"
              disabled={bags.length === 0}
              onClick={() => downloadCatalogPDF(bags)}
            >
              <Download className="h-4 w-4" /> Télécharger le catalogue
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-primary">Collection en stock</h2>
          <Button onClick={() => setOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Ajouter un sac
          </Button>
        </div>

        {bags.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <p className="text-muted-foreground">Aucun sac pour le moment.</p>
            <p className="mt-1 text-sm text-muted-foreground">Cliquez sur « Ajouter un sac » pour commencer votre catalogue.</p>
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
                  <button
                    onClick={() => setBags(removeBag(b.id))}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-destructive/80 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Supprimer
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border/60 bg-secondary/30 py-8 text-center text-sm text-muted-foreground">
        <p className="font-serif text-primary">Simone Perling</p>
        <p className="mt-1">Commandes & informations : +228 90 08 19 98</p>
      </footer>

      {open && <AddBagModal onClose={() => setOpen(false)} onSaved={(list) => { setBags(list); setOpen(false); }} />}
    </div>
  );
}

function AddBagModal({ onClose, onSaved }: { onClose: () => void; onSaved: (bags: Bag[]) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !price && !image) return;
    const list = addBag({ name, price, comment, image });
    onSaved(list);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-3xl bg-card p-6 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-primary">Nouveau sac</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>Photo</Label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-1 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-secondary/40 hover:bg-secondary"
            >
              {image ? (
                <img src={image} alt="Aperçu" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-sm">Choisir une image</span>
                </div>
              )}
            </button>
          </div>
          <div>
            <Label htmlFor="name">Nom du sac</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex : Sac Akossiwa" />
          </div>
          <div>
            <Label htmlFor="price">Prix</Label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex : 15 000 FCFA" />
          </div>
          <div>
            <Label htmlFor="comment">Commentaire</Label>
            <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Description, matières, dimensions..." rows={3} />
          </div>
          <Button type="submit" className="w-full">Enregistrer</Button>
        </form>
      </div>
    </div>
  );
}
