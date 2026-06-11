import { supabase } from "@/integrations/supabase/client";
import { addBagServer, removeBagServer } from "@/lib/bags.functions";

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

export const addBag = async (bag: Omit<Bag, "id">, password: string): Promise<Bag[]> => {
  await addBagServer({ data: { password, ...bag } });
  return getBags();
};

export const removeBag = async (id: string, password: string): Promise<Bag[]> => {
  await removeBagServer({ data: { password, id } });
  return getBags();
};
