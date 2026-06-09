import { supabase } from './supabase';

export type Bag = {
  id: string;
  name: string;
  price: string;
  comment: string;
  image: string; // base64 data URL
  created_at?: string;
};

export const getBags = async (): Promise<Bag[]> => {
  try {
    const { data, error } = await supabase
      .from('bags')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des sacs:', error);
    return [];
  }
};

export const addBag = async (bag: Omit<Bag, "id" | "created_at">): Promise<Bag[]> => {
  try {
    const { data, error } = await supabase
      .from('bags')
      .insert([{ ...bag }])
      .select();
    
    if (error) throw error;
    return await getBags();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du sac:', error);
    return await getBags();
  }
};

export const removeBag = async (id: string): Promise<Bag[]> => {
  try {
    const { error } = await supabase
      .from('bags')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return await getBags();
  } catch (error) {
    console.error('Erreur lors de la suppression du sac:', error);
    return await getBags();
  }
};
