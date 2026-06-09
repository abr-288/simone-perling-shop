import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bag, addBag, getBags, removeBag } from "@/lib/bags-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { ImagePlus, Lock, LogOut, Plus, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Administration — Simone Perling" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

const ADMIN_PASSWORD = "simone2026";
const AUTH_KEY = "simone-admin-auth";

function Admin() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      {authed ? <AdminPanel onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} /> : <Login onSuccess={() => { sessionStorage.setItem(AUTH_KEY, "1"); setAuthed(true); }} />}
      <SiteFooter />
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-5 py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Lock className="h-6 w-6" />
      </div>
      <h1 className="mt-4 font-serif text-2xl text-primary">Espace administration</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Entrez le mot de passe pour gérer le catalogue.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pw === ADMIN_PASSWORD) onSuccess();
          else setErr("Mot de passe incorrect");
        }}
        className="mt-6 w-full space-y-3"
      >
        <Input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(""); }}
          placeholder="Mot de passe"
          autoFocus
        />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="submit" className="w-full">Se connecter</Button>
      </form>
    </main>
  );
}

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [bags, setBags] = useState<Bag[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => setBags(getBags()), []);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-primary">Gestion du catalogue</h1>
          <p className="text-sm text-muted-foreground">{bags.length} sac{bags.length > 1 ? "s" : ""} en stock</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Ajouter un sac
          </Button>
          <Button variant="ghost" onClick={onLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </div>

      {bags.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-muted-foreground">Aucun sac pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bags.map((b) => (
            <article key={b.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="aspect-square overflow-hidden bg-secondary">
                {b.image ? <img src={b.image} alt={b.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-muted-foreground">Pas d'image</div>}
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

      {open && <AddBagModal onClose={() => setOpen(false)} onSaved={(list) => { setBags(list); setOpen(false); }} />}
    </main>
  );
}

function AddBagModal({ onClose, onSaved }: { onClose: () => void; onSaved: (bags: Bag[]) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !price && !image) return;
    onSaved(addBag({ name, price, comment, image }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-3xl bg-card p-6 shadow-xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-primary">Nouveau sac</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>Photo</Label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <button type="button" onClick={() => fileRef.current?.click()} className="mt-1 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-secondary/40 hover:bg-secondary">
              {image ? <img src={image} alt="Aperçu" className="h-full w-full object-cover" /> : (
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
