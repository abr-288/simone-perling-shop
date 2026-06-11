import { supabase } from "@/integrations/supabase/client";

export type Bag = {
  id: string;
  name: string;
  price: string;
  comment: string;
  image: string; // base64 data URL
};

export const getBags = async (): Promise<Bag[]> => {
  const { data, error } = await supabase
    .from("bags")
    .select("id, name, price, comment, image")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Erreur lors de la récupération des sacs:", error);
    return [];
  }
  return (data ?? []) as Bag[];
};

export const addBag = async (bag: Omit<Bag, "id">): Promise<Bag[]> => {
  const { error } = await supabase.from("bags").insert({
    name: bag.name,
    price: bag.price,
    comment: bag.comment,
    image: bag.image,
  });
  if (error) console.error("Erreur lors de l'ajout du sac:", error);
  return getBags();
};

export const removeBag = async (id: string): Promise<Bag[]> => {
  const { error } = await supabase.from("bags").delete().eq("id", id);
  if (error) console.error("Erreur lors de la suppression du sac:", error);
  return getBags();
};
