import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bag, addBag, getBags, removeBag } from "@/lib/bags-store";
import { removeBagServer } from "@/lib/bags.functions";
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

const AUTH_KEY = "simone-admin-pw";

function Admin() {
  const [password, setPassword] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(AUTH_KEY);
      if (stored) setPassword(stored);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      {password ? (
        <AdminPanel
          password={password}
          onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setPassword(null); }}
        />
      ) : (
        <Login onSuccess={(pw) => { sessionStorage.setItem(AUTH_KEY, pw); setPassword(pw); }} />
      )}
      <SiteFooter />
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: (password: string) => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
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
        onSubmit={async (e) => {
          e.preventDefault();
          setErr("");
          setLoading(true);
          try {
            // Verify password by attempting a harmless admin call (delete on non-existent id)
            await removeBagServer({ data: { password: pw, id: "00000000-0000-0000-0000-000000000000" } });
            onSuccess(pw);
          } catch {
            setErr("Mot de passe incorrect ou erreur serveur");
          } finally {
            setLoading(false);
          }
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
        <Button type="submit" className="w-full" disabled={loading || !pw}>
          {loading ? "Vérification..." : "Se connecter"}
        </Button>
      </form>
    </main>
  );
}

function AdminPanel({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [bags, setBags] = useState<Bag[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadBags = async () => {
      const data = await getBags();
      setBags(data);
      setLoading(false);
    };
    loadBags();
  }, []);

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

      {loading ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : bags.length === 0 ? (
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
                  onClick={async () => {
                    const updatedBags = await removeBag(b.id, password);
                    setBags(updatedBags);
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-destructive/80 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {open && <AddBagModal password={password} onClose={() => setOpen(false)} onSaved={(list) => { setBags(list); setOpen(false); }} />}
    </main>
  );
}

function AddBagModal({ password, onClose, onSaved }: { password: string; onClose: () => void; onSaved: (bags: Bag[]) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !price && !image) return;
    setSaving(true);
    try {
      const updatedBags = await addBag({ name, price, comment, image }, password);
      onSaved(updatedBags);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-3xl bg-card shadow-xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg text-primary sm:text-xl">Nouveau sac</h3>
            <p className="text-xs text-muted-foreground">Ajoutez les informations du sac</p>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="shrink-0 rounded-full p-2 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            <div>
              <Label>Photo</Label>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative mt-1.5 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-secondary/40 transition hover:bg-secondary sm:aspect-square"
              >
                {image ? (
                  <>
                    <img src={image} alt="Aperçu" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 right-2 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow">
                      Changer
                    </span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm">Choisir une image</span>
                  </div>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nom du sac</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex : Sac Akossiwa" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price">Prix</Label>
                <Input id="price" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex : 15 000 FCFA" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="comment">Commentaire</Label>
              <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Description, matières, dimensions..." rows={3} />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-border bg-card/60 px-5 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:flex-row sm:justify-end sm:px-6">
            <Button type="button" variant="ghost" onClick={onClose} className="w-full sm:w-auto">
              Annuler
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={saving || (!name && !price && !image)}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
