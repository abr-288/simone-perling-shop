export type Bag = {
  id: string;
  name: string;
  price: string;
  comment: string;
  image: string; // base64 data URL
};

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/6743e5e1e41b4d3464e7e8e2';
const JSONBIN_KEY = '$2a$10$X7Z9vK1mN8pQ3rT5wY7zOu';

export const getBags = async (): Promise<Bag[]> => {
  try {
    const response = await fetch(JSONBIN_URL, {
      headers: {
        'X-Master-Key': JSONBIN_KEY,
      },
    });
    const data = await response.json();
    return data.record || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des sacs:', error);
    return [];
  }
};

export const saveBags = async (bags: Bag[]): Promise<void> => {
  try {
    await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY,
      },
      body: JSON.stringify(bags),
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des sacs:', error);
  }
};

export const addBag = async (bag: Omit<Bag, "id">): Promise<Bag[]> => {
  const bags = await getBags();
  const next = [...bags, { ...bag, id: crypto.randomUUID() }];
  await saveBags(next);
  return next;
};

export const removeBag = async (id: string): Promise<Bag[]> => {
  const bags = await getBags();
  const next = bags.filter((b) => b.id !== id);
  await saveBags(next);
  return next;
};
