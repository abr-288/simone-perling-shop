export type Bag = {
  id: string;
  name: string;
  price: string;
  comment: string;
  image: string; // base64 data URL
};

const KEY = "simone-perling-bags";

export const getBags = (): Bag[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveBags = (bags: Bag[]) => {
  localStorage.setItem(KEY, JSON.stringify(bags));
};

export const addBag = (bag: Omit<Bag, "id">): Bag[] => {
  const bags = getBags();
  const next = [...bags, { ...bag, id: crypto.randomUUID() }];
  saveBags(next);
  return next;
};

export const removeBag = (id: string): Bag[] => {
  const next = getBags().filter((b) => b.id !== id);
  saveBags(next);
  return next;
};
